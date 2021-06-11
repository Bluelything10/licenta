import React, { useEffect, useState } from "react";
import "./Chat.css";
import ChatHeader from "./ChatHeader";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import CardGiftcardIcon from "@material-ui/icons/CardGiftcard";
import GifIcon from "@material-ui/icons/Gif";
import EmojiEmotionsIcon from "@material-ui/icons/EmojiEmotions";
import Message from "./Message";
import { useSelector } from "react-redux";
import { selectChannelId, selectChannelName } from "./features/appSlice";
import { selectUser } from "./features/userSlice";
import db from "./firebase";
import firebase from "firebase";
import 'emoji-mart/css/emoji-mart.css'
import { Picker } from 'emoji-mart'
import Modal from '@material-ui/core/Modal';
import GiftMenu from "./GiftMenu.js"

function Chat() {
  const user = useSelector(selectUser);
  const channelId = useSelector(selectChannelId);
  const channelName = useSelector(selectChannelName);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [emoji, addEmoji] = useState("");
  const [open,setOpen]=useState(false)
  const [openGift,setOpenGift]=useState(false)
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (channelId) {
      db.collection("channels")
        .doc(channelId)
        .collection("messages")
        .orderBy("timestamp", "asc")
        .onSnapshot((snapshot) =>
          setMessages(snapshot.docs.map((doc) => doc.data()))
        );
    }
  }, [channelId]);

  const sendMessage = (e) => {
    e.preventDefault();

    db.collection("channels").doc(channelId).collection("messages").add({
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      message: input,
      user: user,
    });

    setInput("");
    addEmoji("")
  };

  const addEmojis = e => {
    let sym = e.unified.split('-')
    let codesArray = []
    sym.forEach(el => codesArray.push('0x' + el))
    let emojis = String.fromCodePoint(...codesArray)
    addEmoji(emojis)
    setInput(input+emoji)
    
  };
  const handleOpenModel=()=>{

        if(openGift){
          setOpenGift(false)

        }else{
          setOpenGift(true)
        }
     
  }
 


 
  return (
    <div className="chat"  >
      <ChatHeader channelName={channelName}  />

      <div className="chat__messages">
        {messages.map((message,index) => (
          <Message
            timestamp={message.timestamp}
            message={message.message}
            user={message.user}
            key={index}
          />
        ))}
      </div>

      <div className="chat__input">
        <AddCircleIcon fontSize="large" />
        <form>
          <input
            value={input}
            disabled={!channelId}
            onChange={(e) => setInput(e.target.value)}
            placeholder={`Message #${channelName}`}
          />
          <button
            disabled={!channelId}
            className="chat__inputButton"
            type="submit"
            onClick={sendMessage}
          >
            Send Message
          </button>
        </form>

        <div className="chat__inputIcons">
          <button type="button" onClick={handleOpenModel} className="emoji-btn" ><CardGiftcardIcon fontSize="large" /></button>
          <Modal
          open={openGift}
          onClose={handleOpenModel}
         >
          <GiftMenu/>
         </Modal>
          <button className="emoji-btn"><GifIcon fontSize="large" /></button>
          <Modal
          open={open}
          onClose={handleClose}
         >
          <Picker 
          
          showPreview={false} 
          style={{ position: 'fixed', bottom:'10%', right:'2vh' }}
          onClick={ addEmojis }
          />
          </Modal>
          
          <button className="emoji-btn" onClick={handleOpen} type="button"><EmojiEmotionsIcon  fontSize="large" /></button>
        </div>
      </div>
    </div>
  );
}

export default Chat;