export function getAll(storageString: string): any {
  let value = {};
  try {
    value = JSON.parse(storageString);
  } catch (e) {
    console.error(e);
  }
  return value;
}

export function getOneInArray(keys: any, key: string): boolean {
  if (keys[key]) return true;
  return false;
}

export function getArrayLength(array: any[] = []): number {
  if (array && typeof array === "object" && typeof array[Symbol.iterator] === "function" && array.length) return array.length;
  return 0;
}
export function checkIfObject(obj: any): boolean {
  return obj !== undefined && obj !== null && obj.constructor === Object;
}
export function checkIfArray(array: any[]): boolean {
  return array !== undefined && array !== null && typeof array === "object" && array.constructor === Array;
}
export function checkIfFunction(prop: any): boolean {
  if (prop && typeof prop === "function") return true;
  return false;
}
export function isTrue(value: any): boolean {
  return value === true || value === "true" || value === "TRUE";
}
export function isDefined(item: any): boolean {
  return !(item === null || item === undefined || item === "");
}

export function searchPropertiesValues(value: string, propertyObj: any): boolean {
  const keys = Object.keys(propertyObj);
  let find = false,
    i = 0;
  while (i < keys.length && !find) {
    const key = keys[i];
    if (propertyObj[key] === value) find = true;
    i++;
  }
  return find;
}

export function searchPropertiesValuesInArray(value: string, propertyObj: any, propertiesSearch: any[]): boolean {
  let find = false;
  propertiesSearch.forEach((propertySearch) => {
    if (propertyObj[propertySearch] === value) find = true;
  });
  return find;
}

export function sortFunction(a: string | number, b: string | number): number {
  if (typeof a === "string" && typeof b === "string") {
    return a.localeCompare(b);
  } else if (typeof a === "number" && typeof b === "number") {
    return a - b;
  } else {
    if (isDefined(a) && !isDefined(b)) {
      return 1;
    } else if (!isDefined(a) && isDefined(b)) {
      return -1;
    } else {
      return 0;
    }
  }
}
