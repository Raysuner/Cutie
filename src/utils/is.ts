const toString = Object.prototype.toString;

export function isObject(arg: object) {
  return toString.call(arg) === '[object Object]';
}

export function isNumber(arg: number) {
  return arg && typeof arg === 'number';
}

export function isString(arg: string) {
  return typeof arg === 'string';
}

export function isBoolean(arg: boolean) {
  return typeof arg === 'boolean';
}
