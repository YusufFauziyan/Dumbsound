import { useEffect, useState, useContext } from "react";
import { Link } from 'react-router-dom'
import { Navbar, Dropdown } from 'react-bootstrap'

// component
import NavbarUser from '../components/user/NavbarUser'
import MusicPlayer from '../components/MusicPlayer'
import { API } from '../config/api'
import { UserContext } from "../context/userContext";
import ChatUser from '../components/user/ChatUser'

// socketIo
import {io} from 'socket.io-client'
let socket; //init variable socketIo


const path = "http://localhost:5000/uploads/"

export default function Home () {

    const api = API()

    const [state, dispatch] = useContext(UserContext)
    const [userTrans, setUserTrans] = useState()
    const [playMusic, setPlayMusic] = useState("")
    const [music, setMusic] = useState()
    // find music
    const getMusic = async () => {
        try {
            const response = await api.get('/musics')
            setMusic(response.data.musics);

        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        getMusic()
    }, [])
    // find transaction
    const getTransaction = async () => {
        try {
            const config = {
                method: "GET",
                headers: {
                  Authorization: "Basic " + localStorage.token,
                },
              };
            const response = await api.get(`/user/${state.user.id}`, config)
            setUserTrans(response.dataUser?.transaction)
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        getTransaction()
    }, [])


    // ===========Chat User==========
    // state
    const [contact, setContact] = useState(null)
    const [contacts, setContacts] = useState([])
    // create messages state
    const [messages, setMessages] = useState([])

    useEffect(() =>{
        socket = io('http://localhost:5000', {
            auth: {
                token: localStorage.getItem("token")
            },
            query: {
                id: state.user.id
            }
        })

        // define corresponding socket listener 
        socket.on("new message", () => {
            console.log("contact", contact)
            console.log("triggered", contact?.id)
            socket.emit("load messages", contact?.id)
        })
        
        // listen error sent from server
        socket.on("connect_error", (err) => {
            console.error(err.message); // not authorized
          });
        loadContact()
        loadMessages()

        return () => {
            socket.disconnect()
        }
    }, [messages])

    const loadContact = () => {
        // emit event load admin contact
        socket.emit("load admin contact")
        // listen event to get admin contact
        socket.on("admin contact", async (data) => {
            // manipulate data to add message property with the newest message
            const dataContact = {
                ...data, 
                message: messages.length > 0 ? messages[messages.length -1].message : "Click here to start message"
            }
            setContacts([dataContact])
        })
    }

    // used for active style when click contact
    const onClickContact = (data) => {
        setContact(data)
        // emit event load messages
        socket.emit("load messages", data.id)
    }

    const loadMessages = (value) => {
        // define listener on event "messages"
        socket.on("messages", async (data) => {
            // get data messages
            if (data.length > 0) {
                const dataMessages = data.map((item) => ({
                    idSender: item.sender.id,
                    message: item.message,
                }))
                console.log(dataMessages)
                setMessages(dataMessages)
            }
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
            <div className="home-container ">
                <div className='d-flex flex-column height-30 home-img'>
                <NavbarUser />
                    <div className=''/>
                    <div className='d-flex flex-column justify-content-center text-white align-items-center flex-1 text-center'>
                        <h1 className='mb-md-3 fs-0 auth-header'>Connect on DumbSound</h1>
                        <p className='fs-md-5 fw-small auth-desc'>Discovery, Stream, and share a constantly expanding mix of music <br />from emerging and major artists around the world</p>
                    </div>
                </div>

                <h3 className='text-orange text-center mt-md-5 my-4 auth-card-header'>Dengarkan Dan Rasakan</h3>

                <div className="mx-sm-5 mx-3 borra-4 d-flex gap-3 justify-content-justify flex-1 flex-wrap mb-6">
                    {/* card */}
                    {userTrans === null || userTrans?.status === "pending" ?
                        <>
                            {music? 
                                music.map((item) => {
                                    return(
                                        <Link to={'/pay'} className="home-card d-flex mt-2 text-decoration-none">
                                            <div className='card p-2 bg-grey2'>
                                                    <img src={path + item.thumbnail} alt="thumbnail" height={180} className="object-fit img-card"/>
                                                    <div className='text-white p-2 py-3'>
                                                        <div className="d-flex text-white justify-content-between">
                                                            <p className='fw-600 mb-3px'>{(item.title.length > 8) ? item.title.slice(0, 8) + '...' : item.title}</p>
                                                            <p className='mb-3px'>{item.year}</p>
                                                        </div>
                                                        <div className='fs-8 fw-300'>{item.artis.name}</div>
                                                    </div>
                                            </div>
                                        </Link>
                                    )
                                })
                                : 
                                <h2 className='text-center text-white mx-auto mt-5'>Sorry.. <br/>No Music Found please contact Admin</h2>
                            }
                        </>
                        :
                        <>
                            {userTrans?.status === "success" &&
                            <>
                                {music? 
                                    music.map((item) => {
                                        return(
                                            <div className="home-card d-flex mt-2 text-decoration-none">
                                                <div className='card p-2 bg-grey2 ' onClick={() => setPlayMusic(item)}>
                                                    <img src={path + item.thumbnail} alt="thumbnail" height={180} className="pointer object-fit img-card"/>
                                                    <div className='text-white p-2 py-3'>
                                                        <div className="d-flex text-white justify-content-between">
                                                            <p className='fw-600 mb-3px'>{(item.title.length > 8) ? item.title.slice(0, 8) + '...' : item.title}</p>
                                                            <p className='mb-3px'>{item.year}</p>
                                                        </div>
                                                        <div className='fs-8 fw-300'>{item.artis.name}</div>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })
                                    :
                                    <h2 className='text-center text-white mx-auto mt-5'>Sorry.. <br/>No Music Found please contact Admin</h2>
                                }
                            </>
                            }
                        </>
                    }
                </div>
                
            <br/>
            </div>
                <div className="w-100 p-fixed z-index10">
                    {/* Chat User */}
                    <Dropdown width="100" className="position-relative z-index10">
                        <Dropdown.Toggle variant="transparent">
                        <i class='bx bxs-message-alt-dots text-orange fs-1 '></i>
                        </Dropdown.Toggle>

                        <Dropdown.Menu id="chat">
                            <ChatUser dataContact={contacts}  
                                clickContact={onClickContact} 
                                contact={contact} 
                                messages={messages} 
                                user={state.user} 
                                sendMessage={onSendMessage}
                            />
                        </Dropdown.Menu>
                    </Dropdown>
                </div>
            {/* Playing Music Player */}
            {playMusic === "" ?
                <div /> :
                <Navbar className="fixed-bottom z-index1">
                    <MusicPlayer playMusic={playMusic} />
                </Navbar>
            }

        </>
    )
}