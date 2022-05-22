// import components
import React, {useContext} from 'react'
import {Link} from 'react-router-dom'
import { Dropdown} from 'react-bootstrap'
import Avatar from 'react-avatar'

import DropAdmin from '../admin/DropAdmin'
import { UserContext } from '../../context/userContext';
import { API } from '../../config/api'

// image
import Logo from '../../assets/DumbSound.png'
import Joji from '../../assets/Joji.jpg'

export default function NavbarAdmin() {

    const [state, dispatch] = useContext(UserContext)

    return(
        <>
            <nav  className="navbar px-lg-5 bg-dark shadow">
                <div className="container-fluid mt-3 d-flex">
                    <Link to='/admin' className='text-decoration-none d-flex align-items-center'>
                        <img src={Logo} alt="logo" />
                        <p className='text-orange my-auto fw-bold ms-2'>DUMB<span className='text-white'>SOUND</span></p> 
                    </Link>
                    <div className="">
                    <Dropdown>
                            <Dropdown.Toggle variant="transparent">
                            <Avatar 
                                    colors={['red', 'orange', 'green']} 
                                    name={state.user.fullName}
                                    size="45"
                                    textSizeRatio={2.5}
                                    round={true}
                                    className="shadow me-5"
                                />
                            </Dropdown.Toggle>

                            <Dropdown.Menu variant="dark">
                                <DropAdmin />
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>
                </div>
            </nav>
        </>
    )
}