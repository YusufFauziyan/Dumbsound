import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import NavbarUser from '../components/user/NavbarUser'
import Logo from '../assets/pending.svg'
import { API } from '../config/api';

export default function PendingTransaction() {
    return(
        <>
            <div className="transaction-container d-flex flex-1 flex-column">
                <NavbarUser />

                <div className='d-flex flex-1 align-items-center text-center justify-content-center flex-column text-white mx-2'>
                    <img src={Logo} alt="" width={200} />
                    <h1 className='my-5 fw-700 fs-1'>Premium</h1>
                    <p className='lh-lg mb-4'>Bayar sekarang dan nikmati streaming music yang kekinian dari <span className='text-orange fw-bold'>DUMB</span><b>SOUND</b><br/> <span className='text-orange fw-bold'>DUMB</span><b>SOUND: 098131222232</b></p>
                    <p className="m-1">Hanya <b>Rp.30.000/Bulan</b></p>
                    <button type="submit" className="bg-orange px-5 py-3 text-white fw-500 py-2 borra-3">Bayar Sekarang</button>
                </div>

            </div>
        </>
    )
}