import React,{useState} from 'react'
import styles from "./data.js"
import {Box,makeStyles} from "@material-ui/core"
import { useDispatch, useSelector } from 'react-redux'
import {themeSelected} from "./features/themeSlice.js"
const useStyles = makeStyles((theme) => ({
    
    root:{
        position:'absolute',
        width:'500px',
        height:'500px',
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
       
        border: '2px solid #000',
        top:'20%',
        left:"35%",
        
        overflow:' scroll',
        display:'flex',
        flexWrap:'wrap',
        flexDirection:'row'

    },
    container:{
        width:'230px',
        height:'230px',
        margin:5,

    },
    img:{
        objectFit:'cover',
        width:'100%',
        height:'100%',
    },
    btn:{
        border:'none',
        background:'none',
        width:'100%',
        height:'100%',
    }

 
}))
function GiftMenu() {
    const [theme,setTheme]=useState("")
    const classes=useStyles();
    

    
    
    const dispatch = useDispatch()
    const onSaveThemeClicked=(item)=>{
        setTheme(item)
        dispatch(themeSelected({id:theme.id, background:theme.background,color:theme.color,font:theme.font}))
    }
    return (
        <Box className={classes.root}>
            {styles.map((item,index)=>{
                return(
                    <Box key={index} className={classes.container}>
                        <button type="button" onClick={()=>onSaveThemeClicked(item)} className={classes.btn}><img src={item.background} alt="" className={classes.img}/></button>

                    </Box>
                )
            })}
        </Box>
    )
}

export default GiftMenu
