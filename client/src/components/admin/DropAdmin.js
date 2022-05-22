// import components
import React, {useContext} from 'react'
import { Link, useNavigate} from 'react-router-dom'

import { UserContext } from '../../context/userContext'

// image
import Music from '../../assets/Music.svg'
import People from '../../assets/People.svg'
import Logout from '../../assets/Logout.svg'

export default function DropAdmin () {
    const [state, dispatch] = useContext(UserContext)
    const navigate = useNavigate()

    //logout and remove token
    const logout = () => {
        dispatch({
            type: "LOGOUT"
        })
        navigate("/auth")
    }
    
    return(
        <>
            <div className="triangle-admin" />
            <div className="drop-admin bg-grey2 borra-3 text-white">
                <Link to="/add-music" className='d-flex py-2 align-items-center text-decoration-none text-white'>
                    <img src={Music} alt="bill" width={25} className="ms-4"/>
                    <p className="mt-2 ps-3 my-auto fw-700 fs-8">Add Music</p>
                </Link>
                <Link to="/add-artis" className='d-flex pt-2 pb-3 align-items-center border-btm text-decoration-none text-white'>
                    <img src={People} alt="bill" width={21} className="ms-4 me-1"/>
                    <p className="ps-3 my-auto fw-700 fs-8">Add Artis</p>
                </Link>
                <Link to="/auth" className='d-flex py-2 align-items-center text-decoration-none text-white'>
                    <img src={Logout} alt="bill" width={23} className="ms-4 me-1"/>
                    <p className="align-items-center ps-3 my-auto fw-700 fs-8" onClick={logout}>Logout</p>
                </Link>
            </div> 
        </>
    )
}