import React, {useState} from 'react'
import { FaUser, FaSignInAlt } from 'react-icons/fa'
import { toast } from 'react-toastify'

function Register() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })
  
  const { email, password } = formData

  const onChange = (e) => {
    setFormData((prevState) => ({
        ...prevState,
        [e.target.name] : e.target.value
    }))
  }

  const onSubmit = (e) => {
    e.preventDefault()

    
  }
  return (
    <>
    <section className="heading">
        <h1>
            <FaSignInAlt/> Login
        </h1>
        <p>Please Login To Get Support</p>
    </section>
    <section className="form">
        <form onSubmit={onSubmit}>
            <div className="form-group">
                <input
                  type="email"
                  className='form-control'
                  id='email'
                  name='email'
                  value={email}
                  onChange={onChange}
                  placeholder='Enter Your Email'
                  required
                />
                <input
                  type="password"
                  className='form-control'
                  id='password'
                  name='password'
                  value={password}
                  onChange={onChange}
                  placeholder='Enter Password'
                  required
                />
            </div>
            <div className="form-group">
                <button className='btn btn-block'>Submit</button>
            </div>
        </form>
    </section>
    </>
  )
}

export default Register