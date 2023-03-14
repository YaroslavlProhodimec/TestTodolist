import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {Button, IconButton, TextField} from "@mui/material";


import { Input } from '@mui/material';
import {ControlPoint} from "@mui/icons-material";
type SyperProps = {
    addTask: (title:string) => void

}
export const SyperInput = (props:SyperProps) => {
    let [title, setTitle] = useState("")
    let [error, setError] = useState<string | null>(null)

    const addTask = () => {
        if (title.trim() !== "") {
            props.addTask(title.trim());
            setTitle("");
        } else {
            setError("Title is required");
        }
    }
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null);
        if (e.charCode === 13) {
            addTask();
        }
    }
    return (
        <div >
            <TextField value={title}
                       variant={"outlined"}
                   label={'Type value'}
                   onChange={onChangeHandler}
                   onKeyPress={onKeyPressHandler}
                   error={!!error}
                       helperText={error}
            />
            <IconButton size={'small'} color={'secondary'} onClick={addTask}>
            <ControlPoint/>
            </IconButton>
            {/*{error && <div className="error-message">{error}</div>}*/}

        </div>
    );
};
