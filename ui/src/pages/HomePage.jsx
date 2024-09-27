import { useContext, useState } from "react"
import { useNavigate } from "react-router-dom"
import Modal from "../components/Modal"
import { useForm } from "react-hook-form"
import api from "../api/server"
import { IoClose } from "react-icons/io5"
import { AuthContext } from "../context/AuthContext"

const HomePage = () => {
  const navigate = useNavigate()
  const [modal, setModal] = useState(false)
  const [users, setUsers] = useState([])
  const { dispatch } = useContext(AuthContext)

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm()

  const searchUsers = async (inp) => {
    const response = await api.get(`/users`)
    const filteredData = response.data.data.filter(user => user.firstname === inp.users)
    setUsers(filteredData)
  }

  const handleLogOut = () => {
    dispatch({ type: "LOGOUT" })
  }

  return (
    <div className="w-[100%] h-[100vh] flex items-center justify-center">
      <div className="w-[80%] h-[40%] m-auto rounded-[16px] border border-[#fff] border-solid bg-[#ffffff33] flex items-center py-[10px] px-[20px]">
        <div className="w-[100%] flex flex-col gap-[6px] mx-auto">
          <button
            onClick={() => setModal(true)}
            className="w-[100%] text-[#111] border border-solid border-[#fff] bg-[#ffffff99] hover:bg-[#ffffffcc] font-bold rounded-[6px] py-[4px] px-[14px]">Search users</button>
          <button
            onClick={() => navigate("/profile")}
            className="w-[100%] text-[#111] border border-solid border-[#fff] bg-[#ffffff99] hover:bg-[#ffffffcc] font-bold rounded-[6px] py-[4px] px-[14px]">Profile</button>
          <button
            onClick={handleLogOut}
            className="w-[100%] border border-solid border-[#f00] bg-[#ff000099] hover:bg-[#ff0000cc] font-bold rounded-[6px] py-[4px] px-[14px]">Log out</button>
        </div>
      </div>
      {modal && (
        <>
          <Modal isOpen={modal} onRequestClose={() => setModal(false)} width={"100%"} height={"100%"} top={"50%"} bottom={"0"}>
            <div className="w-[100%] h-[100%]">
              <form
                onSubmit={handleSubmit(searchUsers)}
                className="w-[100%] h-[40%] flex flex-col justify-around">
                <div className="w-[100%] h-auto flex items-center justify-between">
                  <h2 className="text-[26px] font-bold text-center">Search users</h2>
                  <IoClose onClick={() => setModal(false)} size={26} />
                </div>
                <input
                  {...register("users", {
                    required: "Please fill user's first name"
                  })}
                  className="text-[#000] py-[4px] px-[8px] rounded-[6px] border-solid border border-[#fff] bg-[#ccc]"
                  placeholder="Fill user name..."
                  type="search"
                />
                <div className="w-[100%] h-[26px] text-[red]">
                  {errors.users?.message}
                </div>
                <button className="w-[100%] text-[#000] h-auto bg-[#ccc] rounded-[6px] p-[4px] font-semibold hover:bg-[#fff]">Search</button>
              </form>
              <div className="w-[100%] h-[60%] flex flex-col">
                {users.length !== 0 ? (
                  <>
                    {users.map(user => (
                      <div className="w-[100%] h-auto py-[6px] px-[10px] border border-solid" key={user.id}>
                        <div className="w-[100%] h-auto flex flex-row justify-between">
                          <div className="flex text-[16px] gap-[4px]">
                            <p>{user.firstname}</p>
                            <p>{user.lastname}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </>
                ) : (
                  <h2 className="m-auto text-[26px] font-semibold">Not have some user</h2>
                )}
              </div>
            </div>
          </Modal>
        </>
      )}
    </div>
  )
}

export default HomePage