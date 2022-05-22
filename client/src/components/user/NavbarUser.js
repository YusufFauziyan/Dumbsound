// import components
import * as React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Dropdown} from 'react-bootstrap'

import DropUser from './DropUser'

// image
import Logo from '../../assets/DumbSound.png'
import Joji from '../../assets/Joji.jpg'


export default function NavbarUser() {

    return(
        <>
            <nav className="navbar mx-lg-5">
                <div className="container-fluid mt-3 d-flex">
                    <Link to='/' className='text-decoration-none d-flex align-items-center'>
                        <img src={Logo} alt="logo" />
                        <p className='text-orange my-auto fw-bold ms-2'>DUMB<span className='text-white'>SOUND</span></p> 
                    </Link>
                    <div className="">

                        <Dropdown>
                            <Dropdown.Toggle variant="transparent">
                                <img src={Joji} alt="user" width={45} className='rounded-circle me-5 shadow' />
                            </Dropdown.Toggle>

                            <Dropdown.Menu variant="dark">
                                <DropUser />
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>
                </div>
            </nav>
        </>
    )
}