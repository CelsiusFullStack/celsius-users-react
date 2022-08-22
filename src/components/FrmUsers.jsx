import axios from 'axios'
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'

const defaultValue = {
  first_name: '',
  last_name: '',
  email: 'nombre@dominio.com',
  birthday:'',
  password: ''
}

const msg = {
  req: "Field is Required..!",
  valid_name: "Fisrt/Last Name Invalid..!",
  min_len:"Min. Length Invalid..! ",
  max_len:"Max. Length Invalid..!",
  email: "Format e-mail Invalid",
  password: "Debes introducir un número correcto"
 }
 const patterns = { 
  valid_name: /^[A-Z a-z ]+$/i,
  email:/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
 };


const FrmUsers = ({getAllUsers, updateInfo, setUpdateInfo, handleCloseForm}) => {
  useEffect(() => {
    if(updateInfo){
      reset(updateInfo)
    }
  }, [updateInfo])
  const createUser = data => {
    const URL = 'https://users-crud1.herokuapp.com/users/'
    axios.post(URL, data)
      .then(res => {
        Swal.fire("Register User", "User Register success..!", "success") 
           getAllUsers()
      })
      .catch(err => 
           Swal.fire("Register User Error",`${err}`, "warning"))

  }
  const updateUser = data => {
    const URL = `https://users-crud1.herokuapp.com/users/${updateInfo.id}/`
    axios.put(URL, data,{title:'React Hooks PUT Request Users'})
      .then(res => {
        swal.fire("Update User", "User Register success..!", "success") 
        getAllUsers()
      })
      .catch(err => Swal.fire("Upadte User Error",`${err}`, "warning"))
  }
  const {register, reset, handleSubmit,formState: { errors }} = useForm()

  
  const submit = data => {
    if(updateInfo){
      updateUser(data);setUpdateInfo()
    } else{
      createUser(data)
    }
    reset(defaultValue); handleCloseForm()
  }
  const resetFrmUser=()=>{
    reset(defaultValue)
    handleCloseForm()
    setUpdateInfo()
  }
const letHtmlImg=`<i className='fa-solid fa-user'></i>`;

  return (
    <div className='container-form'>
    <form onSubmit={handleSubmit(submit)} className='form' >
      <div onClick={resetFrmUser} className='form__equis'>x</div>
       <p>{updateInfo ? <i className="fas fa-3x fa-user-edit fa-color-icons"></i>:<i className="fas fa-2x fa-user-plus"></i>}
       <span className='span-task'>{updateInfo ? `${updateInfo.last_name}, ${updateInfo.first_name[0].split(" ")}.`:''}</span>
       </p>
      <div className="container-input">
        <i className="fa-solid fa-user"></i>
        <input type="text" id='first_name' className='input-first-name' placeholder='first name'
              {...register("first_name", {
                required:  {value:true,message: msg.required},
                minLength: {value: 1, message: msg.min_len},
                maxLength: {value: 25,message: msg.max_len},
                pattern:   {value: patterns.valid_name,message: msg.valid_name}
              })}
        />
       
        
        <input type="text" id='last_name' className='input-last-name'   placeholder='last name'
        {...register("last_name", {
          required:  {value:true,message: msg.required},
          minLength: {value: 1, message: msg.min_len},
          maxLength: {value: 25,message: msg.max_len},
          pattern:   {value: patterns.valid_name,message: msg.valid_name}
        })}
        />
     </div>
     <div className="container-input">
        <i className="fa-solid fa-calendar-days"></i>
        <input type="date" id='birthday' className='input-birthday' {...register("birthday", { required: true })}  />
    </div>      
     <div className="container-input">
        <i className="fa-solid fa-envelope"></i>
        <input type="email" id='email'  className='input-email' placeholder='email' 
        {...register("email", {
          required:  {value:true,message: msg.required},
          minLength: {value: 1, message: msg.min_len},
          maxLength: {value: 60, message: msg.max_len},
          pattern:   {value: patterns.email,message: msg.email}
        })}
         />
     </div>
     <div className="container-input">
        <i className="fa-solid fa-key"></i>
        <input type="password" id='password' className='input-password' placeholder='password'
           {...register("password", {
            required:  {value:true,required: msg.required},
            minLength: {value: 3, message: msg.min_len},
            maxLength: {value: 8, message: msg.max_len},
            pattern:   {value: patterns.password,message: msg.password}
          })}
        />
    </div>
          <button> { updateInfo ? 'Update User'  : 'Add User' }</button>
    </form>
    </div> 
  )
}
export default FrmUsers