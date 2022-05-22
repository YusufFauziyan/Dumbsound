// import component
import * as React from 'react'
import Register from '../components/Register'
import Login from '../components/Login'

// Import react-bootstrap
import {Modal} from 'react-bootstrap'

// image
import Logo from '../assets/DumbSound.png'

// Function Modal
function RegisterShow(props) {
    return (
      <Modal
        {...props}
        centered
      >
          <Register />
      </Modal>
    );
}
function LoginShow(props) {
    return (
      <Modal
        {...props}
        centered
      >
          <Login />
      </Modal>
    );
}


// fucntion
export default function Navbar () {
    const [modalShow, setModalShow] = React.useState(false);
    const [modalShowLogin, setModalShowLogin] = React.useState(false);
    return(
        <>
            <nav class="navbar mx-5">
                <div class="container-fluid mt-3">
                    <a href='' className='text-decoration-none d-flex align-items-center'>
                        <img src={Logo} alt="logo" />
                        <p className='text-orange my-auto fw-bold ms-2'>DUMB<span className='text-white'>SOUND</span></p> 
                    </a>
                    <div class="d-flex">
                        <button type="button" class="btn btn-outline-light px-5 borra-3 fs-8" onClick={() => setModalShowLogin(true)}>Login</button>
                        <button type="button" class="borra-3 text-white bg-orange px-5 ms-2 border-none fs-8" onClick={() => setModalShow(true)}>Register</button>
                        
                        <RegisterShow
                            show={modalShow}
                            onHide={() => setModalShow(false)}
                        />
                        <LoginShow
                            show={modalShowLogin}
                            onHide={() => setModalShowLogin(false)}
                        />
                    </div>
                </div>
            </nav>
        </>
    )
}