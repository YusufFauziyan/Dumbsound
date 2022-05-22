// react
import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Alert } from "react-bootstrap";
import { useMutation } from "react-query";

// import usercontex & api
import { UserContext } from "../context/userContext";
import { API } from "../config/api";

export default function Login () {
    // set title
    const title = "Login";
    document.title = "Dumbsound | " + title;

    const navigate = useNavigate();
    let api = API()

    const [state, dispatch] = useContext(UserContext);

    const [message, setMessage] = useState(null);
    const [form, setForm] = useState({
        email: "",
        password: "",
    });

    const { email, password } = form;

    const handleChange = (e) => {
        setForm({
          ...form,
          [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = useMutation(async (e) => {
        try {
          e.preventDefault();
    
          // Data body
          const body = JSON.stringify(form);
    
          // Configuration
          const config = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: body,
          };
    
          // Insert data for login process
          const response = await api.post("/login", config);
    
          // Checking process
          if (response.status == "success") {
            // Send data to useContext
            dispatch({
                type: "LOGIN_SUCCESS",
                payload: response.data.user,
            });
    
            // Status check
            if (response.data.status == "admin") {
                navigate("/complain-admin");
            } else {
                navigate("/");
            }
    
            const alert = (
                <Alert variant="success" className="py-1">
                    Login success
                </Alert>
            );
            setMessage(alert);
          } else if(response.state) {
    
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
                    Login failed
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
                    <label for="exampleInputEmail1" className="form-label my-3 fs-2 fw-800 ls-3">Login</label>
                    <input type="email" 
                    className="form-control p-2 bg-grey" 
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
                <button type="submit" className="bg-orange w-100 my-3 text-white fw-500 py-2 borra-3">Login</button>
                <p className='text-center fs-7'>Don't have an acount? klik <span className="fw-bold text-decoration-none text-white pointer">
                    Here
                </span></p>
            </form>
        </>
    )
}