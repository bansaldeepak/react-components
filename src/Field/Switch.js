import React from 'react';

import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import FormLabel from '@material-ui/core/FormLabel';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

const styles = theme => ({});

const EnhancedSwitch = (props) => {
  const { classes, label, name, key, disabled, value, handleChange, formData, placeholder } = props;

  return (
    <>
      {
        (label !== undefined) && (
          <FormLabel component='legend'>{label}</FormLabel>
        )
      }
      <FormGroup>
        <FormControlLabel
          control={
            <Switch
              key={key}
              name={name}
              onChange={(event) => {
                const { name, checked } = event.target;
                handleChange(name, checked);
              }}
              disabled={disabled}
              checked={value}
            />
          }
          label={(typeof placeholder === 'function') ? placeholder(formData) : placeholder}
        />
      </FormGroup>
    </>
  );
}

EnhancedSwitch.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles, { withTheme: true })(EnhancedSwitch);
