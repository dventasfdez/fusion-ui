import { DateTime } from "luxon";

const invalidNameWithHyphenRegExp = /[\x21-\x26\x28-\x2C\x2E-\x2F\x3A-\x40\x5B-\x5D\x7B-\x7D]/;
const validationIsGood = undefined;

export const required = (value: string | string[] | undefined) => {
  if (typeof value === "number") {
    return validationIsGood;
  }
  if (typeof value === "object") {
    const value2: any = value;
    if (value2?.type === "FileSelector") {
      if (!value2?.state?.value) {
        return "validations.required";
      }
    } else if (!value?.length) {
      return "validations.required";
    }
  } else if (typeof value === "string") {
    if (value.replace(/\s/g, "").length > 0) {
      return validationIsGood;
    } else {
      return "validations.required";
    }
  } else if (value !== null && typeof value !== "undefined") {
    return validationIsGood;
  } else {
    return "validations.required";
  }
};
export const isSupportedMimeType = (input: any) => {
  const _accept = input?.props?.accept as string;
  const _current = input?.state?.fileType as string;
  return !_current || _accept?.includes(_current) ? validationIsGood : "validations.file.unsupported";
};

export const maximumFileSize = (input: any, options?: any) => {
  const maxSize = options?.maxSize || input?.props?.maximumSize;
  const fileSize = options?.fileSize || (input?.state?.fileSize as number);
  return !fileSize || fileSize < maxSize ? validationIsGood : "validations.file.tooLarge";
};

export const alphabet = (value: any) => {
  return value && /[\x21-\x26\x28-\x2F\x3A-\x40\x5B-\x5D\x7B-\x7D]/i.test(value) ? "Must be alphabet" : validationIsGood;
};
export const alphanumeric = (value: any) => {
  return value && !/^[A-Z0-9]+$/i.test(value) ? "Must be alphanumeric" : validationIsGood;
};

export const numeric = (value: any) => {
  return value && !/^[0-9]+$/i.test(value) ? "Must be numeric" : validationIsGood;
};

export const uuid = (value: any) => {
  return value && !/^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/i.test(value) ? "Must be a UUID" : validationIsGood;
};

export const email = (value: any) => {
  return value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value) ? "public.descriptionEmail" : validationIsGood;
};
// export const phone = (value: any) => {
//   return value && !regExpHelper.isPhone(value) ? "validations.phone.invalid"  : validationIsGood;
// };
export const _void = (_value: any) => {
  return validationIsGood;
};
export const url = (value: any) => {
  return value && !/^((https|http):\/\/)?(www\.)?(([-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6})|localhost:3001)\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)$/i.test(value)
    ? "Invalid url address"
    : validationIsGood;
};

export const hexacode = (value: any) => {
  return value && !/^#([A-F0-9]{3}|[A-F0-9]{6})$/i.test(value) ? "Invalid hexacode string" : validationIsGood;
};

export const validateAlphabetWithHyphen = (value: string) => {
  return invalidNameWithHyphenRegExp.test(value) ? "validations.invalid.character" : validationIsGood;
};
export const fiscalCode = (value: string) => {
  return value && !/^([A-Za-z]){6,6}([A-Za-z0-9]){2,2}([A-Za-z]){1,1}([A-Za-z0-9]){7,7}$/i.test(value) ? "Please enter a valid fiscal code." : validationIsGood;
};

export const date = (value: any, _context: any, inputComponent: any) => {
  if (!value || Object.prototype.toString.call(value) === "[object Date]") {
    return validationIsGood;
  } else {
    let isDate = null;
    let format = inputComponent && inputComponent.props.dateFormat ? inputComponent.props.dateFormat : null;
    if (value) {
      if (format) {
        isDate = DateTime.fromFormat(value, format).isValid;
      } else {
        isDate = DateTime.fromJSDate(value).isValid;
      }
    }
    if (isDate) {
      return validationIsGood;
    }
    const formatMessage = " (" + format + ")";
    return "Date is not correct" + formatMessage;
  }
};

export const minLength = (minLengthValue: any) => (value: any) => value && value.length < minLengthValue ? `Must be ${minLengthValue} characters or more` : validationIsGood;

