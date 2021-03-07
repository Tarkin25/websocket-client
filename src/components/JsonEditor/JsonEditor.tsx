import { InputProps } from '@material-ui/core';
import React from 'react'
import TextField, { TextFieldProps } from '../TextField';
import JsonInput from './JsonInput';

export type JsonEditorProps = Omit<TextFieldProps, "multiline">;

const JsonEditor = (props: JsonEditorProps) => {

    const InputProps = {
        ...props.InputProps,
        inputComponent: JsonInput,
    } as Partial<InputProps>;

    return (
        <TextField {...props} InputProps={InputProps} multiline />
    )
}

export default JsonEditor
