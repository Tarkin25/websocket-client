import React, { forwardRef } from 'react'
import { InputLabelProps, TextField as MuiTextField, TextFieldProps as MuiTextFieldProps} from '@material-ui/core';
import { useField } from 'formik';

export type TextFieldProps = Omit<MuiTextFieldProps, "value" | "onChange" | "onBlur" | "error"> & {
    name: string;
}

const TextField = forwardRef<HTMLDivElement, TextFieldProps>((props, ref) => {

    const [field, meta] = useField(props.name);
    const error = Boolean(meta.touched && meta.error);
    const helperText = error ? meta.error : props.helperText;

    const InputLabelProps = {
        ...props.InputLabelProps,
        shrink: field.value ? true : undefined
    } as InputLabelProps;

    return (
        <MuiTextField {...field} {...props} error={error} helperText={helperText} ref={ref} InputLabelProps={InputLabelProps} />
    )
})

TextField.defaultProps = {
    fullWidth: true
}

export default TextField
