// import components
import React, { useState, useContext } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Alert, Spinner } from "react-bootstrap";
import { useMutation } from "react-query";

import { UserContext } from "../context/userContext";
import { API } from "../config/api";
import Login from './Login'

// function
export default function Register () {
    // set title
    const title = "Register";
    document.title = "Dumbsound | " + title;

    const navigate = useNavigate()
    const api = API()
    const [state, dispatch] = useContext(UserContext);

    // state
    const [message, setMessage] = useState(null);
    const [form, setForm] = useState({
        email: "",
        password: "",
        fullName: "",
        phone: "",
        address: "",
        gender: ""
    })

    const { fullName, email, password, phone, address, gender } = form;

    const handleChange = (e) => {
      setForm({
        ...form,
        [e.target.name]: e.target.value,
      });
    };

    // when submit
    const handleSubmit = useMutation(async (e) => {
        try {
    
          e.preventDefault();
    
          // Data body
          const body = JSON.stringify(form);
    
          // Configuration Content-type
          const config = {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: body,
          };
    
          // Insert data user to database
          const response = await api.post("/register", config);
    
          console.log(response);
    
          // Notification
          if (response.status == 'success') {
            dispatch({
              type: "REGISTER_SUCCESS",
              payload: response.data
            });
    
            const alert = (
              <Alert variant="success" className="py-1">
                Success, <br/> Plesae wait..<Spinner animation="border" variant="primary" size="sm" className="ms-3" />
              </Alert>
            );
            
            setForm({
                email: "",
                password: "",
                fullName: "",
                phone: "",
                address: "",
                gender: ""
            });
            setMessage(alert);
            setTimeout(() => navigate("/"), 2000)
            
          } else {
            const alert = (
              <Alert variant="danger" className="py-1">
                {response.message}
              </Alert>
            );
            setMessage(alert);
          }
        } catch (error) {
          const alert = (
            <Alert variant="danger" className="py-1">
              Failed
            </Alert>
          );
          setMessage(alert);
          console.log(error);
        }
      });


    return(
        <>
            <form onSubmit={(e) => handleSubmit.mutate(e)} className="form-login bg-container px-4 py-4 text-white borra-4">
                <div className="mb-3">
                    {message}
                    <label for="exampleInputEmail1" className="form-label my-4 fs-2 fw-800 ls-3">Register</label>
                    <input type="email" 
                    className="form-control p-2 bg-grey" 
                    id="exampleInputEmail1" 
                    aria-describedby="emailHelp"
                    placeholder='Email'
                    value={email}
                    name="email"
                    onChange={handleChange}
                    />
                </div>
                <div className="mb-3">
                    <input type="password" 
                    className="form-control p-2 bg-grey" 
                    placeholder='Password'
                    value={password}
                    name="password"
                    onChange={handleChange}
                />
                </div>
                <div className="mb-3">
                    <input type="text" 
                    className="form-control p-2 bg-grey" 
                    placeholder='Full Name'
                    value={fullName}
                    name="fullName"
                    onChange={handleChange}
                />
                </div>
                <div className="mb-3">
                <select class="form-select bg-grey text-grey1" type="text" value={gender} name="gender" onChange={handleChange}>
                    <option selected hidden value="">Gender</option>
                    <option name="gender">Male</option>
                    <option name="gender">Female</option>
                </select>
                </div>
                <div className="mb-3">
                    <input type="number" 
                    className="form-control p-2 bg-grey" 
                    placeholder='Phone'
                    value={phone}
                    name="phone"
                    onChange={handleChange}
                />
                </div>
                <div className="mb-3">
                    <input type="text" 
                    className="form-control p-2 bg-grey" 
                    placeholder='Address'    
                    value={address}
                    name="address"
                    onChange={handleChange}
                />
                </div>
                <button type="submit" className="bg-orange w-100 my-3 text-white fw-500 py-2 borra-3">Register</button>
                <p className='text-center fs-7 -text-grey'>Already have an acount? klik <span className="fw-bold text-decoration-none text-white pointer">
                    Here
                </span></p>
            </form>
        </>
    )
}