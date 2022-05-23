import React from 'react'
import { Form } from 'react-bootstrap'

import Logo from '../../assets/Joji.jpg'

export default function ChatUser() {
    return(
        <>
            <div className='chat-container text-white'>
                <div className='d-flex p-2 border-btm'>
                    <img src={Logo} alt="admin" width={45} className="rounded-circle"/>
                    <p className='fw-bold fs-7 my-auto ps-3'>Admin</p>
                </div>
                <div className='d-flex flex-column h-1 overflow-auto'>
                    <p className='bg-primary w-50 mt-3 p-1 borra-3 ms-2'>Helloasda sdadas dasd s</p>
                    <p className='bg-primary ms-auto w-50 p-1 borra-3 me-2'>Hello ganasdasd asd asd asdoas hodhasd</p>
                    <p className='bg-primary ms-auto w-50 p-1 borra-3 me-2'>Hello ganasdasd asd asd asdoas hodhasd</p>
                    <p className='bg-primary ms-auto w-50 p-1 borra-3 me-2'>Hello ganasdasd asd asd asdoas hodhasd</p>
                    <p className='bg-primary ms-auto w-50 p-1 borra-3 me-2'>Hello ganasdasd asd asd asdoas hodhasd</p>
                </div>
                <div className='row g-0'> 
                    <Form.Control type="email" placeholder="Chat admin" className='border-none shadow py-2 px-3 borra-form overflow-auto'/>
                </div>
            </div>
        </>
    )
}