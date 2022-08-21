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
  const {register, reset, handleSubmit} = useForm()
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

  return (
    <div className='container-form'>
    <form onSubmit={handleSubmit(submit)} className='form' >
      <div onClick={resetFrmUser} className='form__equis'>x</div>
      <h2 >{updateInfo ? 'Update User':'Create New User'}</h2>
      <div className="container-input">
        <i className="fa-solid fa-user"></i>
        <input type="text" id='first_name' className='input-first-name' placeholder='first name' {...register("first_name")}/>
        <input type="text" id='last_name' className='input-last-name'   placeholder='last name'  {...register("last_name", { required: true })}/>
     </div>
     <div className="container-input">
        <i className="fa-solid fa-calendar-days"></i>
        <input type="date" id='birthday' className='input-birthday' {...register("birthday", { required: true })}  />
    </div>      
     <div className="container-input">
        <i className="fa-solid fa-envelope"></i>
        <input type="email" id='email'  className='input-email' placeholder='email' {...register("email", { required: true })}/>
     </div>
     <div className="container-input">
        <i className="fa-solid fa-key"></i>
        <input type="password" id='password' className='input-password' placeholder='password' {...register("password", { required: true })}/>
    </div>
          <button> { updateInfo ? 'Update' : 'Create' }</button>
    </form>
    </div> 
  )
}
export default FrmUsers