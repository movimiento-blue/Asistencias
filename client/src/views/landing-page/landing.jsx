import FormLogin from '../../components/form/form'
import coworking from '../../assets/co-working.svg'
import './landing.css'

const Landing = () => {
  return (
    <div className='fullFormContainer'>
      <div className='imageAndFormContainer'>
        <div className='half'>
          <img className='logo' src={coworking} alt='logo' />
        </div>
        <hr className='hrFullForm' />
        <div className='half'>
          <div className='formAndH1container'>
            <h1 className='h1FullForm'>Welcome</h1>
            <FormLogin />
            <h4 className='h4FullForm'>Don`t have an account? <a href='/signup' className='link'>Sign Up</a></h4>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Landing
