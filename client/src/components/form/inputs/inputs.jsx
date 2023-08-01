import { useEffect, useRef, useState } from 'react'
import './inputs.css'
import ShowPass from '../showPass/showPass'
import Warning from '../../../assets/warning'

const Inputs = ({ type, name, onChange, warning }) => {
  // show muestra la contraseña cuando es true.
  // se establece en null para evitar enfocar los input en cuanto se renderice la pagina.
  const [show, setShow] = useState(null)

  // dots indica si el input tiene un ":" o no.
  const [focus, setFocus] = useState(false)

  // color indica el color del boton de ver contraseña.
  const [color, setColor] = useState(undefined)

  // refPass es el input que tiene el valor de la contraseña.
  // se usara para enfocar el input en la parte final del texto.
  const refPass = useRef(null)

  // se añade dos puntos al span cuando se eleva.
  const twoDots = focus ? ':' : null

  // se ejecuta cuando el input es focusado o desfocado.
  const handleOnFocus = (e) => {
    setFocus(true)
  }
  const handleOnBlur = (e) => {
    if (e.target.value.length === 0) {
      setFocus(!focus)
    }
  }

  // se ejecuta cuando el show cambia.
  // evitando que se enfoque el input al renderizar la pagina la primera vez.
  useEffect(() => {
    if (show !== null) {
      refPass.current.focus()
      // inputRef.current.selectionStart = inputRef.current.selectionEnd = inputRef.current.value.length
      refPass.current.setSelectionRange(refPass.current.value.length, refPass.current.value.length)
    }
  }, [show])

  // establece el valor de "true o false" cuando se hace click en el boton de ver contraseña.
  // ? se usa para mostrar u ocultar la contraseña.
  const hendleShowClick = (e) => {
    e.preventDefault()
    setShow(!show)
  }

  // si type es igual a password se muestra el boton de ver contraseña.
  const botonShowPass = type === 'password' &&
    <button
      onClick={hendleShowClick}
      className='buttonVerPass'
      onMouseEnter={() => setColor('#44a5a0')}
      onMouseLeave={() => setColor(undefined)}
    >
      <ShowPass color={color} show={show} />
    </button>
  const showPass = show ? 'text' : type

  // ! entrega el icono warning, con los estilos necesarios, dentro de un boton.
  const botonWarning = (
    <button className='buttonVerPass'>
      <Warning />
    </button>
  )

  const handleOnChange = (e) => {
    onChange(e) // este es el onChange pasado por props
  }

  const spanPlaceholder = focus ? 'spanPlaceholderElevate' : 'spanPlaceholder'

  return (
    <div className='divImputsContainer'>
      <input
        ref={refPass}
        type={showPass}
        name={name}
        className='inputs'
        onChange={handleOnChange}
        onFocus={handleOnFocus} // se ejecuta cuando el input es enfocado
        onBlur={handleOnBlur} // se ejecuta cuando el input es desenfocado
        autoComplete={`current-${type}`}
      />
      <span className='spanInputs' />
      <span className={spanPlaceholder}>{name}{twoDots}</span>
      {/* el operador terneario verifica si hay algun warning, y si es asi, muestra el boton de warning */}
      {warning ? botonWarning : botonShowPass}
    </div>
  )
}

export default Inputs
