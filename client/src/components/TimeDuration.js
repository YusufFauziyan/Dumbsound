import React,{ useState, useEffect } from 'react'
import { API } from '../config/api'

export default function TimeDuration({ dueDate, status, byId, DateAwal, loadTransaction }) {

    let api = API()

    const [startDate, setStartDate] = useState("")

    let months = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12']

    const loadStartDate = async () => {
        var date = new Date();
        var month = date.getMonth();
        let Tanggal = new Date().getDate();
        let Tahun = new Date().getFullYear();

        setStartDate(Tahun + "-" + months[month] + "-" + Tanggal)
    }

    var date1 = new Date(startDate); // tanggal sekarang
    var date2 = new Date(dueDate); // tanggal masa berlangganan

    var Difference_In_Time = date2.getTime() - date1.getTime();

    var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);

    // Delete ketika tanggal berlangganan lebih kecil sama dengan tanggal sekarang
    if (dueDate <= startDate) {
        console.log(byId)
        try {
            api.delete(`/transaction/${byId}`)

            // load transaction
            loadTransaction()
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        loadStartDate()
    }, [])
    return (
        <div>
            {status === "success" ?
                <p>{Difference_In_Days} / Hari</p> :
                <p>0 / Hari</p>
            }
        </div>
    )
}