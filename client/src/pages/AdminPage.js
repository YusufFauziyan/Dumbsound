import * as React from 'react'
import NavbarAdmin from '../components/admin/NavbarAdmin'
import { API } from '../config/api'

export default function AdminPage () {
    let api = API()

    const checkUser = async() => {
        const response = await api.get('/users')
        console.log(response);
    }

    React.useEffect(() => {
        checkUser()
    },[])

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
                            <tr>
                                <th scope="row" className='p-3'>1</th>
                                <td className='p-3'>Yusuf Gituloh</td>
                                <td className='p-3 text-green'>Unlimited</td>
                                <td className='p-3 text-red'>Not Active</td>
                                <td className='p-3 text-yellow'>Pending</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}