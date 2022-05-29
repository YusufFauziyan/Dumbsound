// import components
import React, {useContext} from 'react'
import { Link } from 'react-router-dom'
import { Dropdown} from 'react-bootstrap'
import Avatar from 'react-avatar';

import DropUser from './DropUser'
import { UserContext } from '../../context/userContext';
import { API } from '../../config/api'

// image
import Logo from '../../assets/DumbSound.png'


export default function NavbarUser() {

    const [state, dispatch] = useContext(UserContext)


    return(
        <>
            <nav className="navbar mx-lg-5">
                <div className="container-fluid mt-lg-3 d-flex">
                    <Link to='/' className='text-decoration-none d-flex align-items-center'>
                        <img src={Logo} alt="logo" />
                        <p className='nav-text text-orange my-auto fw-bold ms-2'>DUMB<span className='text-white'>SOUND</span></p> 
                    </Link>
                    <div className="dropdown-user">

                        <Dropdown>
                            <Dropdown.Toggle variant="transparent">
                                <Avatar 
                                    colors={['red', 'orange', 'green']}
                                    name={state.user.fullName}
                                    size="50"
                                    textSizeRatio={2.5}
                                    round={true}
                                    className="shadow me-lg-5 avatar-img"
                                />
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