export const maxLength = (maxLengthValue: number) => {
  const maxLengthCalc = (value: string) => (value && value.length > maxLengthValue ? `Must be ${maxLengthValue} characters or less` : validationIsGood);
  return maxLengthCalc;
};

export const totalLength = (totalLengthValue: any) => (value: any) =>
  value && (value.length > totalLengthValue || value.length < totalLengthValue) ? `Must be ${totalLengthValue} characters` : validationIsGood;

export const min = (minValue: any) => (value: any) => value < minValue ? `Value must be higher than ${minValue}` : validationIsGood;

export const max = (maxValue: any) => (value: any) => value > maxValue ? `Value must be lower than ${maxValue}` : validationIsGood;

export const min1 = (value: any) => (value < 1 ? `Value must be higher than 1` : validationIsGood);

export const passwordsMatch = (value: any, context: any): any => {
  const otherPwdField = context.inputs.find((a: any) => a.props.name === "password");

  return value !== otherPwdField.state.value ? "Passwords don't match" : validationIsGood;
};
export const minValidator = (value: any, allValues: any) => (value > allValues.max ? "Min cannot be higher than Max" : validationIsGood);

export const maxValidator = (value: any, allValues: any) => (value < allValues.min ? "Max cannot be lower than Min" : validationIsGood);

export const minYears = (minYearsValue: any) => (value: any, _context: any, inputComponent: any) => {
  if (value) {
    let _date = null;
    let isValidAge = false;
    let format = inputComponent && inputComponent.props.dateFormat ? inputComponent.props.dateFormat : null;
    // Get date in format
    if (format) {
      _date = DateTime.fromFormat(value, format);
    } else {
      _date = DateTime.fromJSDate(value);
    }
    // Check if is valid
    if (_date.isValid) {
      const years = DateTime.now().diff(_date, "years");
      isValidAge = years >= minYearsValue;
    }
    return !isValidAge ? `Must be ${minYearsValue} age years or more` : validationIsGood;
  }
};

export const minYears16 = minYears(16);
export const minYears18 = minYears(18);
export const minYears21 = minYears(21);

export const mustContainLowerCase = (value: any) => {
  const passwordRegex = new RegExp("^((?=.*[a-z]))");
  return value && !passwordRegex.test(value) ? "Password should contain a lower case letter" : validationIsGood;
};

export const mustContainUpperCase = (value: any) => {
  const passwordRegex = new RegExp("^((?=.*[A-Z]))");
  return value && !passwordRegex.test(value) ? "Password should contain an upper case letter" : validationIsGood;
};

export const mustContainSpecialCharacter = (value: any) => {
  // prettier-ignore
  const passwordRegex = new RegExp("^((?=.*[!@#$%^&*]))");
  return value && !passwordRegex.test(value) ? "Password should contain a Special Character" : validationIsGood;
};

export const isChecked = (input: any, context: any) => {
  if (context && context.inputs && context.inputs.length > 0) {
    return checkIfOneChecked(input, context);
  } else {
    return input && input.state && input.state.checked ? validationIsGood : "validations.required";
  }
};

export const isRadioChecked = (input: any, context: any) => {
  // Maintain this function in order to have separte logic
  // Avoid codesmell
  return isChecked(input, context);
};

function checkIfOneChecked(input: any, context: any) {
  let thereIsOneChecked = false;
  context.inputs.forEach((element: any) => {
    if (!thereIsOneChecked && element.props.name === input.props.name && element.state.checked) {
      thereIsOneChecked = true;
    }
  });
  return thereIsOneChecked ? validationIsGood : "validations.required";
}

export const hasFileDropFiles = (input: any, _context: any) => {
  return input && input.state && input.state.files && input.state.files.length ? validationIsGood : "validations.required";
};
export const hasFileUploaderFiles = (input: any, _context: any) => {
  return input && input.state && input.state.filesValue?.length > 0 ? validationIsGood : "validations.required";
};

export const hasFileSelectorFiles = (input: any) => {
  return input && input.state && input.state.value && input.state.value.length ? validationIsGood : "validations.required";
};

