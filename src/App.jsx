import { useEffect, useState } from 'react'
import axios from 'axios'
import CardUsers from './components/CardUsers'
import FrmUsers from './components/FrmUsers'
import './App.css'

function App() {
  const [Users, setUsers] = useState()
  const [updateInfo, setUpdateInfo] = useState()
  const [isFormOpen, setIsFormOpen] = useState(false)
  const getAllUsers = () => {
    const URL = 'https://users-crud1.herokuapp.com/users/'
    axios.get(URL)
      .then(res => setUsers(res.data))
      .catch(err => console.log(err))
  }
  useEffect(() => {
    getAllUsers()
    swal.fire("Information", "Use Button Action for Upatde/Remove and Button Corner Rigth to Refresh User List ", "info") 
  }, [])
  const handleRefresh = () => getAllUsers()
  const handleOpenForm = () => setIsFormOpen(true)
  const handleCloseForm = () =>{ 
      setIsFormOpen()
      setUpdateInfo()
  }
  return (
    <div className="App">
       <button onClick={handleRefresh} className="refresh-card-flotante"><i className="fas fa-1x fa-refresh"></i></button>
      <div className='header-fixed'>
          <button onClick={handleOpenForm}><i className="fas fa-2x  fa-solid fa-user-plus"></i></button>
      </div>
      <div className={isFormOpen ? 'form-container' : 'form-none'} >
        <FrmUsers
          getAllUsers={getAllUsers}
          updateInfo={updateInfo}
          setUpdateInfo={setUpdateInfo}
          handleCloseForm={handleCloseForm}
        />
      </div>

      <div className='card-container'>
        {
          Users?.map(user => (
            <CardUsers 
              key={user.id}
              user={user}
              getAllUsers={getAllUsers}
              setUpdateInfo={setUpdateInfo}
              handleOpenForm={handleOpenForm}
            />
          ))
        }
      </div>
    </div>
  )
}
export default App
