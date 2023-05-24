export const serializeForm = (formElement: any, excludeEmptyValues: boolean | undefined = true) => {
  // Per 17.12.1 in the HTML 4 spec:
  // Disabled controls cannot be successfully posted.
  // https://stackoverflow.com/questions/7357256/disabled-form-inputs-do-not-appear-in-the-request

  const disabledInputs = document.querySelectorAll("form :disabled");
  for (let input of disabledInputs) input.removeAttribute("disabled");
  const currentFormValues = new FormData(formElement);
  const entries: IterableIterator<[string, FormDataEntryValue]> = currentFormValues.entries();
  var object: any = {};
  // Display the key/value pairs
  for (const pair of entries) {
    const key: any = pair[0];
    const value: any = pair[1];

    if (!excludeEmptyValues || (excludeEmptyValues && value && value !== "" && typeof value != "undefined" && value !== null)) {
      processObject(object, key, value);
    }
  }
  for (let input of disabledInputs) input.setAttribute("disabled", "");
  return object;
};

function processObject(obj: any, key: any, value: any) {
  if (key && key.indexOf(".") !== -1) {
    var attrs = key.split(".");
    var tx = obj;
    for (var i = 0; i < attrs.length - 1; i++) {
      var isArray = attrs[i].indexOf("[") !== -1;
      var isNestedArray = isArray && i !== attrs.length - 1;
      var nestedArrayIndex = null;
      if (isArray) {
        nestedArrayIndex = attrs[i].substring(attrs[i].indexOf("[") + 1, attrs[i].indexOf("]"));
        attrs[i] = attrs[i].substring(0, attrs[i].indexOf("["));
        if (tx[attrs[i]] === undefined) {
          tx[attrs[i]] = [];
        }
        tx = tx[attrs[i]];
        if (isNestedArray) {
          if (tx[nestedArrayIndex] === undefined) {
            tx[nestedArrayIndex] = {};
          }
          tx = tx[nestedArrayIndex];
        }
      } else {
        if (tx[attrs[i]] === undefined) {
          tx[attrs[i]] = {};
        }
        tx = tx[attrs[i]];
      }
    }
    processObject(tx, attrs[attrs.length - 1], value);
  } else {
    var finalArrayIndex = null;
    if (key.indexOf("[") !== -1) {
      finalArrayIndex = key.substring(key.indexOf("[") + 1, key.indexOf("]"));
      key = key.substring(0, key.indexOf("["));
    }
    if (finalArrayIndex === null) {
      let existingValue = obj[key];
      if (existingValue !== value) {
        //ignore duplicated entries (like when there are 2 inputs with the same name and value inside a form)
        if (existingValue) {
          obj[key] = typeof existingValue === "object" && existingValue.constructor === Array ? existingValue : [existingValue];
          obj[key].push(value);
        } else {
          obj[key] = value;
        }
      }
    } else {
      if (obj[key] === undefined) {
        obj[key] = [];
      }
      obj[key][finalArrayIndex] = value;
    }
  }
}

export const getNestedObjectValueByString = function (object: any, s: string) {
  if (s) {
    s = s.replace(/\[(\w+)\]/g, ".$1"); // convert indexes to properties
    s = s.replace(/^\./, ""); // strip a leading dot
    var a = s.split(".");
    for (var i = 0, n = a.length; i < n; ++i) {
      var k = a[i];
      if (object) {
        if (k in object) {
          object = object[k];
        } else {
          return;
        }
      }
    }
    return object;
  }
};

export const mergeValuesIncludingEmpty = (values1: any, values2: any) => {
  var missingValues: any = {};
  if (values1) {
    for (var prop in values1) {
      if (Object.prototype.hasOwnProperty.call(values1, prop)) {
        if (!values2 || !Object.prototype.hasOwnProperty.call(values2, prop)) {
          missingValues[prop] = null;
        }
      }
    }
  }
  let newValues = { ...values2, ...missingValues };
  return newValues;
};

export const getInputValueFromEvent = (event: any) => {
  if (event && event.target) {
    let newValue = event.target.value;
    if (event.target && event.target.options) {
      var options = event.target.options;
      newValue = [];
      for (var i = 0, l = options.length; i < l; i++) {
        if (options[i].selected) {
          newValue.push(options[i].value);
        }
      }
    }
    return newValue;
  }
};
