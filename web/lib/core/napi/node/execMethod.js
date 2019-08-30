import { execMethodFromSrc } from '../../utils'

// const execMethod = async (node, methodName, args, deps) => {
//   let res
//   try {
//     const src = node.sides.methods.methods[methodName]
//     const func = execMethodFromSrc(src, deps)(node, args)
//     res = await func()
//   } catch (e) {
//     res = { message: e.message }
//   }
//   return res
// }

const execMethod = ({ napi }) => async (node, methodName, args, deps) => {
  const src = node.sides.methods.methods[methodName]
  const func = execMethodFromSrc(src, { ...deps, napi })(node, args)
  return func()
}

export default execMethod
