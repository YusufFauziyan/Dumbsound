// import components
import * as React from 'react'
import {Link} from 'react-router-dom'
import { Dropdown} from 'react-bootstrap'

import DropAdmin from '../admin/DropAdmin'

// image
import Logo from '../../assets/DumbSound.png'
import Joji from '../../assets/Joji.jpg'

export default function NavbarAdmin() {
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
                                <img src={Joji} alt="user" width={45} className='rounded-circle me-5 shadow' />
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