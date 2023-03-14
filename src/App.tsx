import React, {useState} from 'react';
import './App.css';
import {Todolist} from './Todolist';
import {v1} from 'uuid';
import buttonStories from "./stories/Button.stories";
import {SyperInput} from "./Components/SyperInput";
import styled from 'styled-components'
import {HexColorPicker } from 'react-colorful'

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import {Container, Grid, Paper} from "@mui/material";
export type FilterValuesType = "all" | "active" | "completed";
type PropsArrayTasks ={
    id:string
    title:string
    isDone:boolean
}
type PropsTasks ={
    [id:string]:PropsArrayTasks[]
}
function App() {
    const[color,setColor] = useState('#54a8ff')
let todolist1 = v1()
    let todolist2 = v1()
    const newTodoID = v1()
    let [tasksObj, setTasksObj] = useState<PropsTasks>({

    [todolist1]: [{id: v1(), title: "HTML&CSS", isDone: true},
                 {id: v1(), title: "JS", isDone: true},
                 {id: v1(), title: "ReactJS", isDone: false},
                 {id: v1(), title: "Rest API", isDone: false},
                 {id: v1(), title: "GraphQL", isDone: false},],
        [todolist2]: [{id: v1(), title: "High", isDone: true},
            {id: v1(), title: "All Right", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false},
            {id: v1(), title: "Rest API", isDone: false},
            {id: v1(), title: "GraphQL", isDone: false},],

    });

    let [todolist, setTodolist] = useState([
        {id:todolist1,title:'TOP',filter:'all'},
        {id:todolist2,title:'Live',filter:'all'}
    ])
const removeTodolist = (id:string) =>{
    setTodolist(todolist.filter(el=>el.id !== id))
    delete tasksObj[id]
    setTasksObj({...tasksObj})
}
    function removeTask(id: string,todolistId:string) {
        let todolist = tasksObj[todolistId]
        let filteredTasks = todolist.filter(t => t.id != id)
        tasksObj[todolistId] = filteredTasks
        setTasksObj({...tasksObj});
    }

    function addTask(title: string,todolistId:string) {
        let todolist = tasksObj[todolistId]
        let task = {id: v1(), title: title, isDone: false};
        let newTasks = [task, ...todolist];
        tasksObj[todolistId]=newTasks
        setTasksObj({...tasksObj});
    }

    function changeStatus(taskId: string, isDone: boolean,todolistId:string) {
        let todolist = tasksObj[todolistId]
        let task = todolist.find(t => t.id === taskId);
        if (task) {
            task.isDone = isDone;
        }

        setTasksObj({...tasksObj});
    }


    function changeFilter(value: FilterValuesType,id:string) {
        setTodolist(todolist.map(el => el.id == id ? {...el,filter:value}:el));
    }

    function addGlobalTask(newTitle:string){

       let newToDolist = {id:newTodoID,title:newTitle,filter:'completed'}
        setTodolist([...todolist, newToDolist])
        setTasksObj({[newTodoID]:[],...tasksObj})
    }
function addNewTitle  (todolistid:string,id:string,newTitle:string) {
        console.log(newTitle)
      let  toDo = {...tasksObj, [todolistid] : tasksObj[todolistid].map(t => t.id === id ? {...t, title: newTitle} : t)}
        setTasksObj(toDo)
    }
    function addNewTitleHigh  (id:string,newTitle:string) {
        setTodolist(todolist.map(t => t.id === id ? {...t, title: newTitle} : t))

    }
    return (

        <div className="App">

            <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
            <Toolbar variant="dense">
            <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
            <MenuIcon />
            </IconButton>
            <Typography variant="h6" color="inherit" component="div">
            My-Project
            </Typography>
            </Toolbar>
            </AppBar>
            </Box>
            <StyledShowDiv color={color}>
<Container fixed>

    <Grid container style={{paddingTop:'10px' }}>

    <SyperInput addTask={addGlobalTask} />
    </Grid>

    <Grid container style={{ padding:'10px'}}  spacing={3}>


    {todolist.map(el=> {
        let filtered = tasksObj[el.id]
        if(el.filter === 'completed')
            filtered = filtered.filter(el => el.isDone)

        if(el.filter === 'active')
            filtered = filtered.filter(el => !el.isDone)

        return <Grid item style={{ marginTop:'10px'}}>
            <Paper style={{ padding:'10px',borderRadius:'3.1%'}}>
            <Todolist

                key={el.id} id={el.id}
                title={el.title}
                tasks={filtered}
                removeTask={removeTask}
                changeFilter={changeFilter}
                addTask={addTask}
                changeTaskStatus={changeStatus}
                removeTodolist={removeTodolist}
                filter={el.filter}
                addNewTitle={addNewTitle}
                addNewTitleHigh={addNewTitleHigh}
            /></Paper>

</Grid>
        })}

    </Grid>

</Container>
            <HexColorPicker color={color} onChange={setColor}/>

            </StyledShowDiv>
        </div>

    );
}

let StyledShowDiv = styled.div<{color:string}>`
background-color: ${props => props.color};
  
  width: auto;
  height: 100vh;
  //border-radius:3.1%;
  padding: 30px;
  display: flex;
  gap: 50px;
;
`
export default App;
