import { useEffect, useState, useContext } from "react";
import { Link } from 'react-router-dom'
import { Navbar, Dropdown } from 'react-bootstrap'

// component
import NavbarUser from '../components/user/NavbarUser'
import MusicPlayer from '../components/MusicPlayer'
import { API } from '../config/api'
import { UserContext } from "../context/userContext";
import ChatUser from '../components/user/ChatUser'


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

    return(
        <>
            <div className="home-container ">
                <div className='d-flex flex-column height-30 home-img'>
                <NavbarUser />
                    <div className=''/>
                    <div className='d-flex flex-column justify-content-center text-white align-items-center flex-1 text-center'>
                        <h1 className='mb-3 fs-0'>Connect on DumbSound</h1>
                        <p className='fs-5 fw-small'>Discovery, Stream, and share a constantly expanding mix of music <br />from emerging and major artists around the world</p>
                    </div>
                </div>

                <h3 className='text-orange text-center mt-5'>Dengarkan Dan Rasakan</h3>

                <div className="mx-5 borra-4 d-flex gap-4 justify-content-justify flex-1 flex-wrap mb-6">
                    {/* card */}
                    {userTrans === null || userTrans?.status === "pending" ?
                        <>
                            {music? 
                                music.map((item) => {
                                    return(
                                        <Link to={'/pay'} className="home-card d-flex mt-5 text-decoration-none">
                                            <div className='card p-2 bg-grey2'>
                                                    <img src={path + item.thumbnail} alt="thumbnail" height={180} className="object-fit"/>
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
                                            <div className="home-card d-flex mt-5 text-decoration-none">
                                                <div className='card p-2 bg-grey2' onClick={() => setPlayMusic(item)}>
                                                    <img src={path + item.thumbnail} alt="thumbnail" height={180} className="pointer object-fit"/>
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
                
                <div className="w-100 p-fixed z-index10">
                    {/* Chat User */}
                    <Dropdown width="100" className="position-relative z-index10">
                        <Dropdown.Toggle variant="transparent">
                        <i class='bx bxs-message-alt-dots text-orange fs-1 '></i>
                        </Dropdown.Toggle>

                        <Dropdown.Menu id="chat">
                            <ChatUser />
                        </Dropdown.Menu>
                    </Dropdown>
                </div>
            <br/>
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