// import components
import React, {useContext} from 'react'
import {Link} from 'react-router-dom'
import { Dropdown} from 'react-bootstrap'
import Avatar from 'react-avatar'

import DropAdmin from '../admin/DropAdmin'
import { UserContext } from '../../context/userContext';

// image
import Logo from '../../assets/DumbSound.png'

export default function NavbarAdmin() {

    const [state] = useContext(UserContext)

    return(
        <>
            <nav  className="navbar px-lg-3 bg-dark shadow">
                <div className="container-fluid d-flex">
                    <Link to='/admin' className='text-decoration-none d-flex align-items-center'>
                        <img src={Logo} alt="logo" />
                        <p className='text-orange my-auto fw-bold ms-2 nav-text'>DUMB<span className='text-white'>SOUND</span></p> 
                    </Link>
                    <div className="">
                    <Link to='/chat-admin' class='bx bx-message-rounded-detail text-white fs-1 position-absolute chat-icon text-decoration-none'></Link>
                    <Dropdown>
                            <Dropdown.Toggle variant="transparent">
                            <Avatar 
                                    colors={['red', 'orange', 'green']} 
                                    name={state.user.fullName}
                                    size="45"
                                    textSizeRatio={2.5}
                                    round={true}
                                    className="shadow"
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