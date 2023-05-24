import { matchPath } from "react-router-dom";

import { FiltersResults } from "../constants";

export const objectToQueryString = (values: any, customHistory: any) => {
  const values2 = convertObjectToSearchQuery(values);
  if (customHistory) {
    customHistory.push({
      pathname: window.location.pathname.replace(process.env.PUBLIC_URL, ""),
      hash: window.location.hash,
      search: new URLSearchParams(values2).toString(),
    });
  }
};

export const clearSearch = (history: any) => {
  history?.push({
    pathname: window.location.pathname.replace(process.env.PUBLIC_URL, ""),
    hash: window.location.hash,
    search: new URLSearchParams("").toString(),
  });
};

export const convertObjectToSearchQuery = (values: any, arraysWithComma = true) => {
  if (!arraysWithComma) {
    //here repeats the value in the query string for each value of an array
    const searchParams = new URLSearchParams();
    let values2 = { ...values };
    Object.keys(values2).forEach(function (key) {
      let fieldValue = values[key];

      if (typeof fieldValue === "object") {
        if (values2[key]) {
          Object.keys(values2[key]).forEach(function (index) {
            searchParams.append(key, values2[key][index]);
          });
        }
      } else {
        searchParams.append(key, fieldValue);
      }
    });
    return searchParams.toString();
  } else {
    //we need to pass the history from react-router, using the other won't be up to date
    let values2: any = {};
    Object.keys(values).forEach(function (key) {
      let fieldValue = values[key];
      if (typeof fieldValue === "object") {
        fieldValue = "";
        if (values[key]) {
          Object.keys(values[key]).forEach(function (key2) {
            if (values[key]) {
              if (values[key][key2] || values[key][key2] === 0) {
                if (typeof values[key][key2] === "object") {
                  serializeSubObject(values[key], key, values);
                } else {
                  fieldValue = fieldValue === "" ? values[key][key2] : fieldValue + "," + values[key][key2];
                }
              }
            }
          });
        }
      }
      const valueIsEmpty = fieldValue === "" || typeof fieldValue === "undefined" || fieldValue === null;
      if (!valueIsEmpty) {
        values2[key] = fieldValue;
      }
    });

    return new URLSearchParams(values2).toString();
  }
};

export const serializeSubObject = (object: any, objectName: any, parentObject: any) => {
  //for each key in the object
  Object.keys(object).forEach(function (arrayItemKey) {
    let arrayItem = object[arrayItemKey];
    if (arrayItem) {
      Object.keys(arrayItem).forEach(function (arrayPropertyName) {
        let objectKey = objectName + "[" + arrayItemKey + "]." + arrayPropertyName;
        let fieldValue = "";
        if (typeof arrayItem[arrayPropertyName] === "object") {
          serializeSubObject(fieldValue, objectKey, parentObject);
        } else {
          fieldValue = fieldValue === "" ? arrayItem[arrayPropertyName] : fieldValue + "," + arrayItem[arrayPropertyName];
          parentObject[objectKey] = fieldValue;
        }
      });
    }
  });
  //remove old object
  //parentObject = _.omit(parentObject, [objectName]);
};

export const queryStringToObject = (queryString: any) => {
  const searchParams = new URLSearchParams(queryString);
  let result: FiltersResults = {};
  for (let entry of searchParams.entries()) {
    // each 'entry' is a [key, value] tupple
    let [key, value] = entry;
    //if value contains a comma means it's multiple (like multiple checkboxes)
    if (value.indexOf(",") !== -1) {
      result[key] = {};
      if (value) {
        let newValue = value.split(",");
        result[key] = [];
        for (let i = 0; i < newValue.length; i++) {
          result[key].push(newValue[i]);
        }
      }
    } else {
      if (key === "page" || key === "perPage") {
        result[key] = parseInt(value);
      } else {
        result[key] = value;
      }
    }
  }

  return result;
};

export const urlMatch = (elementURL: string, currentBrowserURL: string) => {
  return matchPath(currentBrowserURL, {
    path: elementURL,
    exact: true,
  });
};

export const urlMatchIncludingChildren = (elementURL: string, currentBrowserURL: string) => {
  let doesMatch = matchPath(currentBrowserURL, {
    path: elementURL,
    exact: false,
  });
  return doesMatch;
};

export const getCurrentPage = (pages: any[]) => {
  let currentPage = null;
  if (pages && pages.length) {
    pages.forEach((element) => {
      let match;

      match = urlMatch(element.url, window.location.pathname.replace(process.env.PUBLIC_URL, ""));

      if (match != null) {
        currentPage = element;
      }
    });

    currentPage = currentPage !== null ? currentPage : null;
    return currentPage;
  }
};

export const catPartNoEncode = (catPartNo: any) => {
  let encondedCatPart = `${catPartNo}`;
  let hashtag = "#";
  let slash = "/";
  let hashtagReplacement = "¿";
  let slashReplacement = "¡";
  if (encondedCatPart.includes(hashtag)) {
    encondedCatPart = catPartNo.replace(hashtag, hashtagReplacement);
  } else if (encondedCatPart.includes(slash)) {
    encondedCatPart = catPartNo.replace(slash, slashReplacement);
  }
  return encondedCatPart;
};

export const catPartNoDecode = (catPartNo: any) => {
  let encondedCatPart = `${catPartNo}`;
  let hashtag = "#";
  let slash = "/";
  let hashtagReplacement = "¿";
  let slashReplacement = "¡";
  if (encondedCatPart.includes(hashtagReplacement)) {
    encondedCatPart = catPartNo.replace(hashtagReplacement, hashtag);
  } else if (encondedCatPart.includes(slashReplacement)) {
    encondedCatPart = catPartNo.replace(slashReplacement, slash);
  }
  return encondedCatPart;
};
