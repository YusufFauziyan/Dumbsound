import React, {useContext} from 'react'
import { Link, useNavigate} from 'react-router-dom'

import { UserContext } from '../../context/userContext'

// image
import Bill from '../../assets/Bill.png'
import Logout from '../../assets/Logout.svg'

export default function DropUser () {
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
            <div className="triangle" />
            <div className="drop-user bg-grey2 borra-3 text-white">
                <Link to='/pay' className='d-flex py-2 align-items-center border-btm text-decoration-none text-white'>
                    <img src={Bill} alt="bill" width={25} className="ms-3"/>
                    <p className="align-items-center ps-3 my-auto fw-700 fs-8 text-decoration-none
                    text-white">Pay</p>
                </Link>
                <Link to='/auth' className='d-flex py-2 align-items-center text-decoration-none text-white'>
                    <img src={Logout} alt="bill" width={22} className="ms-3"/>
                    <p className="align-items-center ps-3 my-auto fw-700 fs-8 text-decoration-none text-white" onClick={logout}>Logout</p>
                </Link>
            </div>
        </>
    )
}