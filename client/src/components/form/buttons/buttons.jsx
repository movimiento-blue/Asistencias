import './buttons.css'

const Buttons = ({ type, name }) => {
  return (
    <div className='divButtonsContainer'>
      <div className='divBackgroundButtons' />
      <button type={type} name={name} className='buttons'>{name}</button>
    </div>
  )
}

export default Buttons
