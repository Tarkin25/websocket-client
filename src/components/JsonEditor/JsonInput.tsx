import React, { useEffect } from "react";

import { Controlled as CodeMirror } from "react-codemirror2";
import "codemirror/mode/javascript/javascript";
import "codemirror/lib/codemirror.css";
import "codemirror/addon/edit/closebrackets";
import { InputBaseComponentProps } from "@material-ui/core";

const JsonInput = (props: InputBaseComponentProps) => {

    const { className,  onAnimationStart, onBlur, onFocus, onChange, value, name } = props;

    const handleChange = (value: string) => {
        const event = {
            target: {
                value,
                name
            }
        } as React.ChangeEvent<HTMLInputElement>;

        onChange && onChange(event);
    }

    const handleBeforeChange = (_editor: any, _data: any, value: string) => {
        handleChange(value);
    };

    const handleFocus = (e: React.FocusEvent) => {
        const event = {
            ...e,
            target: {
                ...e.target,
                name
            }
        } as React.FocusEvent<HTMLInputElement>;

        onFocus && onFocus(event);
    }

    const handleBlur = (e: React.FocusEvent) => {
        const event = {
            ...e,
            target: {
                ...e.target,
                name
            }
        } as React.FocusEvent<HTMLInputElement>;

        onBlur && onBlur(event);
    }

    const handleAnimationStart = (e: React.AnimationEvent) => {
        onAnimationStart && onAnimationStart(e as React.AnimationEvent<HTMLInputElement>);
    }

    useEffect(() => {
        handleChange(value);
        // eslint-disable-next-line
    }, [value]);

    return (
        <div
            className={className}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onAnimationStart={handleAnimationStart}
        >
            <CodeMirror
                value={value}
                onBeforeChange={handleBeforeChange}
                options={{
                    mode: {
                        name: "javascript",
                        json: true,
                    },
                    autoCloseBrackets: true,
                }}
            />
        </div>
    );
};

export default JsonInput;
