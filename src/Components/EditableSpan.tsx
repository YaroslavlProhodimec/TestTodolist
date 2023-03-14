import React, {ChangeEvent, MouseEventHandler, useState} from 'react';
import {TextField} from "@mui/material";
type EditProps ={
    title:string
    callback:(newTitle:string)=> void
}
export const EditableSpan = (props:EditProps) => {
    const [edit, setEdit] = useState(false);
    let [newTitle, setNewTitle] = useState(props.title)

    const doubleClick = () =>{
        setEdit(!edit)
        props.callback(newTitle)
    }
    const onChangeTitle = (e:ChangeEvent<HTMLInputElement>) =>{
        setNewTitle(e.currentTarget.value)
    }
    return ( <>

            { edit ? <TextField size={'small'} onChange={onChangeTitle} value={newTitle} onBlur={doubleClick} onDoubleClick={doubleClick}  autoFocus /> :
                <span onDoubleClick={doubleClick} >{props.title}</span>   }
        </>
    );
};

