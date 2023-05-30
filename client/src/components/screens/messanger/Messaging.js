import React, { useContext, useEffect, useRef, useState } from 'react'
import { UserContext } from '../../App'
import { io } from "socket.io-client"
import './messenger.css'
import Conversation from './conversation'
import Message from './message'
import ChatOnline from './ChatOnline'
export default function Messaging() {
  const [conversations, setConversations] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([{}]);
  const [newMsg, setNewMsg] = useState("");
  const [arrivalMsg, setArrivalMsg] = useState(null);
  const { state } = useContext(UserContext);
  // const {socket} = useRef(io("ws://localhost:8900"))
  const [socket, setSocket] = useState(null)
  useEffect(() => {
    const fetchData = async () => {
      const socket = io("ws://memegram.onrender.com:10000");
      setSocket(socket);

      socket.on("getMessage", (data) => {
        setArrivalMsg({
          sender: data.senderId,
          text: data.text,
          createdAt: Date.now(),
        });
      });
    };

    fetchData();
  }, [])

  useEffect(() => {
    arrivalMsg && currentChat?.members.includes(arrivalMsg.sender) && setMessages((prev) => [...prev, arrivalMsg])
  }, [arrivalMsg, currentChat])

  useEffect(() => {
    if (socket) {
      socket.emit("addUser", state._id)
      socket.on("getUsers", users => {
        console.log(users)
      })
    }
  }, [socket])
  useEffect(() => {
    fetch('/conversations', {
      method: "get",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + localStorage.getItem("jwt")
      }
    })
      .then(res => res.json())
      .then(result => {
        setConversations(result)
      })
  }, [])

  useEffect(() => {
    currentChat ?
      fetch('/messages/' + currentChat._id, {
        method: "get",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + localStorage.getItem("jwt")
        }
      })
        .then(res => res.json())
        .then(result => {
          setMessages(result)
        }) : console.log();
  }, [currentChat])
  const handleSubmit = (e) => {
    e.preventDefault();
    if (newMsg != "") {
      const message = {
        text: newMsg,
        ConversationId: currentChat._id
      }
      const recieverId = currentChat.members.find(member => member !== state._id)
      socket.emit("sendMessage", {
        senderId: state._id,
        recieverId,
        text: newMsg
      })
      fetch('/messages/' + currentChat._id, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + localStorage.getItem("jwt")
        },
        body: JSON.stringify({
          message
        })
      })
        .then(res => res.json())
        .then(result => {
          setMessages([...messages, result])
          setNewMsg("")
        })
    }
  }
  return (
    <div className='messenger'>
      <div className='chatMenu'>
        <div className='chatMenuWrapper'>
          {
            conversations.map(c => {

              return <div onClick={() => { setCurrentChat(c) }}> <Conversation conversation={c} /></div>
            })
          }
        </div>
      </div>
      <div className='chatBox'>
        <div className='chatBoxWrapper'>
          {currentChat && messages ? <>
            <div className='chatBoxTop'>
              {messages.map(m => {
                var isown = m.Sender === state._id
                return (<div> <Message own={isown} message={m} /></div>)
              })}
            </div>
            <div className='chatBoxBottom'>
              <textarea className='chatMessageInput' placeholder='write something.....' onChange={(e) => { setNewMsg(e.target.value) }} value={newMsg} />
              <button className='chatSubmitButton btn blue' onClick={(e) => { handleSubmit(e) }}>Send</button>
            </div>
          </> : <span classname="noConversation">click on a chat to start a conversation</span>}
        </div>
      </div>
      <div className='chatOnline'>
        <div className='chatOnlineWrapper'>
          <ChatOnline />
          <ChatOnline />
          <ChatOnline />
          <ChatOnline />
        </div>
      </div>
    </div>
  )
}