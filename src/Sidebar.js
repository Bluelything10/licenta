import React, { useEffect, useState } from 'react'
import "./Sidebar.css";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import AddIcon from '@material-ui/icons/Add';
import SidebarChannel from './SidebarChannel';
import SignalCellularAltIcon from '@material-ui/icons/SignalCellularAlt';
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";
import CallIcon from "@material-ui/icons/Call";
import { Avatar, Tooltip } from "@material-ui/core";
import MicIcon from '@material-ui/icons/Mic';
import HeadsetIcon from '@material-ui/icons/Headset';
import SettingsIcon from '@material-ui/icons/Settings';
import { useSelector } from 'react-redux';
import { selectUser } from './features/userSlice';
import db, { auth } from "./firebase";
import {selectBackground, selectFont, selectColor} from "./features/themeSlice.js";
import {makeStyles} from "@material-ui/core";


 const useStylesTheme = makeStyles((theme) => ({
    sidebarProfile:{
       display:'flex',
       alignItems:'center',
       justifyContent: 'space-between',
       fontFamily: 'Baloo Tammudu 2 cursive', 
       height:'10%',
       border:'1px solid #B7B6C1',
       fontColor:'#2f3135',
   },
   icons:{
       padding:10,    
       cursor: 'pointer',
   },
   info1:{
    flex: 1,
    padding:' 10px',
    fontColor:'#2f3135',
   },
   info2:{
        fontColor:'#2f3135',
    } ,  
    avatar:{
        cursor: "pointer",
    }
}))

function Sidebar() {
    
    const user = useSelector(selectUser);
    const [slide, setSlide] = useState(false)
    const [slider2, setSlider2] = useState(false)
    const [ channels, setChannels] = useState([]);
    const [background,setBackground]=useState("")
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
            <div className="sidebar__top" 
                 style={{ backgroundImage: `url(${background})`, backgroundPosition: 'center', 
                 color : `${color}`,
                 font : `${font}`
                }}>
                <h3 style={{fontFamily: `${font}` }}>General Server</h3>
                <button 
                        type="button" 
                        className="btn-slide" 
                        onClick={()=>setSlider2(!slider2)}
                >{slider2 ? <ExpandMoreIcon className={classes.avatar} style={{color : `${color}` }} /> :<ExpandLessIcon className={classes.avatar} style={{color : `${color}` }} /> }</button>
            </div>
            {slider2 ? <div className="sidebar__channels" >
                    <div className="sidebar__channelsHeader">
                        <div className="sidebar__header">
                            <button 
                            type="button" 
                            className="btn-slide" 
                            onClick={()=>setSlide(!slide)}
                            >{slide ? <ExpandMoreIcon className={classes.avatar}/> :<ExpandLessIcon  className={classes.avatar}/> }</button>
                            <h4 style={{fontFamily: `${font}` }}>Text Channels</h4>
                        </div>

                        <AddIcon onClick={handleAddChannel} className="sidebar__addChannel" />
                    </div>
                { slide ? <div className="sidebar__channelsList" style={{color : `${color}` }}>
                        {channels.map(({ id, channel }) => (
                            <SidebarChannel style={{font: `${font}` }}
                            key={id}
                            id={id}
                            channelName={channel.channelName} 
                            />
                        ))}
                    </div>:null
                }
                </div>:<div  className="sidebar__channels" ></div>
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
            <div style={{ backgroundImage: `url(${background})` , backgroundPosition: 'center', color : `${color}` }} className={classes.sidebarProfile}>
                <Tooltip title="Log Out">
                    <Avatar className={classes.avatar} onClick={() => auth.signOut()} src={user.photo} />
                </Tooltip>
                
                <div className={classes.info1} >
                    <h3 style={{color : `${color}`, fontFamily: `${font}`}} >{user.displayName}</h3>
                    <p style={{color : `${color}`, fontFamily: `${font}` }} >#{user.uid.substring(0,4)}</p>
                </div>
                <div className={ classes.info2} >
                    <MicIcon style={{color : `${color}` }} className={classes.icons} />
                    <HeadsetIcon style={{color : `${color}` }} className={classes.icons} />
                    <SettingsIcon style={{color : `${color}` }}  className={classes.icons}/>
                </div>
            </div>
        </div>
    );
}

export default Sidebar
