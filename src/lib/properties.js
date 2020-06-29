const getPropValue = async (prop, data) => {
  if (prop !== undefined) {
    const propVal = typeof prop === "function" ? await prop(data) : prop;
    return propVal;
  }

  return prop;
};

const propMapper = {
  title: "title",
  error: "error",
  validate: "validate",
  label: "label",
  helptext: "helptext",
  helplink: "helplink",
  placeholder: "placeholder",
};

const inputPropMapper = {
  disabled: "disabled",
  readonly: "readOnly",
  prefix: "startAdornment",
  suffix: "endAdornment",
};

const inputAttributeMapper = {
  min: "min",
  max: "max",
  step: "step",
  title: "title",
  minlength: "minLength",
  maxlength: "maxLength",
};

const getInputProps = async (props) => {
  const { data, ...rest } = props;
  const defaultProps = {};
  const defaultInputProps = {};
  const defaultInputAttributes = {};

  for (const property in rest) {
    const propValue = await getPropValue(props[property], data);
    if (propValue !== undefined) {
      if (Object.keys(propMapper).indexOf(property) > -1) {
        defaultProps[propMapper[property]] = propValue;
      }
      if (Object.keys(inputPropMapper).indexOf(property) > -1) {
        defaultInputProps[inputPropMapper[property]] = propValue;
      }
      if (Object.keys(inputAttributeMapper).indexOf(property) > -1) {
        defaultInputAttributes[inputAttributeMapper[property]] = propValue;
      }
    }
  }

  if (Object.keys(defaultInputProps).length > 0) {
    defaultProps.InputProps = defaultInputProps;
  } else {
    defaultProps.InputProps = {};
  }

  if (Object.keys(defaultInputAttributes).length > 0) {
    defaultProps.InputProps.inputProps = defaultInputAttributes;
  }
  return defaultProps;
};

export default getInputProps;
