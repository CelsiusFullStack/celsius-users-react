import axios from "axios";
import React from "react";
import Select from 'react-select'
import Swal from "sweetalert2";

const actions=[
    {label:"Delete",value:'del'},
    {label:"Update",value:'upd'},
    {icon: "fas fas-solid fa-user-plus"},
]
const CardUsers = ({ user, getAllUsers, setUpdateInfo, handleOpenForm }) => {

    const deleteUser = () => {
        const URL = `https://users-crud1.herokuapp.com/users/${user.id}/`
            axios.delete(URL)
            .then(res => {
                getAllUsers()
            })
            .catch(err => 
                Swal.fire("Delete User Error",`${err}`, "warning")
                )
    }

    const handledSelectAction=({value})=>{
        if (value === 'upd'){
            handleUpdateClick()
        }else if(value === 'del')
        Swal.fire({
            title: `Delete ${user.first_name}, ${user.last_name} sure ?`,
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, Remove it!'
          }).then((result) => {
            if (result.isConfirmed) {
                deleteUser()
                Swal.fire(
                    'Deleted!',
                    'User Profile has been deleted.',
                    'success'
                )
            }
          })    
    }

    const handleUpdateClick = () => {
        handleOpenForm()
        setUpdateInfo(user)
    }
return (
    <div className="card_container">
    <div class="card">
    <span className="pro">{`<GalactiCoders/>`}</span>
    <img className="round" src="https://ayudawp.com/wp-content/uploads/2014/02/usuario-registrado-1024x810.jpg" alt="user" />
    
    <h3>{user["first_name"]}</h3>
    <h3>{user["last_name"]}</h3>
    <h6><i className="fa-solid fa-calendar-days"></i> {user.birthday}</h6>
    <h6> <i className="fa-solid fa-envelope"></i> {user.email}</h6>
    <p>Task Api Crud - Academlo</p>
    <div className="buttons">
          <button className="danger">
            Remove
          </button>
          <button className="primary">
            Edit
          </button>
    </div>
    <div className="card__actions">
        <h6>Action</h6>
        <div className="select-actions" >
             <Select
                defaultValue={{label:'Action',value:'null'}}
                onChange={handledSelectAction}
                options={actions}
              />
        </div>
    </div>
    </div>
       </div>
);
};

export default CardUsers;