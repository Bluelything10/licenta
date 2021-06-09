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

function Sidebar() {
    const user = useSelector(selectUser);
    const [slide, setSlide] = useState(false)
    const [slider2, setSlider2] = useState(false)
    const [ channels, setChannels] = useState([]);

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

    const handleAddChannel = () => {
        const channelName = prompt("Enter a new channel name");

        if(channelName) {
            db.collection("channels").add({
                channelName: channelName,
            });
        }
    }
  
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
            <div className="sidebar__profile">
                <Avatar onClick={() => auth.signOut()} src={user.photo} />
                <div className="sidebar__profileInfo">
                    <h3>{user.displayName}</h3>
                    <p>#{user.uid.substring(0,4)}</p>
                </div>
                <div className="sidebar__profileIcons">
                    <MicIcon />
                    <HeadsetIcon />
                    <SettingsIcon />
                </div>
            </div>
        </div>
    );
}

export default Sidebar
