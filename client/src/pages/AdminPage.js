import React, { useContext, useEffect, useState } from 'react'

import NavbarAdmin from '../components/admin/NavbarAdmin'
import { API } from '../config/api'
import { UserContext } from '../context/userContext'

export default function AdminPage () {

    let api = API()
    
    const [users, setUsers] = useState()

    const getUsers = async () => {
        const config = {
            method: 'GET',
            headers: {
                Authorization: "Basic " + localStorage.token,
            } 
        };
        const response = await api.get('/users', config)
        setUsers(response.getData)
    }

    useEffect(() => {
        getUsers()
    }, [])
    

    return(
        <>
            <div className="admin-container text-white">
                <NavbarAdmin />
                <div className='d-flex flex-column height-90 mt-5 p-10'>
                    <h2 className='my-4 fs-sans'>Incoming Transaction</h2>
                    <table class="table table-dark table-striped fs-6">
                        <thead className="text-orange">
                            <tr>
                                <th className="col p-3">No</th>
                                <th className="col p-3">Users</th>
                                <th className="col p-3">Remaining Active</th>
                                <th className="col p-3">Status User</th>
                                <th className="col p-3">Status Payment</th>
                            </tr>
                        </thead>
                        <tbody>
                        {users?.map((user, index) => (
                            <tr>
                                <th scope="row" className='p-3'>{index + 1}</th>
                                <td className='p-3'>{user.fullName}</td>
                                <td className='p-3 text-green'> PR
                                </td>
                                {user.transaction?.status === "success" ?
                                    <td className='p-3 text-green'>Active</td> : 
                                    <td className='p-3 text-red'>unActvie</td>
                                }
                                {user.transaction?.status === "success" ?
                                    <td className='p-3 text-green'>{user.transaction.status}</td> : 
                                user.transaction?.status === "pending" ?
                                    <td className='p-3 text-yellow'>{user.transaction.status}</td> :
                                    <td className='p-3 text-white'>-</td>
                                }
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}