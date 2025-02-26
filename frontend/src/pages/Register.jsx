import React, {useState} from 'react'
import { FaUser } from 'react-icons/fa'
import { toast } from 'react-toastify'

function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: ''
  })
  
  const {name, email, password, password2} = formData

  const onChange = (e) => {
    setFormData((prevState) => ({
        ...prevState,
        [e.target.name] : e.target.value
    }))
  }

  const onSubmit = (e) => {
    e.preventDefault()

    if(password !== password2) {
        toast.error('Passwords do not match')
    } 
  }
  return (
    <>
    <section className="heading">
        <h1>
            <FaUser/> Register
        </h1>
        <p>Create an Account</p>
    </section>
    <section className="form">
        <form onSubmit={onSubmit}>
            <div className="form-group">
                <input
                  type="text"
                  className='form-control'
                  id='name'
                  name='name'
                  value={name}
                  onChange={onChange}
                  placeholder='Enter Your Name'
                  required
                />
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
                <input
                  type="password"
                  className='form-control'
                  id='password2'
                  name='password2'
                  value={email}
                  onChange={onChange}
                  placeholder='Confirm Your Password'
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