import _ from "lodash";

export const validateConditionsToShow = (selectedItems: any[] = [], conditions: any[] = []): boolean => {
  let shouldShow = true;
  let count = 0;
  while (count < conditions.length && shouldShow) {
    const condition = conditions[count];
    const type = condition?.type || "";
    // Num items selected
    if (type === "count") {
      const numItems = selectedItems.length;
      if (numItems > condition.value) shouldShow = false;
    } else if (type === "arrayItem") {
      if (!validateFieldArray(selectedItems, condition)) shouldShow = false;
    } else if (type === "item") {
      // Switch validation
      const typeConditionItem = condition?.condition || "";
      switch (typeConditionItem) {
        // GE: Greater equal than
        // GT: Greater than
        // LE: Lower equeal than
        // LT: Lower than
        case "gt": {
          if (!greaterThan(selectedItems, condition)) shouldShow = false;
          break;
        }
        case "eq": {
          if (!equal(selectedItems, condition)) shouldShow = false;
          break;
        }
        case "neq": {
          if (!nequal(selectedItems, condition)) shouldShow = false;
          break;
        }
        case "in": {
          if (!validateIn(selectedItems, condition)) shouldShow = false;
          break;
        }
        case "nin": {
          if (!validateNin(selectedItems, condition)) shouldShow = false;
          break;
        }
        default: {
          console.info("Condition no defined: ", typeConditionItem);
        }
      }
    }
    count++;
  }
  return shouldShow;
};

// Get field value
const getFieldValue = (field: string, item: any) => {
  let data: any;
  const parts = field.split(".");
  if (field && item) {
    parts.forEach((part) => {
      if (data) {
        data = data[part];
      } else {
        data = item[part];
      }
    });
  }
  return data;
};
// Get untill array
const getFieldArrayValue = (field: string, item: any) => {
  // Returned
  let data: any;
  let newField = "";
  // Parts
  let partsUsed = [];
  const parts = field.split(".");
  // Variables of loop
  let i = 0;
  let find = false;
  if (field && item) {
    while (!find && i < parts.length) {
      const part = parts[i];
      if (data) {
        data = data[part];
      } else {
        data = item[part];
      }
      // Add part used in the object
      partsUsed.push(part);
      // If find the array, generate the rest of field access
      if (_.isArray(data)) {
        const partsNotUsed = _.differenceWith(parts, partsUsed, _.isEqual);
        newField = partsNotUsed.join(".");
        find = true;
      }
    }
  }
  return { items: data, newField: newField };
};

// Validate when field is an array
const validateFieldArray = (selectedItems: any[], condition: any): boolean => {
  let valid = true;
  let count = 0;
  while (count < selectedItems.length && valid) {
    const selectedItem = selectedItems[count];
    const { field } = condition;
    const { items, newField } = getFieldArrayValue(field, selectedItem);
    const _condition = { ...condition };
    _condition.field = newField;
    // Do basic operations
    const typeConditionItem = _condition.condition;
    switch (typeConditionItem) {
      case "eq":
        valid = equal(items, _condition);
        break;
      case "neq":
        valid = nequal(items, _condition);
        break;
      case "in":
        valid = validateIn(items, _condition);
        break;
      case "nin":
        valid = validateNin(items, _condition);
        break;
      case "has":
        valid = validateHas(items, _condition);
        break;
      case "hasn":
        valid = validateHasn(items, _condition);
        break;
      default:
        valid = false;
        console.info("Condition no defined: ", typeConditionItem);
    }
    count++;
  }
  return valid;
};

// Validations
const greaterThan = (selectedItems: any[], condition: any): boolean => {
  let valid = true;
  let count = 0;
  while (count < selectedItems.length && valid) {
    // Item
    const selectedItem = selectedItems[count];
    // Get value field
    const { field, value } = condition;
    const fieldValue = getFieldValue(field, selectedItem);
    if (fieldValue <= value) {
      valid = false;
    }
    count++;
  }
  return valid;
};
const equal = (selectedItems: any[], condition: any): boolean => {
  let valid = true;
  let count = 0;
  while (count < selectedItems.length && valid) {
    // Item
    const selectedItem = selectedItems[count];
    // Get value field
    const { field, value } = condition;
    const fieldValue = getFieldValue(field, selectedItem);
    if (fieldValue !== value) {
      valid = false;
    }
    count++;
  }
  return valid;
};
const nequal = (selectedItems: any[], condition: any): boolean => {
  let valid = true;
  let count = 0;
  while (count < selectedItems.length && valid) {
    // Item
    const selectedItem = selectedItems[count];
    // Get value field
    const { field, value } = condition;
    const fieldValue = getFieldValue(field, selectedItem);
    if (fieldValue === value) {
      valid = false;
    }
    count++;
  }
  return valid;
};
const validateIn = (selectedItems: any[], condition: any): boolean => {
  let valid = true;
  let count = 0;
  while (count < selectedItems.length && valid) {
    // Item
    const selectedItem = selectedItems[count];
    // Get value field
    const { field, value } = condition;
    const fieldValue = getFieldValue(field, selectedItem);
    if (!value || value.indexOf(fieldValue) === -1) {
      valid = false;
    }
    count++;
  }
  return valid;
};
const validateNin = (selectedItems: any[], condition: any): boolean => {
  let valid = true;
  let count = 0;
  while (count < selectedItems.length && valid) {
    // Item
    const selectedItem = selectedItems[count];
    // Get value field
    const { field, value } = condition;
    const fieldValue = getFieldValue(field, selectedItem);
    if (value && value.indexOf(fieldValue) !== -1) {
      valid = false;
    }
    count++;
  }
  return valid;
};
// Has almost one of the values
const validateHas = (selectedItems: any[], condition: any): boolean => {
  let valid = false; // Could be renamed as found
  let count = 0;
  while (count < selectedItems.length && !valid) {
    // Item
    const selectedItem = selectedItems[count];
    // Get value field
    const { field, value } = condition;
    const fieldValue = getFieldValue(field, selectedItem);
    if (value && value.indexOf(fieldValue) !== -1) {
      valid = true;
    }
    count++;
  }
  return valid;
};
// Hasn't almost one of the values
const validateHasn = (selectedItems: any[], condition: any): boolean => {
  let valid = false; // Could be renamed as found
  let count = 0;
  while (count < selectedItems.length && !valid) {
    // Item
    const selectedItem = selectedItems[count];
    // Get value field
    const { field, value } = condition;
    const fieldValue = getFieldValue(field, selectedItem);
    if (value && value.indexOf(fieldValue) === -1) {
      valid = true;
    }
    count++;
  }
  return valid;
};
