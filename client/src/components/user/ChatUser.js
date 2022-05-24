import Logo from '../../assets/Joji.jpg'
import React from "react";

export default function ChatUser({dataContact, clickContact, contact, messages, user, sendMessage}) {
    return(
        <>
            <div className='chat-container text-white'>
            {dataContact.map((item) => (
                <div className='d-flex p-2 border-btm justify-content-end' onClick={() => {clickContact(item)}}>
                    <p className='fw-bold fs-7 my-auto ps-3 me-2' >{item.fullName}</p>
                    <img src={Logo} alt="admin" width={45} className="rounded-circle"/>
                </div>
            ))}
                {/* chat */}
            {contact ? (
                <>
                    <div id="chat-messages" className='d-flex flex-column h-1 overflow-auto'>
                        {messages.map((item, index) => (
                            <div key={index}>
                                {item.idSender === user.id ?
                                    <p className='bg-primary w-50 mt-3 p-1 borra-3 ms-2'>{item.message}</p>
                                    :
                                    <p className='bg-primary ms-auto w-50 p-1 borra-3 me-2'>{item.message}</p>
                                }
                            </div>
                        ))}
                    </div>
                    <div className='row g-0'> 
                        <input 
                            placeholder="Chat admin" 
                            className="border-none shadow py-2 px-3 borra-form overflow-auto" 
                            onKeyPress={sendMessage}
                        />
                    </div>
                </>
            ) : (
                <div className="d-flex flex-column h-1 overflow-auto text-center justify-content-center text-primary fw-600">
                    Click admin for start chat
                </div>
            )
            }
            </div>
        </>
    )
}