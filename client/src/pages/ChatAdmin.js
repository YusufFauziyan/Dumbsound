import React, { useState, useEffect, useContext } from 'react'
import { Form } from 'react-bootstrap'
import {io} from 'socket.io-client'

import NavbarAdmin from '../components/admin/NavbarAdmin'
import { UserContext } from '../context/userContext'
import  Contact  from '../components/admin/ChatAdmin'

// image
import userLogo from '../assets/Joji.jpg'
import default_profile from "../assets/blank-profile.png"

let socket //init variabel socketIo

export default function ChatAdmin() {

    const desc = "Chat";
    document.title = "Dumbsound | " + desc;

    // state
    const [contact, setContact] = useState(null)
    const [contacts, setContacts] = useState([])
    // create messages state
    const [messages, setMessages] = useState([])
    const [state] = useContext(UserContext)
    
    useEffect(() =>{
        socket = io('http://localhost:5000', {
            auth: {
                token: localStorage.getItem('token')
            },
            query: {
                id: state.user.id
            }
        })

        // define listener for every updated message
        socket.on("new message", () => {
            console.log("contact", contact)
            socket.emit("load messages", contact?.id)
        })

        loadContacts()
        loadMessages()

        return () => {
            socket.disconnect()
        }
    }, [messages])

    const loadContacts = () => {
        socket.emit("load user contacts")
        socket.on("user contacts", (data) => {
            // filter just customers which have sent a message
            let dataContacts = data.filter(item => (item.status !== "admin") && (item.recipientMessage.length > 0 || item.senderMessage.length > 0))
            
            // manipulate customers to add message property with the newest message
            dataContacts = dataContacts.map((item) => ({
                ...item,
                message: item.senderMessage.length > 0 ? item.senderMessage[item.senderMessage.length -1].message : "Click here to start message"
            }))
            setContacts(dataContacts)
        })
    }

     // used for active style when click contact
    const onClickContact = (data) => {
        setContact(data)
        // emit event load messages
        socket.emit("load messages", data.id)
    }

    const loadMessages = () => {
        // define event listener for "messages"
        socket.on("messages", (data) => {
            // get data messages
            if (data.length > 0) {
                const dataMessages = data.map((item) => ({
                    idSender: item.sender.id,
                    message: item.message,
                }))
                setMessages(dataMessages)
            }
            loadContacts()
            const chatMessagesElm = document.getElementById("chat-messages")
            chatMessagesElm.scrollTop = chatMessagesElm?.scrollHeight
        })
    }

    const onSendMessage = (e) => {
        // listen only enter key event press
        if(e.key === 'Enter') {
            const data = {
                idRecipient: contact.id,
                message: e.target.value
            }

            //emit event send message
            socket.emit("send message", data)
            e.target.value = ""
        }
    }
    
    return(
        <>
            <NavbarAdmin />
            <div className="container-chat-admin text-white p-lg-5 h-70 gap-2 mt-5">
                <div className='bg-grey2 flex-1 borra-3 ms-lg-5 overflow-md-auto '>
                {/* contact user */}
                    <div className='d-flex border-btm'>
                        <p className='m-auto fw-600 text-center fs-3 font-pt w-100 bg-grey3 borra-3 p-3'>Users</p>
                    </div>
                    {contacts.length > 0 && (
                        <>
                            {contacts.map((item) => (
                                <div 
                                    className={`d-flex p-3 border-btm ${contact?.id === item?.id && "contact-active"}`}
                                    key={item.id}
                                    onClick={() => {onClickContact(item)}}
                                >
                                    <img src={default_profile} alt="" width={45} className="rounded-circle shadow me-3 "/>
                                    <p className='my-auto fw-600 '>{item.fullName}</p>
                                </div>
                            ))}
                        </>
                    )}     
                </div>

                <div className='bg-grey2 flex-3 borra-3 me-lg-5 d-flex flex-column'>
                {contact ? (
                    <>
                    <div className='overflow-auto h-70 position-relative'>
                        <div className='d-flex border-btm'>
                            <p className='m-auto fw-600 text-center fs-3 font-pt w-100 bg-grey3 borra-3 p-3'>Chat</p>
                        </div>
                        {messages.map((item, index) => (
                            <div key={index}>
                                {item.idSender !== state.user.id ?
                                    <div className='d-flex p-3 me-md-5'>
                                        <div class="triangle-left"></div>
                                        <p className='bg-primary p-2 borra-3'>{item.message}</p>
                                    </div>
                                    :
                                    <div className='d-flex p-3 ms-auto ps-md-5 justify-content-end'>
                                        <p className='bg-primary p-2 borra-3'>{item.message}</p>
                                        <div class="triangle-right"></div>
                                    </div>
                                }
                            </div>
                        ))}
                    </div>
                    <div className="fixed-bottom position-relative">
                        <Form.Control type="email" placeholder="Chat user" className='border-none shadow py-2 px-3 borra-form overflow-auto' onKeyPress={onSendMessage}/>
                    </div>
                    </>
                    ) : (
                        <div className='overflow-auto h-70 d-flex align-items-center justify-content-center'>
                            No message
                        </div>
                    )
                }
                </div>
            </div>
        </>
    )
}