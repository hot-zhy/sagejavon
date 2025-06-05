/**
 * 生成32位随机字符串
 * @returns { String }
 */
export function newRandomId (): string {
  let randomId = ''
  for (let i = 1; i <= 32; i++) {
    const n = Math.floor(Math.random() * 16.0).toString(16)
    randomId += n
    if ((i === 8) || (i === 12) || (i === 16) || (i === 20)) {
      randomId += '-'
    }
  }
  return randomId
}

/**
 * 根据起点和终点获取中间任意值
 * @param { number } min 区间最小值
 * @param { number } max 区间最大值
 * @return { number }
 */
export function getRandomNum (min: number, max: number): number {
  const t = Math.random() * (max - min) + min
  return t
}

/**
 * 函数节流
 * @param fn
 * @param t
 * @returns
 */
export function throttle (fn: { apply: (arg0: any, arg1: any[]) => void }, t: number): any {
  let flag = true
  const interval = t || 500
  return function (this: any, ...args: any) {
    if (flag) {
      fn.apply(this, args)
      flag = false
      setTimeout(() => {
        flag = true
      }, interval)
    }
  }
}

/**
 * 函数防抖
 * @param fn
 * @param t
 * @returns
 */
export function debounce (fn: { apply: (arg0: any, arg1: any) => void }, t: number): any {
  let timeId: any = null
  const delay = t || 500
  return function (this: any, ...args: any) {
    if (timeId) {
      clearTimeout(timeId)
    }
    timeId = setTimeout(() => {
      timeId = null
      fn.apply(this, args)
    }, delay)
  }
}
