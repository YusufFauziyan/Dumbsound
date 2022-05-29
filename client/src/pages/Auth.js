import { useEffect, useState, useContext } from "react";

// component
import Navbar from '../components/Navbar'
import { API } from '../config/api'
import { UserContext } from "../context/userContext";

const path = "http://localhost:5000/uploads/"

export default function Auth () {

    const api = API()

    const [state, dispatch] = useContext(UserContext)

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

    return(
        <>
        <div className="">
            <div className='d-flex flex-column height-30 home-img'>
            <Navbar />
                <div className=''/>
                <div className='d-flex flex-column justify-content-center text-white align-items-center flex-1 text-center'>
                    <h1 className='mb-sm-3 fs-0 auth-header'>Connect on DumbSound</h1>
                    <p className='fs-sm-5 fw-small auth-desc'>Discovery, Stream, and share a constantly expanding mix of music <br />from emerging and major artists around the world</p>
                </div>
            </div>

            <h3 className='text-orange text-center my-4 auth-card-header'>Dengarkan Dan Rasakan</h3>

            <div className="mx-sm-5 mx-3 borra-4 d-flex gap-3 justify-content-justify flex-1 flex-wrap">
                {/* card */}
                {music? 
                    music.map((item) => {
                        return(
                            <div className="home-card d-flex mt-2 text-decoration-none">
                                <div className='card p-2 bg-grey2'>
                                        <img src={path + item.thumbnail} alt="thumbnail" className="object-fit img-card"/>
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
            
            </div>
        </div>
        </>
    )
}