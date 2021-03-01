import React, { useEffect } from "react";

import { Controlled as CodeMirror } from "react-codemirror2";
import "codemirror/mode/javascript/javascript";
import "codemirror/lib/codemirror.css";
import "codemirror/addon/edit/closebrackets";
import "codemirror/theme/material-darker.css";
import { InputBaseComponentProps, makeStyles } from "@material-ui/core";
import clsx from "clsx";

const useStyle = makeStyles(theme => ({
    root: {
        "& .CodeMirror": {
            backgroundColor: "inherit"
        }
    }
}), { name: "JsonInput" });

const JsonInput = (props: InputBaseComponentProps) => {

    const { className,  onAnimationStart, onBlur, onFocus, onChange, value, name } = props;
    const classes = useStyle(props);

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
            className={clsx(classes.root, className)}
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
                    theme: 'material-darker',
                    autoCloseBrackets: true,
                }}
            />
        </div>
    );
};

export default JsonInput;
