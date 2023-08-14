import PropTypes from 'prop-types';
// form
import { useFormContext, Controller } from 'react-hook-form';
// @mui
import { TextField } from '@mui/material';

// ----------------------------------------------------------------------

RHFTextField.propTypes = {
  name: PropTypes.string,
  value: PropTypes.string,
};

export default function RHFTextField({ name, 
  value, 
  ...other }) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      value={value}
      
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <TextField 
      defaultValue={value}  
        value={value}
        onChange={onChange}
        fullWidth 
        error={!!error} 
        helperText={error?.message} {...other} />
      )}
    />
  );
}
