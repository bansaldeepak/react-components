import validator from "validator";

const validateField = (fieldProps, value, formData) => {
  const {
    required,
    min,
    max,
    minlength,
    maxlength,
    pattern,
    type,
    error,
    validate,
    fields,
    multiple,
  } = fieldProps;
  let errorFlag = false;
  let errorMessage = null;

  const optionType = ["select", "radio", "checkbox"];
  if (multiple && optionType.indexOf(type) === -1) {
    const { multiple, ...restFieldProps } = fieldProps;
    if (Array.isArray(value) && value.length > 0) {
      errorFlag = !value.every((valueObj) => {
        const multipleFieldValidation = validateField(
          restFieldProps,
          valueObj,
          formData
        );
        return !multipleFieldValidation.error;
      });
      errorMessage = errorFlag
        ? type === "section"
          ? `Please fill section details!`
          : `Please enter a value!`
        : null;
    } else if (required) {
      errorFlag = true;
      errorMessage =
        type === "section"
          ? `Please fill section details!`
          : `Please enter a value!`;
    }
  } else if (type === "section" && fields.length > 0) {
    errorFlag = !fields.every((sectionField) => {
      const sectionFieldValue = value && value[sectionField.name];
      const sectionFieldValidation = validateField(
        sectionField,
        sectionFieldValue,
        value
      );
      return !sectionFieldValidation.error;
    });
    errorMessage = errorFlag ? `Please fill section details!` : null;
  } else if (
    required &&
    (value === undefined ||
      value === null ||
      value === "" ||
      (Array.isArray(value) && value.length === 0))
  ) {
    errorFlag = true;
    errorMessage =
      optionType.indexOf(type) > -1
        ? `Please select an option!`
        : `Please enter a value!`;
  } else {
    switch (type) {
      case "email":
        errorMessage = `Value must be a valid email`;
        errorFlag = !validator.isEmail(value);
        break;
      case "url":
        errorMessage = `Value must be a valid url`;
        errorFlag = !validator.isURL(value);
        break;
      case "decimal":
        errorMessage = `Value must be a valid decimal`;
        errorFlag = !validator.isDecimal(value);
        break;
      case "boolean":
      case "switch":
        errorMessage = `Value must be a boolean`;
        errorFlag = !validator.isBoolean(value);
        break;
      case "postal":
        errorMessage = `Value must be a postal code`;
        errorFlag = !validator.isPostalCode(value, "IN");
        break;
      case "date":
        errorMessage = `Value must be a valid date`;
        if (fieldProps.format) {
          errorFlag = !validator.isDate(value, fieldProps.format);
        } else {
          errorFlag = !validator.isDate(value);
        }
        break;
      case "float":
        if (min !== undefined && max !== undefined) {
          errorMessage = `Value must be between ${min} and ${max}`;
          errorFlag = !validator.isFloat(value, { min, max });
        } else if (min !== undefined && max === undefined) {
          errorMessage = `Value must be greater than ${min}`;
          errorFlag = !validator.isFloat(value, { min });
        } else if (min === undefined && max !== undefined) {
          errorMessage = `Value must be less than ${max}`;
          errorFlag = !validator.isFloat(value, { max });
        } else {
          errorMessage = `Value must be a float`;
          errorFlag = !validator.isFloat(value);
        }
        break;
      case "integer":
        if (min !== undefined && max !== undefined) {
          errorMessage = `Value must be between ${min} and ${max}`;
          errorFlag = !validator.isInt(value, { min, max });
        } else if (min !== undefined && max === undefined) {
          errorMessage = `Value must be greater than ${min}`;
          errorFlag = !validator.isInt(value, { min });
        } else if (min === undefined && max !== undefined) {
          errorMessage = `Value must be less than ${max}`;
          errorFlag = !validator.isInt(value, { max });
        } else {
          errorMessage = `Value must be a integer`;
          errorFlag = !validator.isInt(value);
        }
        break;
      default:
        if (
          !errorFlag &&
          (minlength !== undefined || maxlength !== undefined) &&
          !validator.isLength(value, { min: minlength, max: maxlength })
        ) {
          errorFlag = true;
          errorMessage = `Characters length must be between ${minlength} and ${maxlength}`;

          if (minlength !== undefined && maxlength === undefined) {
            errorMessage = `Minimum length of charcters is ${minlength}`;
          }

          if (minlength === undefined && maxlength !== undefined) {
            errorMessage = `Maximum length of charcters is ${maxlength}`;
          }
        }

        if (!errorFlag && (min !== undefined || max !== undefined)) {
          errorFlag = true;
          if (min !== undefined && max === undefined) {
            errorMessage = `Value must be greater than ${min}`;
            errorFlag = !validator.isInt(value.toString(), { min });
          } else if (min === undefined && max !== undefined) {
            errorMessage = `Value must be less than ${max}`;
            errorFlag = !validator.isInt(value.toString(), { max });
          } else {
            errorMessage = `Value must be between ${min} and ${max}`;
            errorFlag = !validator.isInt(value.toString(), { min, max });
          }
        }

        const re = pattern !== undefined ? pattern : "";
        if (!errorFlag && (re.length > 0 || typeof re === "object")) {
          errorFlag = !re.test(value);
          errorMessage = `Value does not match given pattern`;
        }

        if (!errorFlag && validate && typeof validate === "function") {
          errorFlag = !validate(value, formData);
          errorMessage = `Please provide valid value.`;
        }
        break;
    }
  }

  return {
    error: errorFlag,
    errorMessage: errorMessage,
  };
};

export default validateField;
