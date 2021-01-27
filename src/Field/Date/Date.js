import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import MomentUtils from "@date-io/moment";
import { MuiPickersUtilsProvider, DatePicker } from "@material-ui/pickers";
import InputAdornment from "@material-ui/core/InputAdornment";
import moment from "moment";

// import { getInputProps } from '../lib';
const useStyles = makeStyles((theme) => ({
  textField: {
    minWidth: "100px",
  },
}));

const EnhancedDate = (props) => {
  const classes = useStyles();
  const {
    data,
    defaultValue,
    name,
    label,
    placeholder,
    openTo,
    format,
    required,
    disabled,
    disablePast,
    disableDate,
    disableFuture,
    helptext,
    min,
    max,
    readonly,
    prefix,
    suffix,
    title,
    maxlength,
    minlength,
    step,
    handleChange,
  } = props;

  // const { format } = props;
  // if (value !== undefined) {
  //   value = (format) ? value.format(format) : value.format('YYYY-MM-DD');
  // }
  // More properties handled in useEffect
  // format, disablePast, disableFuture, disableDate, openTo, min, max, readonly, maxlength, minlength, step

  const [localValue, setLocalValue] = React.useState();

  React.useEffect(() => {
    if (localValue) {
      handleChange(localValue.format(format || "DD/MM/YYYY"));
    }
  }, [localValue]);

  return (
    <MuiPickersUtilsProvider utils={MomentUtils}>
      <DatePicker
        key={name}
        name={name}
        label={label}
        placeholder={placeholder}
        className={classes.textField}
        defaultValue={moment(defaultValue, format || "DD/MM/YYYY")}
        value={moment(defaultValue, format || "DD/MM/YYYY")}
        openTo={openTo}
        views={["year", "month", "date"]}
        onChange={setLocalValue}
        margin="normal"
        format={format}
        required={required}
        disabled={disabled}
        disablePast={disablePast}
        shouldDisableDate={
          typeof disableDate === "function"
            ? (day) => {
                return disableDate(day, data);
              }
            : null
        }
        disableFuture={disableFuture}
        helperText={typeof helptext === "function" ? helptext(data) : helptext}
        minDate={typeof min === "function" ? min(data) : min}
        maxDate={typeof max === "function" ? max(data) : max}
        InputProps={{
          disabled: typeof disabled === "function" ? disabled(data) : disabled,
          readOnly: typeof readonly === "function" ? readonly(data) : readonly,
          startAdornment: prefix ? (
            <InputAdornment position="start">{prefix}</InputAdornment>
          ) : null,
          endAdornment: suffix ? (
            <InputAdornment position="end">{suffix}</InputAdornment>
          ) : null,
          inputProps: {
            title: typeof title === "function" ? title(data) : title,
          },
        }}
      />
    </MuiPickersUtilsProvider>
  );
};

EnhancedDate.propTypes = {
  /**
   * Default value for the field
   */
  defaultValue: PropTypes.string,
  /**
   * Callback fired when value changed.
   *
   * @param value of the field.
   * You can pull out the new error & errorMessage by accessing `error.error` (bool) and `error.errorMessage` (string).
   */
  handleChange: PropTypes.func,
  /**
   * OpenTo for default calendar view
   */
  openTo: PropTypes.string,
  /**
   * format of the date
   */
  format: PropTypes.string,
  /**
   * required property for date
   */
  required: PropTypes.bool,
  /**
   * disabled property for date
   */
  disabled: PropTypes.bool,
  /**
   * disablePast property for date
   */
  disablePast: PropTypes.bool,
  /**
   * disableFuture property for date
   */
  disableFuture: PropTypes.bool,
};

EnhancedDate.defaultProps = {
  defaultValue: null,
  handleChange: (value) => {},
  openTo: "date",
  format: "DD/MM/YYYY",
  required: false,
  disabled: false,
  disablePast: false,
  disableFuture: false,
};

export default EnhancedDate;
