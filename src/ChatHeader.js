import React,{useState,useEffect} from 'react'
import "./ChatHeader.css";
import NotificationsIcon from '@material-ui/icons/Notifications';
import EditLocationIcon from '@material-ui/icons/EditLocation';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import SearchIcon from '@material-ui/icons/Search';
import SendIcon from '@material-ui/icons/Send';
import HelpIcon from '@material-ui/icons/Help';
import {selectBackground, selectFont, selectColor} from "./features/themeSlice.js"
import {selectTheme} from "./features/themeSlice.js"
import { useSelector } from 'react-redux';

function ChatHeader({ channelName }) {
    const [background,setBackground]=useState("")
    const [color, setColor] = useState("")
    const [font, setFont] = useState("")

    const backgroundS = useSelector(selectBackground);
    const fontS = useSelector(selectFont);
    const colorS = useSelector(selectColor);
    useEffect(() => {

        setBackground(backgroundS)
        setColor(colorS)
        setFont(fontS)
      
     }, [backgroundS, colorS, fontS])
 
 
    return (
        <div style={{ backgroundImage: `url(${background})` }} className="chatHeader">
            <div className="chatHeader__left">
                <h3 style={{color : `${color}` }}>
                    <span style={{color : `${color}` }} className="chatHeader__hash">
                        #
                    </span>
                    {channelName}
                    </h3>
            </div>
            <div className="chatHeader__right">
                <NotificationsIcon style={{color : `${color}` }} />
                <EditLocationIcon style={{color : `${color}` }} />
                <PeopleAltIcon style={{color : `${color}` }} />

                <div className="chatHeader__search">
                    <input placeholder="Search" />
                    <SearchIcon style={{color : `${color}` }} />
                </div>
                <SendIcon style={{color : `${color}` }} />
                <HelpIcon style={{color : `${color}` }} />
            </div>
        </div>
    );
}

export default ChatHeader
