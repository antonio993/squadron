import { useFormContext, Controller } from 'react-hook-form';
import { TextField } from '@mui/material';

const FormInput = ({ name, ...otherProps }) => {
  // 👇 Utilizing useFormContext to have access to the form Context
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <TextField
          {...field}
          {...otherProps}
          error={!!errors[name]}
          helperText={
            errors[name] ? (errors[name]?.message) : ''
          }
        />
      )}
    />
  );
};

export default FormInput;