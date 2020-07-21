import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import CircularProgress from "@material-ui/core/CircularProgress";

const styles = (theme) => ({
  textField: {
    minWidth: "100px",
  },
  optionItem: {
    height: "auto",
    overflowWrap: "break-word",
    wordWrap: "break-word",
    whiteSpace: "normal !important",
  },
});

const EnhancedSelect = (props) => {
  const {
    key,
    name,
    label,
    placeholder,
    required,
    disabled,
    readonly,
    defaultValue,
    classes,
    optionKey,
    optionValue,
    handleChange,
    title,
    suffix,
    prefix,
    data,
    multiple,
    defaultOptions,
  } = props;

  const [options, setOptions] = React.useState(defaultOptions);
  const loading = options.length === 0;

  React.useEffect(() => {
    let active = true;

    if (!loading) {
      return undefined;
    }

    (async () => {
      let resultOptions = [];
      if (typeof props.options === "object") {
        resultOptions = props.options;
      } else if (typeof props.options === "function") {
        resultOptions = await props.options(defaultValue);
      }

      if (active) {
        setOptions(resultOptions);
      }
    })();

    return () => {
      active = false;
    };
  }, []);

  return (
    <TextField
      select
      multiple={multiple}
      key={key}
      name={name}
      label={label}
      placeholder={placeholder}
      className={classes.textField}
      defaultValue={defaultValue}
      onChange={(event) => {
        const { value } = event.target;
        handleChange(value);
      }}
      margin="normal"
      required={required}
      InputProps={{
        disabled: typeof disabled === "function" ? disabled(data) : disabled,
        readOnly: typeof readonly === "function" ? readonly(data) : readonly,
        startAdornment: (
          <React.Fragment>
            {loading ? <CircularProgress color="inherit" size={20} /> : null}
            {prefix ? (
              <InputAdornment position="start">{prefix}</InputAdornment>
            ) : null}
          </React.Fragment>
        ),
        endAdornment: suffix ? (
          <InputAdornment position="end">{suffix}</InputAdornment>
        ) : null,
        inputProps: {
          title: typeof title === "function" ? title(data) : title,
        },
      }}
      InputLabelProps={{
        shrink:
          defaultValue !== undefined &&
          defaultValue !== null &&
          defaultValue !== "" &&
          props.prefix,
      }}
      SelectProps={{
        displayEmpty: false,
        multiple: multiple,
        renderValue: (selected) => {
          if (multiple) {
            if (selected.length === 0 && placeholder) {
              return <em>{placeholder}</em>;
            }

            return selected.join(", ");
          }

          return selected;
        },
      }}
    >
      {placeholder && (
        <MenuItem disabled value="">
          <em>{placeholder}</em>
        </MenuItem>
      )}
      {options.map((option) => (
        <MenuItem
          key={`select-option-${name}-${
            option[optionKey] ||
            option[name] ||
            option.id ||
            option.key ||
            option.value ||
            option
          }`}
          value={
            option[optionKey] ||
            option[name] ||
            option.id ||
            option.key ||
            option.value ||
            option
          }
          className={classes.optionItem}
        >
          {option[optionValue] ||
            option.name ||
            option.label ||
            option.value ||
            option}
        </MenuItem>
      ))}
    </TextField>
  );
};

EnhancedSelect.propTypes = {
  classes: PropTypes.object.isRequired,
  /**
   * Name of the field to get the value.
   */
  name: PropTypes.string.isRequired,
  /**
   * Default value for multiple is false it can be true if type is select
   */
  multiple: PropTypes.bool,
  /**
   * Default Value can be array of string or object
   */
  defaultValue: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string),
  ]),
  /**
   * Options can be function & array of string/object
   */
  options: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.arrayOf(PropTypes.string),
    PropTypes.arrayOf(PropTypes.shape({})),
  ]),
  /**
   * Default Options can be array of string or object
   */
  defaultOptions: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.string),
    PropTypes.arrayOf(PropTypes.shape({})),
  ]),
  /**
   * Callback fired when value changed.
   *
   * @param value of the field.
   * You can pull out the new error & errorMessage by accessing `error.error` (bool) and `error.errorMessage` (string).
   */
  handleChange: PropTypes.func,
};

EnhancedSelect.defaultProps = {
  multiple: false,
  defaultOptions: [],
  options: [],
  handleChange: () => {},
  defaultValue: "",
};

export default withStyles(styles, { withTheme: true })(EnhancedSelect);
