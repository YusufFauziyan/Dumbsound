import React from 'react'
import { Form } from 'react-bootstrap'
import NavbarAdmin from '../components/admin/NavbarAdmin'

// image
import Userr from '../assets/Joji.jpg'

export default function ChatAdmin() {
    return(
        <>
            <NavbarAdmin />
            <div className="container-chat-admin text-white p-lg-5 h-70 gap-2 mt-5">
                <div className='bg-grey2 flex-1 borra-3 ms-lg-5 overflow-auto'>
                {/* contact user */}
                    <div className='d-flex border-btm'>
                        <p className='m-auto fw-600 text-center fs-3 font-pt w-100 bg-grey3 borra-3 p-3'>Users</p>
                    </div>
                    <div className='d-flex p-3 border-btm'>
                        <img src={Userr} alt="" width={45} className="rounded-circle shadow me-3 "/>
                        <p className='my-auto fw-600 '>Yusuf Ganteng</p>
                    </div>
                    <div className='d-flex p-3 border-btm'>
                        <img src={Userr} alt="" width={45} className="rounded-circle shadow me-3"/>
                        <p className='my-auto'>Yusuf Ganteng</p>
                    </div>
                </div>
                <div className='bg-grey2 flex-3 borra-3 me-lg-5 d-flex flex-column position-relative'>
                    <div className='overflow-auto h-70'>
                        <div className='d-flex border-btm'>
                            <p className='m-auto fw-600 text-center fs-3 font-pt w-100 bg-grey3 borra-3 p-3'>Yusuf Ganteng</p>
                        </div>
                        <div className='d-flex p-3 me-md-5'>
                            <div class="triangle-left"></div>
                            <p className='bg-primary p-2 borra-3'>Yusuf Ganteng adsas hdoashodhasodhasgudasoudasuohdoasuodasdashdoashdo adas das hoh hasdo asiasasads gads ga sgad giag sdasid</p>
                        </div>
                        <div className='d-flex p-3 ms-auto ps-md-5'>
                            <p className='bg-primary p-2 borra-3'>Yusuf Ganteng adsas hdoashodhasodhasgudasoudasuohdoasuodasdashdoashdo adas das hoh hasdo asiasasads gads ga sgad giag sdasid</p>
                            <div class="triangle-right"></div>
                        </div>
                        <div className='d-flex p-3 ms-auto ps-md-5'>
                            <p className='bg-primary p-2 borra-3'>Yusuf Ganteng adsas hdoashodhasodhasgudasoudasuohdoasuodasdashdoashdo adas das hoh hasdo asiasasads gads ga sgad giag sdasid</p>
                            <div class="triangle-right"></div>
                        </div>
                        <div className='d-flex p-3 ms-auto ps-md-5'>
                            <p className='bg-primary p-2 borra-3'>Yusuf Ganteng adsas hdoashodhasodhasgudasoudasuohdoasuodasdashdoashdo adas das hoh hasdo asiasasads gads ga sgad giag sdasid</p>
                            <div class="triangle-right"></div>
                        </div>
                        <div className='d-flex p-3 ms-auto ps-md-5'>
                            <p className='bg-primary p-2 borra-3'>Yusuf Ganteng adsas hdoashodhasodhasgudasoudasuohdoasuodasdashdoashdo adas das hoh hasdo asiasasads gads ga sgad giag sdasid</p>
                            <div class="triangle-right"></div>
                        </div>
                        <div className='d-flex p-3 ms-auto ps-md-5'>
                            <p className='bg-primary p-2 borra-3'>Yusuf Ganteng adsas hdoashodhasodhasgudasoudasuohdoasuodasdashdoashdo adas das hoh hasdo asiasasads gads ga sgad giag sdasid</p>
                            <div class="triangle-right"></div>
                        </div>
                        <div className='d-flex p-3 ms-auto ps-md-5'>
                            <p className='bg-primary p-2 borra-3'>Yusuf Ganteng adsas hdoashodhasodhasgudasoudasuohdoasuodasdashdoashdo adas das hoh hasdo asiasasads gads ga sgad giag sdasid</p>
                            <div class="triangle-right"></div>
                        </div>
                    </div>
                    <div className="fixed-bottom position-relative">
                        <Form.Control type="email" placeholder="Chat user" className='border-none shadow py-2 px-3 borra-form overflow-auto'/>
                    </div>
                </div>
            </div>
        </>
    )
}