export interface IValidationSummaryItem {
  valid: boolean;
  inputComponent: any;
  name: string;
  value: any;
  errors: string[];
}
export interface IValidationSummary {
  valid: boolean;
  items: IValidationSummaryItem[];
}
/**
 * This function calls behind the sceenes validateInputVerbose with the difference that only returns true or false rather than an object sumarizing the errors.
 * This function goes through all validation functions passed as properties in an input, and uses them to verify the value matches all of them, if the value fails in any of those, the input would be marked as Invalid setting it's stat
 * @returns true or false
 * @param inputComponent - Is the actual input component
 * @param context - Is the form context, where the input is loaded
 */
export async function validateInput(inputComponent: any, context: any, fromFake?: boolean) {
  const validationSumaryItem: IValidationSummaryItem = await validateInputVerbose(inputComponent, context, fromFake);
  return validationSumaryItem.valid;
}

/**
 * This function goes through all validation functions passed as properties in an input, and uses them to verify the value matches all of them, if the value fails in any of those, the input would be marked as Invalid setting it's state
 * @returns an object that will contain the following
 *  IValidationSummaryItem { valid: boolean; inputComponent: any; name: string; value: any; errors: string[]; }
 * @param inputComponent - Is the actual input component
 * @param context - Is the form component, where the input is loaded
 */
export async function validateInputVerbose(inputComponent: any, context: any, fromFake?: boolean) {
  const inputValidations = inputComponent.props.validations || [];
  let validationSumaryItem: IValidationSummaryItem = {
    valid: true,
    inputComponent: inputComponent,
    name: inputComponent?.props?.name,
    value: inputComponent?.state?.value,
    errors: [],
  };
  if (inputComponent.props.visible !== false && (inputValidations?.length || inputComponent.state.requireByRelated) && !inputComponent.state.disabled) {
    let arrayOfErrors: string[] = [];
    if (inputComponent._isMounted) {
      inputComponent.setState({ loading: true });
    }
    // Required related
    if (inputComponent.state.requireByRelated) {
      const errorRelatedRequired = required(inputComponent.state.value);
      if (typeof errorRelatedRequired !== "undefined") arrayOfErrors.push("validations.required.related");
    }
    for await (const validationFunction of inputValidations) {
      if (typeof validationFunction === "function") {
        const type = inputComponent.state.type;
        let errorMessage: string | undefined = "";
        switch (type) {
          case "checkbox":
            if (validationFunction === required) errorMessage = isChecked(inputComponent, context);
            else errorMessage = await validationFunction(inputComponent.state.value, context, inputComponent, fromFake);
            break;
          case "radio":
            if (validationFunction === required) errorMessage = isRadioChecked(inputComponent, context);
            else errorMessage = await validationFunction(inputComponent.state.value, context, inputComponent, fromFake);
            break;
          case "FileDrop":
            errorMessage = hasFileDropFiles(inputComponent, context);
            break;
          case "FileUploader":
            errorMessage = hasFileUploaderFiles(inputComponent, context);
            break;
          case "FileSelector": //add required validator if content is mandatory
            errorMessage = validationFunction(inputComponent);
            break;
          default:
            errorMessage = await validationFunction(inputComponent.state.value, context, inputComponent, fromFake);
        }

        if (typeof errorMessage !== "undefined") {
          arrayOfErrors.push(errorMessage);
        }
        validationSumaryItem.errors = arrayOfErrors;
      }
    }
    if (arrayOfErrors && arrayOfErrors.length) {
      if (inputComponent._isMounted) {
        inputComponent.setState({
          errors: arrayOfErrors,
          isValid: false,
          loading: false,
        });
      }
      validationSumaryItem.valid = false;
      return validationSumaryItem;
    } else {
      if (inputComponent._isMounted) {
        inputComponent.setState({ errors: null, isValid: true, loading: false });
      }
      return validationSumaryItem;
    }
    // If not validation is valid
  } else {
    if (inputComponent._isMounted) {
      inputComponent.setState({ isValid: true });
    }
    return validationSumaryItem;
  }
}
