const search = ({ backend, searchEngines }) => async (q, provider) => {
  let results
  if (provider) {
    results = await searchEngines[provider].search(q)
  } else {
    results = await backend.search(q)
  }
  return results
}

export default search
