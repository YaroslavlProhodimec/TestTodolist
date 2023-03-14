import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType} from './App';
import {SyperInput} from "./Components/SyperInput";
import {EditableSpan} from "./Components/EditableSpan";
import {Button, Checkbox} from "@mui/material";
import {Delete} from "@mui/icons-material";

type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string,todolistId:string) => void
    changeFilter: (value: FilterValuesType,id:string) => void
    addTask: (title: string,todolistId:string) => void
    changeTaskStatus: (taskId: string, isDone: boolean,todolistId:string) => void
    filter: string
    id:string
    removeTodolist:(id:string)=>void
    addNewTitle:(id:string,todolistid:string,newTitle:string)=>void
    addNewTitleHigh:(id:string,newTitle:string)=>void
}

export function Todolist(props: PropsType) {







    const onAllClickHandler = () => props.changeFilter("all",props.id);
    const onActiveClickHandler = () => props.changeFilter("active",props.id);
    const onCompletedClickHandler = () => props.changeFilter("completed",props.id);

const addTaskHandler =(title:string)=>{
    props.addTask(title,props.id)
}
    const addNewTitle =(tID:string, newTitle:string)=>{
        props.addNewTitle(props.id,tID,newTitle)
    }
    const  addNewTitleHigh =( newTitle:string)=>{
        props.addNewTitleHigh(props.id,newTitle)
    }
    const flex = {
        display:'flex',
        alignItems:'center',
gap:'7px'
    }
    return <div>
        <div style={flex} ><EditableSpan  callback={addNewTitleHigh} title={props.title}/>
            <span>
            <Delete onClick={() => props.removeTodolist(props.id) }>x</Delete></span></div>
        <div>
            {/*   <input value={title}*/}
            {/*       onChange={onChangeHandler}*/}
            {/*       onKeyPress={onKeyPressHandler}*/}
            {/*       className={er,ror ? "error" : ""}*/}
            {/*/>*/}
            {/*<button onClick={addTask}>+</button>*/}
            {/*{error && <div className="error-message">{error}</div>}*/}
            <SyperInput   addTask={addTaskHandler}/>

        </div>
        <ul>
            {
                props.tasks.map(t => {

                    const onClickHandler = () => props.removeTask(t.id,props.id)
                    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        props.changeTaskStatus(t.id, e.currentTarget.checked,props.id);
                    }

                    return <li style={flex} key={t.id} className={t.isDone ? "is-done" : ""}>
                        <Checkbox
                               onChange={onChangeHandler}
                               checked={t.isDone}/>
                        <EditableSpan title={t.title} callback={(newTitle)=>addNewTitle(t.id,newTitle)}/>
                        <Delete onClick={onClickHandler}>x</Delete>
                    </li>

                })
            }
        </ul>
        <div>
            <Button size="medium" color={'secondary'} variant={props.filter === 'all' ? "contained" : "text"}
                    onClick={onAllClickHandler}>All</Button>
            <Button size="medium" color={'primary'}   variant={props.filter === 'active' ? "contained" : "text"}
                    onClick={onActiveClickHandler}>Active</Button>
            <Button size="medium" color={'success'} variant={props.filter === 'completed' ? "contained" : "text"}
                    onClick={onCompletedClickHandler}>Completed</Button>
        </div>
    </div>
}
