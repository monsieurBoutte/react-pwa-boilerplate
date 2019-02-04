import React from 'react';
import TextField from '@material-ui/core/TextField';

export const InputField = ({
  input: { name, value, onChange, ...restInput },
  extraInputProps = {},
  meta,
  ...rest
}) => (
  <TextField
    {...rest}
    helperText={meta.touched ? meta.error : undefined}
    error={meta.error && meta.touched}
    onChange={onChange}
    value={value}
    name={name}
    InputProps={{
      ...restInput,
      ...extraInputProps
    }}
  />
);
