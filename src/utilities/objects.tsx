export const objectIsClearOrEmpty = (objt: any) => {
  if (!objt || (objt && !Object.keys(objt).length)) {
    return true;
  } else {
    let allPropsAreEmpty = true;
    Object.keys(objt).map((property) => {
      if (objt[property] || typeof (objt[property] !== "undefined") || typeof (objt[property] !== null)) {
        allPropsAreEmpty = false;
      }
      return null;
    });
    return allPropsAreEmpty;
  }
};

export const replaceNullByEmptyString = (objt: any, recursive = true) => {
  let newObject = objt;
  if (objt && typeof objt === "object") {
    Object.keys(objt).forEach((property) => {
      let value = objt[property];
      if (value === null || typeof value === "undefined") {
        value = "";
      } else {
        if (recursive && typeof value === "object") {
          value = replaceNullByEmptyString(value);
        }
      }
      newObject[property] = value;
    });
  }
  return newObject;
};
