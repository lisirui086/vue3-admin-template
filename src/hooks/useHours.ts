const useHours = (): string => {
  let hoursMsg: string = '你好'

  let date = new Date()
  let hours = date.getHours()

  if (hours > 6 && hours <= 9) {
    hoursMsg = '早上好'
  } else if (hours > 10 && hours <= 14) {
    hoursMsg = '中午好'
  } else if (hours > 15 && hours <= 18) {
    hoursMsg = '下午好'
  } else {
    hoursMsg = '晚上好'
  }
  return hoursMsg
}
export default useHours
