var getQueryParams = function getQueryParams(qs) {
  if (typeof qs !== 'string') {
    return {};
  }
  qs = qs.split('+').join(' ');

  var params = {};
  var match = qs.match(
    /(?:[?](?:[^=]+)=(?:[^&#]*)(?:[&](?:[^=]+)=(?:[^&#]*))*(?:[#].*)?)|(?:[#].*)/
  );
  var split;

  if (match === null) {
    return {};
  }

  split = match[0].substr(1).split(/[&#=]/);

  for (var i = 0; i < split.length; i += 2) {
    params[decodeURIComponent(split[i])] =
      decodeURIComponent(split[i + 1] || '');
  }

  return params;
};

var combineParams = function combineParams(params, hasParams) {
  if (typeof params !== 'object') {
    return '';
  }
  var combined = '';
  var i = 0;
  var keys = Object.keys(params);

  if (keys.length === 0) {
    return '';
  }

  //always have parameters in the same order
  keys.sort();

  if (!hasParams) {
    combined += '?' + keys[0] + '=' + params[keys[0]];
    i += 1;
  }

  for (; i < keys.length; i += 1) {
    combined += '&' + keys[i] + '=' + params[keys[i]];
  }
  return combined;
};

//parses strings like 1h30m20s to seconds
function getLetterTime(timeString) {
  var totalSeconds = 0;
  var timeValues = {
    's': 1,
    'm': 1 * 60,
    'h': 1 * 60 * 60,
    'd': 1 * 60 * 60 * 24,
    'w': 1 * 60 * 60 * 24 * 7,
  };
  var timePairs;

  //expand to "1 h 30 m 20 s" and split
  timeString = timeString.replace(/([smhdw])/g, ' $1 ').trim();
  timePairs = timeString.split(' ');

  for (var i = 0; i < timePairs.length; i += 2) {
    totalSeconds += parseInt(timePairs[i], 10) *
      timeValues[timePairs[i + 1] || 's'];
  }
  return totalSeconds;
}

//parses strings like 1:30:20 to seconds
function getColonTime(timeString) {
  var totalSeconds = 0;
  var timeValues = [
    1,
    1 * 60,
    1 * 60 * 60,
    1 * 60 * 60 * 24,
    1 * 60 * 60 * 24 * 7,
  ];
  var timePairs = timeString.split(':');
  for (var i = 0; i < timePairs.length; i++) {
    totalSeconds += parseInt(timePairs[i], 10) * timeValues[timePairs.length - i - 1];
  }
  return totalSeconds;
}

var getTime = function getTime(timeString) {
  if (typeof timeString === 'undefined') {
    return 0;
  }
  if (timeString.match(/^(\d+[smhdw]?)+$/)) {
    return getLetterTime(timeString);
  }
  if (timeString.match(/^(\d+:?)+$/)) {
    return getColonTime(timeString);
  }
  return 0;
};

var util = {
	getQueryParams: getQueryParams,
	combineParams: combineParams,
	getTime: getTime
};

const {
  getQueryParams: getQueryParams$1,
} = util;

function UrlParser() {
  for (const key of [
    'parseProvider',
    'parse',
    'bind',
    'create',
  ]) {
    this[key] = this[key].bind(this);
  }
  this.plugins = {};
}

var urlParser = UrlParser;

UrlParser.prototype.parseProvider = function(url) {
  var match = url.match(
    /(?:(?:https?:)?\/\/)?(?:[^.]+\.)?(\w+)\./i
  );
  return match ? match[1] : undefined;
};

UrlParser.prototype.parse = function(url) {
  if (typeof url === 'undefined') {
    return undefined;
  }
  var provider = this.parseProvider(url);
  var result;
  var plugin = this.plugins[provider];
  if (!provider || !plugin || !plugin.parse) {
    return undefined;
  }
  result = plugin.parse.call(
    plugin, url, getQueryParams$1(url)
  );
  if (result) {
    result = removeEmptyParameters(result);
    result.provider = plugin.provider;
  }
  return result;
};

UrlParser.prototype.bind = function(plugin) {
  this.plugins[plugin.provider] = plugin;
  if (plugin.alternatives) {
    for (var i = 0; i < plugin.alternatives.length; i += 1) {
      this.plugins[plugin.alternatives[i]] = plugin;
    }
  }
};

UrlParser.prototype.create = function(op) {
  if (typeof (op) !== 'object' || typeof (op.videoInfo) !== 'object') {
    return undefined;
  }

  var vi = op.videoInfo;
  var params = op.params;
  var plugin = this.plugins[vi.provider];

  params = (params === 'internal') ? vi.params : params || {};

  if (plugin) {
    op.format = op.format || plugin.defaultFormat;
    if (plugin.formats.hasOwnProperty(op.format)) {
      return plugin.formats[op.format].apply(plugin, [vi, Object.assign({}, params)]);
    }
  }
  return undefined;
};

function removeEmptyParameters(result) {
  if (result.params && Object.keys(result.params).length === 0) {
    delete result.params;
  }
  return result;
}

const parser = new urlParser();
var base = parser;

const { combineParams: combineParams$1 } = util;

function CanalPlus() {
  this.provider = 'canalplus';
  this.defaultFormat = 'embed';
  this.formats = {
    embed: this.createEmbedUrl,
  };
  this.mediaTypes = {
    VIDEO: 'video',
  };
}

CanalPlus.prototype.parseParameters = function(params) {
  delete params.vid;
  return params;
};

CanalPlus.prototype.parse = function(url, params) {
  var _this = this;
  var result = {
    mediaType: this.mediaTypes.VIDEO,
    id: params.vid,
  };
  result.params = _this.parseParameters(params);

  if (!result.id) {
    return undefined;
  }
  return result;
};

CanalPlus.prototype.createEmbedUrl = function(vi, params) {
  if (!vi.id || vi.mediaType !== this.mediaTypes.VIDEO) {
    return undefined;
  }
  var url = 'http://player.canalplus.fr/embed/';
  params.vid = vi.id;

  url += combineParams$1(params);
  return url;
};

base.bind(new CanalPlus());

const { combineParams: combineParams$2 } = util;

function Coub() {
  this.provider = 'coub';
  this.defaultFormat = 'long';
  this.formats = {
    long: this.createLongUrl,
    embed: this.createEmbedUrl,
  };
  this.mediaTypes = {
    VIDEO: 'video',
  };
}

Coub.prototype.parseUrl = function(url) {
  var match = url.match(
    /(?:embed|view)\/([a-zA-Z\d]+)/i
  );
  return match ? match[1] : undefined;
};

Coub.prototype.parse = function(url, params) {
  var result = {
    mediaType: this.mediaTypes.VIDEO,
    params: params,
    id: this.parseUrl(url),
  };

  if (!result.id) {
    return undefined;
  }
  return result;
};

Coub.prototype.createUrl = function(baseUrl, vi, params) {
  if (!vi.id || vi.mediaType !== this.mediaTypes.VIDEO) {
    return undefined;
  }
  var url = baseUrl + vi.id;
  url += combineParams$2(params);
  return url;
};

Coub.prototype.createLongUrl = function(vi, params) {
  return this.createUrl('https://coub.com/view/', vi, params);
};

Coub.prototype.createEmbedUrl = function(vi, params) {
  return this.createUrl('//coub.com/embed/', vi, params);
};

base.bind(new Coub());

const { combineParams: combineParams$3, getTime: getTime$1 } = util;

function Dailymotion() {
  this.provider = 'dailymotion';
  this.alternatives = ['dai'];
  this.defaultFormat = 'long';
  this.formats = {
    short: this.createShortUrl,
    long: this.createLongUrl,
    embed: this.createEmbedUrl,
    image: this.createImageUrl,
  };
  this.mediaTypes = {
    VIDEO: 'video',
  };
}

Dailymotion.prototype.parseParameters = function(params) {
  return this.parseTime(params);
};

Dailymotion.prototype.parseTime = function(params) {
  if (params.start) {
    params.start = getTime$1(params.start);
  }
  return params;
};

Dailymotion.prototype.parseUrl = function(url) {
  var match = url.match(/(?:\/video|ly)\/([A-Za-z0-9]+)/i);
  return match ? match[1] : undefined;
};

Dailymotion.prototype.parse = function(url, params) {
  var _this = this;
  var result = {
    mediaType: this.mediaTypes.VIDEO,
    params: _this.parseParameters(params),
    id: _this.parseUrl(url),
  };
  return result.id ? result : undefined;
};

Dailymotion.prototype.createUrl = function(base, vi, params) {
  if (!vi.id || vi.mediaType !== this.mediaTypes.VIDEO) {
    return undefined;
  }
  return base + vi.id + combineParams$3(params);
};

Dailymotion.prototype.createShortUrl = function(vi, params) {
  return this.createUrl('https://dai.ly/', vi, params);
};

Dailymotion.prototype.createLongUrl = function(vi, params) {
  return this.createUrl('https://dailymotion.com/video/', vi, params);
};

Dailymotion.prototype.createEmbedUrl = function(vi, params) {
  return this.createUrl('https://www.dailymotion.com/embed/video/', vi, params);
};

Dailymotion.prototype.createImageUrl = function(vi, params) {
  delete params.start;
  return this.createUrl('https://www.dailymotion.com/thumbnail/video/', vi, params);
};

base.bind(new Dailymotion());

const {
  combineParams: combineParams$4,
  getTime: getTime$2,
} = util;

function Twitch() {
  this.provider = 'twitch';
  this.defaultFormat = 'long';
  this.formats = {
    long: this.createLongUrl,
    embed: this.createEmbedUrl,
  };
  this.mediaTypes = {
    VIDEO: 'video',
    STREAM: 'stream',
    CLIP: 'clip',
  };
}

Twitch.prototype.seperateId = function(id) {
  return {
    pre: id[0],
    id: id.substr(1),
  };
};

Twitch.prototype.parseChannel = function(result, params) {
  var channel = params.channel || params.utm_content || result.channel;
  delete params.utm_content;
  delete params.channel;
  return channel;
};

Twitch.prototype.parseUrl = function(url, result, params) {
  var match;
  match = url.match(
    /(clips\.)?twitch\.tv\/(?:(?:videos\/(\d+))|(\w+)(?:\/clip\/(\w+))?)/i
  );

  if (match && match[2]) { //video
    result.id = 'v' + match[2];
  } else if (params.video) { //video embed
    result.id = params.video;
    delete params.video;
  } else if (params.clip) { //clips embed
    result.id = params.clip;
    result.isClip = true;
    delete params.clip;
  } else if (match && match[1] && match[3]) { //clips.twitch.tv/id
    result.id = match[3];
    result.isClip = true;
  } else if (match && match[3] && match[4]) { //twitch.tv/channel/clip/id
    result.channel = match[3];
    result.id = match[4];
    result.isClip = true;
  } else if (match && match[3]) {
    result.channel = match[3];
  }
  return result;
};

Twitch.prototype.parseMediaType = function(result) {
  var mediaType;
  if (result.id) {
    if (result.isClip) {
      mediaType = this.mediaTypes.CLIP;
      delete result.isClip;
    } else {
      mediaType = this.mediaTypes.VIDEO;
    }
  } else if (result.channel) {
    mediaType = this.mediaTypes.STREAM;
  }
  return mediaType;
};

Twitch.prototype.parseParameters = function(params) {
  if (params.t) {
    params.start = getTime$2(params.t);
    delete params.t;
  }
  return params;
};

Twitch.prototype.parse = function(url, params) {
  var _this = this;
  var result = {};
  result = _this.parseUrl(url, result, params);
  result.channel = _this.parseChannel(result, params);
  result.mediaType = _this.parseMediaType(result);
  result.params = _this.parseParameters(params);
  return result.channel || result.id ? result : undefined;
};

Twitch.prototype.createLongUrl = function(vi, params) {
  var url = '';

  if (vi.mediaType === this.mediaTypes.STREAM && vi.channel) {
    url = 'https://twitch.tv/' + vi.channel;
  }
  else if (vi.mediaType === this.mediaTypes.VIDEO && vi.id) {
    var sep = this.seperateId(vi.id);
    url = 'https://twitch.tv/videos/' + sep.id;
    if (params.start) {
      params.t = params.start + 's';
      delete params.start;
    }
  }
  else if (vi.mediaType === this.mediaTypes.CLIP && vi.id) {
    if (vi.channel) {
      url = 'https://www.twitch.tv/' + vi.channel + '/clip/' + vi.id;
    } else {
      url = 'https://clips.twitch.tv/' + vi.id;
    }
  } else {
    return undefined;
  }
  url += combineParams$4(params);

  return url;
};

Twitch.prototype.createEmbedUrl = function(vi, params) {
  var url = 'https://player.twitch.tv/';

  if (vi.mediaType === this.mediaTypes.STREAM && vi.channel) {
    params.channel = vi.channel;
  }
  else if (vi.mediaType === this.mediaTypes.VIDEO && vi.id) {
    params.video = vi.id;
    if (params.start) {
      params.t = params.start + 's';
      delete params.start;
    }
  }
  else if (vi.mediaType === this.mediaTypes.CLIP && vi.id) {
    url = 'https://clips.twitch.tv/embed';
    params.clip = vi.id;
  } else {
    return undefined;
  }

  url += combineParams$4(params);

  return url;
};

base.bind(new Twitch());

const { combineParams: combineParams$5, getTime: getTime$3 } = util;

function Vimeo() {
  this.provider = 'vimeo';
  this.alternatives = ['vimeopro', 'vimeocdn'];
  this.defaultFormat = 'long';
  this.formats = {
    long: this.createLongUrl,
    embed: this.createEmbedUrl,
    image: this.createImageUrl,
  };
  this.mediaTypes = {
    VIDEO: 'video',
  };
}

Vimeo.prototype.parseUrl = function(url, result) {
  var match = url.match(
    /(vimeo(?:cdn|pro)?)\.com\/(?:(?:channels\/[\w]+|(?:(?:album\/\d+|groups\/[\w]+|staff\/frame)\/)?videos?)\/)?(\d+)(?:_(\d+)(?:x(\d+))?)?(\.\w+)?/i
  );
  if (!match) {
    return result;
  }
  result.id = match[2];
  if (match[1] === 'vimeocdn') {
    if (match[3]) {
      result.imageWidth = parseInt(match[3]);
      if (match[4]) { //height can only be set when width is also set
        result.imageHeight = parseInt(match[4]);
      }
    }
    result.imageExtension = match[5];
  }
  return result;
};

Vimeo.prototype.parseParameters = function(params) {
  return this.parseTime(params);
};

Vimeo.prototype.parseTime = function(params) {
  if (params.t) {
    params.start = getTime$3(params.t);
    delete params.t;
  }
  return params;
};

Vimeo.prototype.parse = function(url, params) {
  var result = {
    mediaType: this.mediaTypes.VIDEO,
    params: this.parseParameters(params),
  };
  result = this.parseUrl(url, result);
  return result.id ? result : undefined;
};

Vimeo.prototype.createUrl = function(baseUrl, vi, params) {
  if (!vi.id || vi.mediaType !== this.mediaTypes.VIDEO) {
    return undefined;
  }

  var url = baseUrl + vi.id;
  var startTime = params.start;
  delete params.start;

  url += combineParams$5(params);

  if (startTime) {
    url += '#t=' + startTime;
  }
  return url;
};

Vimeo.prototype.createLongUrl = function(vi, params) {
  return this.createUrl('https://vimeo.com/', vi, params);
};

Vimeo.prototype.createEmbedUrl = function(vi, params) {
  return this.createUrl('//player.vimeo.com/video/', vi, params);
};

Vimeo.prototype.createImageUrl = function(vi, params) {
  if (!vi.id || vi.mediaType !== this.mediaTypes.VIDEO) {
    return undefined;
  }

  var url = 'https://i.vimeocdn.com/video/' + vi.id;

  if (vi.imageWidth && vi.imageHeight) {
    url += '_' + vi.imageWidth + 'x' + vi.imageHeight;
  } else if (vi.imageWidth) {
    url += '_' + vi.imageWidth;
  }

  if (vi.imageExtension === undefined) {
    vi.imageExtension = '.webp';
  }
  url += vi.imageExtension;
  delete vi.imageExtension;

  url += combineParams$5(params);
  return url;
};

base.bind(new Vimeo());

const {
  combineParams: combineParams$6,
  getTime: getTime$4,
} = util;

function Wistia() {
  this.provider = 'wistia';
  this.alternatives = [];
  this.defaultFormat = 'long';
  this.formats = {
    long: this.createLongUrl,
    embed: this.createEmbedUrl,
    embedjsonp: this.createEmbedJsonpUrl,
  };
  this.mediaTypes = {
    VIDEO: 'video',
    EMBEDVIDEO: 'embedvideo',
  };
}

Wistia.prototype.parseUrl = function(url) {
  var match = url.match(
    /(?:(?:medias|iframe)\/|wvideo=)([\w-]+)/
  );
  return match ? match[1] : undefined;
};

Wistia.prototype.parseChannel = function(url) {
  var match = url.match(
    /(?:(?:https?:)?\/\/)?([^.]*)\.wistia\./
  );
  var channel = match ? match[1] : undefined;
  if (channel === 'fast' || channel === 'content') {
    return undefined;
  }
  return channel;
};

Wistia.prototype.parseParameters = function(params, result) {
  if (params.wtime) {
    params.start = getTime$4(params.wtime);
    delete params.wtime;
  }
  if (params.wvideo === result.id) {
    delete params.wvideo;
  }
  return params;
};

Wistia.prototype.parseMediaType = function(result) {
  if (result.id && result.channel) {
    return this.mediaTypes.VIDEO;
  } else if (result.id) {
    delete result.channel;
    return this.mediaTypes.EMBEDVIDEO;
  } else {
    return undefined;
  }
};

Wistia.prototype.parse = function(url, params) {
  var result = {
    id: this.parseUrl(url),
    channel: this.parseChannel(url),
  };
  result.params = this.parseParameters(params, result);
  result.mediaType = this.parseMediaType(result);

  if (!result.id) {
    return undefined;
  }

  return result;
};

Wistia.prototype.createUrl = function(vi, params, url) {
  if (params.start) {
    params.wtime = params.start;
    delete params.start;
  }

  url += combineParams$6(params);

  return url;
};

Wistia.prototype.createLongUrl = function(vi, params) {
  if (!vi.id || vi.mediaType !== this.mediaTypes.VIDEO) {
    return undefined;
  }
  var url = 'https://' + vi.channel + '.wistia.com/medias/' + vi.id;
  return this.createUrl(vi, params, url);
};

Wistia.prototype.createEmbedUrl = function(vi, params) {
  if (!vi.id || !(vi.mediaType === this.mediaTypes.VIDEO || vi.mediaType === this.mediaTypes.EMBEDVIDEO)) {
    return undefined;
  }
  var url = 'https://fast.wistia.com/embed/iframe/' + vi.id;
  return this.createUrl(vi, params, url);
};

Wistia.prototype.createEmbedJsonpUrl = function(vi) {
  if (!vi.id || !(vi.mediaType === this.mediaTypes.VIDEO || vi.mediaType === this.mediaTypes.EMBEDVIDEO)) {
    return undefined;
  }
  return 'https://fast.wistia.com/embed/medias/' + vi.id + '.jsonp';
};

base.bind(new Wistia());

const {combineParams: combineParams$7} = util;

function Youku() {
  this.provider = 'youku';
  this.defaultFormat = 'long';
  this.formats = {
    embed: this.createEmbedUrl,
    long: this.createLongUrl,
    flash: this.createFlashUrl,
    static: this.createStaticUrl,
  };
  this.mediaTypes = {
    VIDEO: 'video',
  };
}

Youku.prototype.parseUrl = function(url) {
  var match = url.match(
    /(?:(?:embed|sid)\/|v_show\/id_|VideoIDS=)([a-zA-Z0-9]+)/
  );
  return match ? match[1] : undefined;
};

Youku.prototype.parseParameters = function(params) {
  if (params.VideoIDS) {
    delete params.VideoIDS;
  }
  return params;
};

Youku.prototype.parse = function(url, params) {
  var _this = this;
  var result = {
    mediaType: this.mediaTypes.VIDEO,
    id: _this.parseUrl(url),
    params: _this.parseParameters(params),
  };

  if (!result.id) {
    return undefined;
  }
  return result;
};

Youku.prototype.createUrl = function(baseUrl, vi, params) {
  if (!vi.id || vi.mediaType !== this.mediaTypes.VIDEO) {
    return undefined;
  }
  var url = baseUrl + vi.id;

  url += combineParams$7(params);
  return url;
};


Youku.prototype.createEmbedUrl = function(vi, params) {
  return this.createUrl('http://player.youku.com/embed/', vi, params);
};

Youku.prototype.createLongUrl = function(vi, params) {
  return this.createUrl('http://v.youku.com/v_show/id_', vi, params);
};

Youku.prototype.createStaticUrl = function(vi, params) {
  return this.createUrl(
    'http://static.youku.com/v1.0.0638/v/swf/loader.swf?VideoIDS=',
    vi, params
  );
};

Youku.prototype.createFlashUrl = function(vi, params) {
  if (!vi.id || vi.mediaType !== this.mediaTypes.VIDEO) {
    return undefined;
  }
  var url = 'http://player.youku.com/player.php/sid/' + vi.id + '/v.swf';

  url += combineParams$7(params);
  return url;
};

base.bind(new Youku());

const {
  combineParams: combineParams$8,
  getTime: getTime$5,
} = util;

function YouTube() {
  this.provider = 'youtube';
  this.alternatives = ['youtu', 'ytimg'];
  this.defaultFormat = 'long';
  this.formats = {
    short: this.createShortUrl,
    long: this.createLongUrl,
    embed: this.createEmbedUrl,
    shortImage: this.createShortImageUrl,
    longImage: this.createLongImageUrl,
  };
  this.imageQualities = {
    '0': '0',
    '1': '1',
    '2': '2',
    '3': '3',
    DEFAULT: 'default',
    HQDEFAULT: 'hqdefault',
    SDDEFAULT: 'sddefault',
    MQDEFAULT: 'mqdefault',
    MAXRESDEFAULT: 'maxresdefault',
  };
  this.defaultImageQuality = this.imageQualities.HQDEFAULT;
  this.mediaTypes = {
    VIDEO: 'video',
    PLAYLIST: 'playlist',
    SHARE: 'share',
    CHANNEL: 'channel',
  };
}

YouTube.prototype.parseVideoUrl = function(url) {
  var match = url.match(
    /(?:(?:v|vi|be|videos|embed)\/(?!videoseries)|(?:v|ci)=)([\w-]{11})/i
  );
  return match ? match[1] : undefined;
};

YouTube.prototype.parseChannelUrl = function(url) {
  // Match an opaque channel ID
  var match = url.match(/\/channel\/([\w-]+)/);
  if (match) {
    return { id: match[1], mediaType: this.mediaTypes.CHANNEL };
  }

  // Match a vanity channel name or a user name. User urls are deprecated and
  // currently redirect to the channel of that same name.
  match = url.match(/\/(?:c|user)\/([\w-]+)/);
  if (match) {
    return { name: match[1], mediaType: this.mediaTypes.CHANNEL };
  }
};

YouTube.prototype.parseParameters = function(params, result) {
  if (params.start || params.t) {
    params.start = getTime$5(params.start || params.t);
    delete params.t;
  }
  if (params.v === result.id) {
    delete params.v;
  }
  if (params.list === result.id) {
    delete params.list;
  }

  return params;
};

YouTube.prototype.parseMediaType = function(result) {
  if (result.params.list) {
    result.list = result.params.list;
    delete result.params.list;
  }
  if (result.id && !result.params.ci) {
    result.mediaType = this.mediaTypes.VIDEO;
  } else if (result.list) {
    delete result.id;
    result.mediaType = this.mediaTypes.PLAYLIST;
  } else if (result.params.ci) {
    delete result.params.ci;
    result.mediaType = this.mediaTypes.SHARE;
  } else {
    return undefined;
  }
  return result;
};

YouTube.prototype.parse = function(url, params) {
  var channelResult = this.parseChannelUrl(url);
  if (channelResult) {
    return channelResult;
  } else {
    var result = {
      params: params,
      id: this.parseVideoUrl(url),
    };
    result.params = this.parseParameters(params, result);
    result = this.parseMediaType(result);
    return result;
  }
};

YouTube.prototype.createShortUrl = function(vi, params) {
  if (!vi.id || vi.mediaType !== this.mediaTypes.VIDEO) {
    return undefined;
  }

  var url = 'https://youtu.be/' + vi.id;
  if (params.start) {
    url += '#t=' + params.start;
  }
  return url;
};

YouTube.prototype.createLongUrl = function(vi, params) {
  var url = '';
  var startTime = params.start;
  delete params.start;

  if (vi.mediaType === this.mediaTypes.CHANNEL) {
    if (vi.id) {
      url += 'https://www.youtube.com/channel/' + vi.id;
    } else if (vi.name) {
      url += 'https://www.youtube.com/c/' + vi.name;
    } else {
      return undefined;
    }
  }
  else if (vi.mediaType === this.mediaTypes.PLAYLIST && vi.list) {
    params.feature = 'share';
    url += 'https://www.youtube.com/playlist';
  }
  else if (vi.mediaType === this.mediaTypes.VIDEO && vi.id) {
    params.v = vi.id;
    url += 'https://www.youtube.com/watch';
  }
  else if (vi.mediaType === this.mediaTypes.SHARE && vi.id) {
    params.ci = vi.id;
    url += 'https://www.youtube.com/shared';
  } else {
    return undefined;
  }

  if (vi.list) {
    params.list = vi.list;
  }

  url += combineParams$8(params);

  if (vi.mediaType !== this.mediaTypes.PLAYLIST && startTime) {
    url += '#t=' + startTime;
  }
  return url;
};

YouTube.prototype.createEmbedUrl = function(vi, params) {
  var url = 'https://www.youtube.com/embed';

  if (vi.mediaType === this.mediaTypes.PLAYLIST && vi.list) {
    params.listType = 'playlist';
  } else if (vi.mediaType === this.mediaTypes.VIDEO && vi.id) {
    url += '/' + vi.id;
    //loop hack
    if (params.loop === '1') {
      params.playlist = vi.id;
    }
  } else {
    return undefined;
  }

  if (vi.list) {
    params.list = vi.list;
  }

  url += combineParams$8(params);

  return url;
};

YouTube.prototype.createImageUrl = function(baseUrl, vi, params) {
  if (!vi.id || vi.mediaType !== this.mediaTypes.VIDEO) {
    return undefined;
  }
  var url = baseUrl + vi.id + '/';
  var quality = params.imageQuality || this.defaultImageQuality;

  return url + quality + '.jpg';
};

YouTube.prototype.createShortImageUrl = function(vi, params) {
  return this.createImageUrl('https://i.ytimg.com/vi/', vi, params);
};

YouTube.prototype.createLongImageUrl = function(vi, params) {
  return this.createImageUrl('https://img.youtube.com/vi/', vi, params);
};

base.bind(new YouTube());

const {
  combineParams: combineParams$9,
  getTime: getTime$6,
} = util;

function SoundCloud() {
  this.provider = 'soundcloud';
  this.defaultFormat = 'long';
  this.formats = {
    long: this.createLongUrl,
    embed: this.createEmbedUrl,
  };
  this.mediaTypes = {
    TRACK: 'track',
    PLAYLIST: 'playlist',
    APITRACK: 'apitrack',
    APIPLAYLIST: 'apiplaylist',
  };
}

SoundCloud.prototype.parseUrl = function(url, result) {
  var match = url.match(
    /soundcloud\.com\/(?:([\w-]+)\/(sets\/)?)([\w-]+)/i
  );
  if (!match) {
    return result;
  }
  result.channel = match[1];
  if (match[1] === 'playlists' || match[2]) { //playlist
    result.list = match[3];
  } else { //track
    result.id = match[3];
  }
  return result;
};

SoundCloud.prototype.parseParameters = function(params) {
  if (params.t) {
    params.start = getTime$6(params.t);
    delete params.t;
  }
  return params;
};

SoundCloud.prototype.parseMediaType = function(result) {
  if (result.id) {
    if (result.channel === 'tracks') {
      delete result.channel;
      delete result.params.url;
      result.mediaType = this.mediaTypes.APITRACK;
    } else {
      result.mediaType = this.mediaTypes.TRACK;
    }
  }
  if (result.list) {
    if (result.channel === 'playlists') {
      delete result.channel;
      delete result.params.url;
      result.mediaType = this.mediaTypes.APIPLAYLIST;
    } else {
      result.mediaType = this.mediaTypes.PLAYLIST;
    }
  }
  return result;
};

SoundCloud.prototype.parse = function(url, params) {
  var result = {};
  result = this.parseUrl(url, result);
  result.params = this.parseParameters(params);
  result = this.parseMediaType(result);
  if (!result.id && !result.list) {
    return undefined;
  }
  return result;
};

SoundCloud.prototype.createLongUrl = function(vi, params) {
  var url = '';
  var startTime = params.start;
  delete params.start;

  if (vi.mediaType === this.mediaTypes.TRACK && vi.id && vi.channel) {
    url = 'https://soundcloud.com/' + vi.channel + '/' + vi.id;
  }
  else if (vi.mediaType === this.mediaTypes.PLAYLIST && vi.list && vi.channel) {
    url = 'https://soundcloud.com/' + vi.channel + '/sets/' + vi.list;
  }
  else if (vi.mediaType === this.mediaTypes.APITRACK && vi.id) {
    url = 'https://api.soundcloud.com/tracks/' + vi.id;
  }
  else if (vi.mediaType === this.mediaTypes.APIPLAYLIST && vi.list) {
    url = 'https://api.soundcloud.com/playlists/' + vi.list;
  } else {
    return undefined;
  }

  url += combineParams$9(params);

  if (startTime) {
    url += '#t=' + startTime;
  }
  return url;
};

SoundCloud.prototype.createEmbedUrl = function(vi, params) {
  var url = 'https://w.soundcloud.com/player/';
  delete params.start;

  if (vi.mediaType === this.mediaTypes.APITRACK && vi.id) {
    params.url = 'https%3A//api.soundcloud.com/tracks/' + vi.id;
  }
  else if (vi.mediaType === this.mediaTypes.APIPLAYLIST && vi.list) {
    params.url = 'https%3A//api.soundcloud.com/playlists/' + vi.list;
  } else {
    return undefined;
  }

  url += combineParams$9(params);
  return url;
};

base.bind(new SoundCloud());

const {
  combineParams: combineParams$a,
} = util;

function TeacherTube() {
  this.provider = 'teachertube';
  this.alternatives = [];
  this.defaultFormat = 'long';
  this.formats = {
    long: this.createLongUrl,
    embed: this.createEmbedUrl,
  };
  this.mediaTypes = {
    VIDEO: 'video',
    AUDIO: 'audio',
    DOCUMENT: 'document',
    CHANNEL: 'channel',
    COLLECTION: 'collection',
    GROUP: 'group',
  };
}

TeacherTube.prototype.parse = function(url, params) {
  var result = {};

  result.list = this.parsePlaylist(params);
  result.params = params;

  var match = url.match(
    /\/(audio|video|document|user\/channel|collection|group)\/(?:[\w-]+-)?(\w+)/
  );

  if (!match) {
    return undefined;
  }
  result.mediaType = this.parseMediaType(match[1]);
  result.id = match[2];

  return result;
};

TeacherTube.prototype.parsePlaylist = function(params) {
  if (params['playlist-id']) {
    var list = params['playlist-id'];
    delete params['playlist-id'];
    return list;
  }
  return undefined;
};

TeacherTube.prototype.parseMediaType = function(mediaTypeMatch) {
  switch (mediaTypeMatch) {
  case 'audio':
    return this.mediaTypes.AUDIO;
  case 'video':
    return this.mediaTypes.VIDEO;
  case 'document':
    return this.mediaTypes.DOCUMENT;
  case 'user/channel':
    return this.mediaTypes.CHANNEL;
  case 'collection':
    return this.mediaTypes.COLLECTION;
  case 'group':
    return this.mediaTypes.GROUP;
  }
};

TeacherTube.prototype.createLongUrl = function(vi, params) {
  if (!vi.id) {
    return undefined;
  }
  var url = 'https://www.teachertube.com/';

  if (vi.list) {
    params['playlist-id'] = vi.list;
  }

  if (vi.mediaType === this.mediaTypes.CHANNEL) {
    url += 'user/channel/';
  } else {
    url += vi.mediaType + '/';
  }
  url += vi.id;

  url += combineParams$a(params);

  return url;
};

TeacherTube.prototype.createEmbedUrl = function(vi, params) {
  if (!vi.id) {
    return undefined;
  }

  var url = 'https://www.teachertube.com/embed/';

  if (vi.mediaType === this.mediaTypes.VIDEO || vi.mediaType === this.mediaTypes.AUDIO) {
    url += vi.mediaType + '/' + vi.id;
  } else {
    return undefined;
  }

  url += combineParams$a(params);

  return url;
};

base.bind(new TeacherTube());

var lib = base;

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }

  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}

function _asyncToGenerator(fn) {
  return function () {
    var self = this,
        args = arguments;
    return new Promise(function (resolve, reject) {
      var gen = fn.apply(self, args);

      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
      }

      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
      }

      _next(undefined);
    });
  };
}
var index = /*#__PURE__*/
(function () {
  var _ref2 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee2(_ref) {
    var __deps__, __imports__, _imports__$grommet, Box, Image, Anchor, Text, Button, _imports__$utils, React, _, icons, JSONSchemaForm, Router, Link, napi, iconSize, IframeView, guessUrlType, _view, pluginSchema, uiSchema, edit, icon, preview, view;

    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            __deps__ = _ref.__deps__, __imports__ = _ref.__imports__;
            _imports__$grommet = __imports__.grommet, Box = _imports__$grommet.Box, Image = _imports__$grommet.Image, Anchor = _imports__$grommet.Anchor, Text = _imports__$grommet.Text, Button = _imports__$grommet.Button;
            _imports__$utils = __imports__.utils, React = _imports__$utils.React, _ = _imports__$utils.lodash, icons = _imports__$utils.icons, JSONSchemaForm = _imports__$utils.JSONSchemaForm, Router = _imports__$utils.Router, Link = _imports__$utils.Link;
            napi = __deps__.napi, iconSize = __deps__.iconSize;

            IframeView = function IframeView(_ref3) {
              var url = _ref3.url;
              return React.createElement(Box, {
                pad: {
                  bottom: '56.25%'
                },
                style: {
                  position: 'relative'
                },
                fill: true
              }, React.createElement("iframe", {
                style: {
                  position: 'absolute',
                  top: 0,
                  left: 0
                },
                width: "100%",
                height: "100%",
                src: url,
                frameBorder: "0",
                allowFullScreen: true
              }));
            };

            guessUrlType = function guessUrlType(url) {
              var type = 'default';

              if (url.endsWith('.jpg') || url.endsWith('.jpeg') || url.endsWith('.webp') || url.endsWith('.png')) {
                type = 'image';
              } else if (url.endsWith('.mp3') || url.endsWith('.wav') || url.endsWith('.ogg')) {
                type = 'audio';
              } else if (url.endsWith('.pdf')) {
                type = 'pdf';
              } else if (lib.parse(url)) {
                type = 'video';
              } else if (url.startsWith('mailto:')) {
                type = 'email';
              }

              return type;
            };

            _view = function _view(_ref4) {
              var size = _ref4.size;
              return function (_ref5) {
                var node = _ref5.node;

                var url = _.get(node, 'sides.link.url');

                var urlObj = new URL(url);
                var modes = {
                  email: React.createElement(Box, {
                    pad: "small",
                    align: "center",
                    background: {
                      color: 'black',
                      opacity: 'medium'
                    },
                    justify: "center",
                    round: "xsmall"
                  }, React.createElement(Anchor, {
                    size: size === 'small' ? 'xsmall' : size,
                    href: url,
                    label: url.split('mailto:')[1],
                    icon: size !== 'small' && React.createElement(icons.Mail, {
                      size: size,
                      color: "control"
                    })
                  })),
                  video: React.createElement(Box, {
                    fill: true,
                    pad: size === 'small' ? null : 'small'
                  }, React.createElement(IframeView, {
                    url: lib.create({
                      videoInfo: lib.parse(url),
                      format: 'embed',
                      params: {
                        controls: '1'
                      }
                    })
                  })),
                  audio: React.createElement(Box, {
                    pad: "small",
                    align: "center",
                    justify: "center",
                    background: {
                      color: 'black',
                      opacity: 'medium'
                    },
                    round: "xsmall"
                  }, React.createElement("audio", {
                    style: {
                      width: size === 'small' ? '150px' : '300px'
                    },
                    controls: true
                  }, React.createElement("source", {
                    src: url
                  }))),
                  pdf: React.createElement(Box, {
                    overflow: "auto",
                    fill: true,
                    align: "center",
                    justify: "center"
                  }, React.createElement(IframeView, {
                    url: url
                  })),
                  image: React.createElement(Box, {
                    fill: true,
                    pad: "small",
                    align: "center",
                    justify: "center"
                  }, React.createElement(Image, {
                    src: url,
                    fit: size === 'small' ? 'contain' : 'cover',
                    style: {
                      height: '100%',
                      width: '100%'
                    }
                  })),
                  "default": React.createElement(Box, {
                    pad: "small",
                    background: {
                      color: 'black',
                      opacity: 'medium'
                    },
                    round: "xsmall",
                    align: "center",
                    justify: "center"
                  }, window.location.hostname === urlObj.hostname ? React.createElement(Link, {
                    href: urlObj.pathname + urlObj.search
                  }, React.createElement(Anchor, {
                    size: size === 'small' ? 'xsmall' : size,
                    label: node.name
                  })) : React.createElement(Anchor, {
                    size: size === 'small' ? 'xsmall' : size,
                    label: size === 'small' ? "".concat(urlObj.hostname, "...") : url,
                    href: url,
                    target: "_blank"
                  }))
                };
                return React.createElement(Box, {
                  align: "center",
                  justify: "center",
                  fill: true,
                  overflow: "scroll",
                  pad: "small"
                }, modes[guessUrlType(url)]);
              };
            };

            pluginSchema = {
              type: 'object',
              required: ['url'],
              properties: {
                url: {
                  type: 'string',
                  title: 'URL'
                }
              }
            };
            uiSchema = {
              url: {
                'ui:autofocus': true,
                'ui:options': {
                  testid: 'url.input'
                }
              }
            };

            edit = function edit(_ref6) {
              var node = _ref6.node;

              var _$get = _.get(node, 'sides.link', {}),
                  url = _$get.url;

              return React.createElement(Box, {
                fill: true,
                align: "center",
                justify: "center"
              }, React.createElement(Box, {
                width: "large",
                overflow: "scroll"
              }, React.createElement(JSONSchemaForm, {
                formData: {
                  url: url
                },
                schema: pluginSchema,
                uiSchema: uiSchema,
                onSubmit:
                /*#__PURE__*/
                function () {
                  var _ref8 = _asyncToGenerator(
                  /*#__PURE__*/
                  regeneratorRuntime.mark(function _callee(_ref7) {
                    var formData;
                    return regeneratorRuntime.wrap(function _callee$(_context) {
                      while (1) {
                        switch (_context.prev = _context.next) {
                          case 0:
                            formData = _ref7.formData;
                            _context.next = 3;
                            return napi.updateNodeSide(node, 'link', formData);

                          case 3:
                            Router.push({
                              pathname: Router.pathname,
                              query: {
                                node: node.id
                              }
                            });

                          case 4:
                          case "end":
                            return _context.stop();
                        }
                      }
                    }, _callee);
                  }));

                  return function (_x2) {
                    return _ref8.apply(this, arguments);
                  };
                }()
              })), React.createElement(Box, {
                align: "start",
                justify: "start",
                gap: "small",
                pad: "small"
              }, React.createElement(Text, null, React.createElement("i", null, "To use the bookmarklet drag this to your bookmarks toolbar:")), React.createElement(Box, {
                round: "xsmall",
                pad: "small",
                background: {
                  color: 'black',
                  opacity: 'medium'
                }
              }, React.createElement(Button, {
                plain: true,
                href: "javascript:void(location.href=\"".concat(window.location.origin).concat(window.location.pathname, "?node=\"+encodeURIComponent(location.href)+\"&title=\"+encodeURIComponent(document.title))")
              }, React.createElement(Text, {
                weight: "bold"
              }, "Create Node")))));
            };

            icon = function icon(_ref9) {
              var node = _ref9.node;
              var linkIcons = {
                video: React.createElement(icons.CirclePlay, {
                  size: iconSize
                }),
                audio: React.createElement(icons.Music, {
                  size: iconSize
                }),
                email: React.createElement(icons.Mail, {
                  size: iconSize
                }),
                pdf: React.createElement(icons.DocumentPdf, {
                  size: iconSize
                }),
                image: React.createElement(icons.Image, {
                  size: iconSize
                }),
                "default": React.createElement(icons.Link, {
                  size: iconSize
                })
              };

              var url = _.get(node, 'sides.link.url');

              return React.createElement(Box, {
                fill: true,
                align: "center",
                justify: "center"
              }, linkIcons[url ? guessUrlType(url) : 'default']);
            };

            preview = _view({
              size: 'small'
            });
            view = _view({
              size: 'medium'
            });
            return _context2.abrupt("return", {
              modes: {
                icon: icon,
                preview: preview,
                view: view,
                edit: edit
              }
            });

          case 14:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function (_x) {
    return _ref2.apply(this, arguments);
  };
})();

export default index;
