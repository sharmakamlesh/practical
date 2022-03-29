import React from 'react'

const FormGroup = ({ className, children}) => {
  return (
    <div className={`form-group ${className ? className : ''}`}>{children}</div>
  )
}

export default FormGroup