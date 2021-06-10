import React, { useEffect, useState } from 'react'
import "./Sidebar.css";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import AddIcon from '@material-ui/icons/Add';
import SidebarChannel from './SidebarChannel';
import SignalCellularAltIcon from '@material-ui/icons/SignalCellularAlt';
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";
import CallIcon from "@material-ui/icons/Call";
import { Avatar } from "@material-ui/core";
import MicIcon from '@material-ui/icons/Mic';
import HeadsetIcon from '@material-ui/icons/Headset';
import SettingsIcon from '@material-ui/icons/Settings';
import { useSelector } from 'react-redux';
import { selectUser } from './features/userSlice';
import db, { auth } from "./firebase";
import {selectBackground, selectFont, selectColor} from "./features/themeSlice.js"
import clsx from 'clsx'
import {makeStyles} from "@material-ui/core"


 const useStylesTheme = makeStyles((theme) => ({
    sidebarProfile:{
       cursor:'pointer',
       display:'flex',
       alignItems:'center',
       fontFamily: 'Baloo Tammudu 2 cursive', 
       height:'10%',
       border:'1px solid #B7B6C1',
       fontColor:'#fffff',
   },
   image1:{
       width:'100%',
       height:'100%',
       objectFit:'cover',
   },
   icons:{
       padding:10,    
   },
   avatar:{
       position:'absolute',
       
   },
   info1:{
    flex: 1,
    padding:' 10px',
    left:'7%',
    fontColor:'#fffff',
   },
   info2:{
        left:'17%',
        fontColor:'#fffff',
    } ,
    text:{
        fontFamily:'Shadows Into Light',
        color:'#ffffff'
    }     
}))

function Sidebar() {
    const user = useSelector(selectUser);
    const [slide, setSlide] = useState(false)
    const [slider2, setSlider2] = useState(false)
    const [ channels, setChannels] = useState([]);
    const [background,setBackground]=useState()
    const [color, setColor] = useState("")
    const [font, setFont] = useState("")
    const backgroundS = useSelector(selectBackground);
    const fontS = useSelector(selectFont);
    const colorS = useSelector(selectColor);


    useEffect(() => {
        db.collection("channels").onSnapshot((snapshot) =>
            setChannels(
                snapshot.docs.map((doc) =>({
                    id:doc.id,
                    channel: doc.data(),
                }))
            )
        );
       
    }, [])
  
   
    useEffect(() => {
       setBackground(backgroundS)
       setColor(colorS)
       setFont(fontS)
     
    }, [backgroundS, colorS, fontS])

    console.log(setBackground, setColor, setFont);

    const handleAddChannel = () => {
        const channelName = prompt("Enter a new channel name");

        if(channelName) {
            db.collection("channels").add({
                channelName: channelName,
            });
        }
    }
    const classes=useStylesTheme()
    
    return (
        <div className="sidebar">    
            <div className="sidebar__top">
                <h3>General Server</h3>
                <button 
                        type="button" 
                        className="btn-slide" 
                        onClick={()=>setSlider2(!slider2)}
                >{slider2 ? <ExpandMoreIcon/> :<ExpandLessIcon/> }</button>
            </div>
            {slider2 ? <div className="sidebar__channels">
                    <div className="sidebar__channelsHeader">
                        <div className="sidebar__header">
                            <button 
                            type="button" 
                            className="btn-slide" 
                            onClick={()=>setSlide(!slide)}
                            >{slide ? <ExpandMoreIcon/> :<ExpandLessIcon/> }</button>
                            <h4>Text Channels</h4>
                        </div>

                        <AddIcon onClick={handleAddChannel} className="sidebar__addChannel" />
                    </div>
                { slide ? <div className="sidebar__channelsList">
                        {channels.map(({ id, channel }) => (
                            <SidebarChannel 
                            key={id}
                            id={id}
                            channelName={channel.channelName} 
                            />
                        ))}
                    </div>:null
                }
                </div>:<div  className="sidebar__channels"></div>
            }
            <div className="sidebar__voice">
                <SignalCellularAltIcon 
                className="sidebar__voiceIcon" 
                fontSize="large" 
                />
                <div className="sidebar__voiceInfo">
                    <h3>Voice Connected</h3>
                    <p>Stream</p>
                </div>
                <div className="sidebar__voiceIcons">
                    <InfoOutlinedIcon />
                    <CallIcon />
                </div>
            </div>
            <div className={classes.sidebarProfile}>
                <Avatar className={classes.avatar} onClick={() => auth.signOut()} src={user.photo} />
                <img src={background} className={classes.image1} alt=""/>
                <div className={clsx(classes.avatar, classes.info1)} >
                    <h3 className={classes.text}>{user.displayName}</h3>
                    <p className={classes.text}>#{user.uid.substring(0,4)}</p>
                </div>
                <div className={clsx(classes.avatar, classes.info2)} >
                    <MicIcon className={clsx(classes.icons, classes.text)} />
                    <HeadsetIcon className={clsx(classes.icons, classes.text)} />
                    <SettingsIcon  className={clsx(classes.icons, classes.text)}/>
                </div>
            </div>
        </div>
    );
}

export default Sidebar
