import * as actiontypes from './constants'

export const addNumberAction = (num) => ({
  type: actiontypes.ADD_NUMBER,
  num
})
export const subNumberAction = (num) => ({
  type: actiontypes.SUB_NUMBER,
  num
})