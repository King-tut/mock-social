import React from 'react';
//import * as React from 'react';
import {useForm} from 'react-hook-form';



const Register = () => {
    const {register, handleSubmit,watch, formState: {errors} } = useForm();
    const onSubmit = (data) =>{
        console.log(data)
        fetch("http://localhost:5000/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(data)

        })
        .then(res => res.json())
        .then(finalData => {
            console.log(finalData)
        })
        //console.log(data.name)
    } 
  return (
    /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* register your input into the hook by invoking the "register" function */}
      <input defaultValue="" {...register("name", {required: "This field is required."})} />
      {errors.name ? <span>This field is required</span> : null}
      {/* include validation with required or other standard HTML validation rules */}
      <input {...register("email", {required: "This field is required."})} />
      {/* errors will return when field validation fails  */}
      {errors.email && <span>This field is required</span>}

      <input {...register("password", {required: "This field is required."})} />
      {/* errors will return when field validation fails  */}
      {errors.password && <span>This field is required</span>}

      <input {...register("confirmPassword", {required: "The passwords must match."})} />
      {/* errors will return when field validation fails  */}
      {errors.confirmPassword  && <span>This field is required</span>}
      
      <input type="submit" />
    </form>
   
  )
}

export default Register