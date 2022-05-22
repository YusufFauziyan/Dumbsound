// import
import React, { useState } from 'react'
import { useMutation } from "react-query";
import { Alert } from 'react-bootstrap'

import NavbarAdmin from '../components/admin/NavbarAdmin'
import { API } from "../config/api";

export default function AddArtis () {
    // title
    const title = "Add Artis";
    document.title = "DumbMerch | " + title;

    let api = API();

    const [message, setMessage] = useState(null);
    const [category, setCategory] = useState({
        name: '',
        old: '',
        startCareer: '',
        type: ''
    });

    const { name, old, startCareer, type} = category;

    const handleChange = (e) => {
        setCategory({
            ...category,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = useMutation(async (e) => {
        try {
            e.preventDefault();
    
            // Data body
            const body = JSON.stringify( category );
        
            // Configuration
            const config = {
                method: "POST",
                headers: {
                "Content-type": "application/json",
                },
                body: body,
            };
        
            // Insert category data
            const response = await api.post("/artis", config);
        
            if (response.status == 'success') {
                const alert = (
                    <Alert variant="success" className="py-1 text-center m-auto w-30 mt-5">
                        Success add Artis
                    </Alert>
                );
                
                setCategory({
                    name: "",
                    old: "",
                    startCareer: "",
                    type: ""
                });

                setMessage(alert);
                
              } else {
                const alert = (
                  <Alert variant="danger" className="py-1">
                    {response.message}
                  </Alert>
                );
                setMessage(alert);
              }
        } catch (error) {
            console.log(error);
        }
    });
    

    return(
        <>
            <div className="admin-container text-white">
                <NavbarAdmin className='text-center'/>
                <form onSubmit={(e) => handleSubmit.mutate(e)} className='mt-5 p-10'>
                {message}
                    <h2 className='my-4 fs-sans'>Add Artis</h2>
                    <div className="row gap-2">
                        <input type="text" className="p-2 bg-grey border-none borra-2" placeholder='Name' value={name} name='name' onChange={handleChange} required/>

                        <input type="number" className="p-2 bg-grey my-3 border-none borra-2" placeholder='Old' value={old} name='old' onChange={handleChange} />

                        <select class="form-select bg-grey text-grey1" type="text" onChange={handleChange} value={type} name="type" required>
                            <option selected hidden>Type</option>
                            <option name="type">Solo</option>
                            <option name="type">Band</option>
                        </select>

                        <input type="number" className="p-2 bg-grey my-3 border-none borra-2" placeholder='Start Career' value={startCareer} name='startCareer' onChange={handleChange} />
                    </div>

                    <div className='d-flex justify-content-center my-3'>
                        <button type="submit" className="bg-yellow w-30 text-white fw-500 py-2 borra-3">Add Artis</button>
                    </div>
                    
                </form>
            </div>
        </>
    )
}