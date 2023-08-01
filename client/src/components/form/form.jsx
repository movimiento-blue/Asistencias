import Buttons from './buttons/buttons'
import Inputs from './inputs/inputs'
import './form.css'
import swal from 'sweetalert'
import { useEffect, useState } from 'react'

const FormLogin = () => {
  const [data, setData] = useState({
    Username: '',
    Password: ''
  })
  const [warningUsername, setWarningUsername] = useState(false)
  const [warningPassword, setWarningPassword] = useState(false)

  const handleOnSubmit = (e) => {
    e.preventDefault()
    console.log('entro al submit')
    if (data.Username === '' && data.Password === '') {
      setWarningUsername(true)
      setWarningPassword(true)
      return swal('Completar!', 'Username and Password!', 'warning')
    }
    if (data.Username === '') {
      setWarningUsername(true)
      return swal('Completar!', 'Username!', 'warning')
    }
    if (data.Password === '') {
      setWarningPassword(true)
      return swal('Completar!', 'Password!', 'warning')
    }
    swal('Campons rellenados!', 'Mensaje de prueba!', 'success')
  }

  const onChange = (e) => {
    console.log('esto es name ', e.target.name)
    if (warningUsername && e.target.name === 'Username') {
      setWarningUsername(false)
    }
    if (warningPassword && e.target.name === 'Password') {
      setWarningPassword(false)
    }
    const value = e.target.value
    const name = e.target.name
    setData({
      ...data,
      [name]: value
    })
  }

  useEffect(() => {
    console.log(data)
  }, [data])

  return (
    <form className='formLogin' onSubmit={handleOnSubmit}>
      <Inputs name='Username' type='text' onChange={onChange} warning={warningUsername} />
      <Inputs name='Password' type='password' onChange={onChange} warning={warningPassword} />
      <Buttons name='Login' type='submit' />
    </form>
  )
}

export default FormLogin
