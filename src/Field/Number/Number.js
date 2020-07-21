import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";

const useStyles = makeStyles((theme) => ({
  textField: {
    minWidth: "100px",
  },
}));

const EnhancedNumber = (props) => {
  const classes = useStyles();
  const { type, defaultValue, step, handleChange, fieldValues } = props;

  const [localValue, setLocalValue] = React.useState(defaultValue);

  const handleOnChange = (value) => {
    let fieldValue = value;
    if (fieldValue !== "" && !Number.isNaN(fieldValue)) {
      if (step && Number.isInteger(step)) {
        fieldValue = parseInt(fieldValue);
      } else if (step && !Number.isInteger(step)) {
        fieldValue = parseFloat(fieldValue);
      } else {
        if (Number.isInteger(fieldValue)) {
          fieldValue = parseInt(fieldValue);
        } else {
          fieldValue = parseFloat(fieldValue);
        }
      }

      handleChange(fieldValue);
    } else {
      handleChange(fieldValue);
    }
  };

  return (
    <TextField
      key={props.name}
      id={props.name}
      name={props.name}
      type={type}
      label={props.label}
      placeholder={props.placeholder}
      className={classes.textField}
      defaultValue={defaultValue}
      onChange={(event) => {
        const { value } = event.target;
        setLocalValue(value);
      }}
      onBlur={() => handleOnChange(localValue)}
      margin="normal"
      required={props.required ? true : false}
      disabled={props.disabled ? true : false}
      // helperText={(typeof props.helptext === 'function') ? props.helptext(data) : props.helptext}
      InputProps={{
        disabled:
          typeof props.disabled === "function"
            ? props.disabled(fieldValues)
            : props.disabled,
        readOnly:
          typeof props.readonly === "function"
            ? props.readonly(fieldValues)
            : props.readonly,
        startAdornment: props.prefix ? (
          <InputAdornment position="start">{props.prefix}</InputAdornment>
        ) : null,
        endAdornment: props.suffix ? (
          <InputAdornment position="end">{props.suffix}</InputAdornment>
        ) : null,
        inputProps: {
          title:
            typeof props.title === "function"
              ? props.title(fieldValues)
              : props.title,
          min:
            typeof props.min === "function"
              ? props.min(fieldValues)
              : props.min,
          max:
            typeof props.max === "function"
              ? props.max(fieldValues)
              : props.max,
          maxLength:
            typeof props.maxlength === "function"
              ? props.maxlength(fieldValues)
              : props.maxlength,
          minLength:
            typeof props.minlength === "function"
              ? props.minlength(fieldValues)
              : props.minlength,
          step:
            typeof props.step === "function"
              ? props.step(fieldValues)
              : props.step,
          pattern:
            typeof props.pattern === "function"
              ? props.pattern(fieldValues)
              : props.pattern,
        },
      }}
      InputLabelProps={{
        shrink:
          localValue !== undefined &&
          localValue !== null &&
          localValue !== "" &&
          props.prefix,
      }}
    />
  );
};

EnhancedNumber.propTypes = {
  defaultValue: PropTypes.number,
  type: PropTypes.oneOf([
    "currency",
    "integer",
    "decimal",
    "number",
    "mobile",
    "float",
    "tel",
  ]),
};

EnhancedNumber.defaultProps = {
  defaultValue: null,
  type: "number",
};

export default EnhancedNumber;
