import { useEffect, useState } from 'react';
import api from '../api/server';
import profileIMG from "../assets/profileIMG.png";
import { useNavigate } from "react-router-dom";
import Modal from '../components/Modal';
import { useForm } from "react-hook-form";

const Profile = () => {
  const [user, setUser] = useState({});
  const [modal, setModal] = useState(false);
  const [inputTypes, setInputTypes] = useState(true);
  const navigate = useNavigate();
  const [show, setShow] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue
  } = useForm();

  useEffect(() => {
    api.get('/auth')
      .then(response => {
        setUser(response.data.data); // Foydalanuvchi ma'lumotlarini statega saqlash
      })
      .catch(error => {
        console.error('Xato:', error.response?.data || error.message); // Xatoni chiqarish
      });
  }, []);

  console.log(user);

  const handleUpdateName = (inp) => {
    console.log(inp)
    console.log(errors);

  }

  return (
    <div className='w-[100%] h-[100vh] p-[20px]'>
      <div className='w-[100%] h-auto flex flex-col'>
        <div className='w-[100%] h-auto flex justify-between'>
          <div className='text-[24px] font-semibold flex gap-[14px]'>
            <p onClick={() => navigate("/")}>{"<"}</p>
            <h2>Your Profile</h2>
          </div>
          <div className='text-[24px] font-semibold'>
            <p>{"/>"}</p>
          </div>
        </div>
        <div className='my-[20px] flex justify-between'>
          <div className='w-[80px] h-[80px]'>
            <img className='w-[100%] h-[100%] rounded-full' src={user.imgURL === null || user.imgURL === "" ? profileIMG : user.imgURL} alt="" />
          </div>
          <div>
            <div>
              <h2 className='text-[20px] font-semibold'>{user.firstname ?? "Loading ..."}</h2>
            </div>
            <div>
              <h2 className='text-[20px] font-semibold'>{user.lastname ?? "Loading ..."}</h2>
            </div>
            <div>
              <p className='text-[16px] font-medium'>{user.email ?? "Loading ..."}</p>
            </div>
          </div>
        </div>
        <div className='w-[100%] h-auto mt-[20px] flex items-center justify-center'>
          <button
            onClick={() => {
              setModal(!modal)
              setValue("name", "test")
            }}
            className='w-[100%] h-[100%] py-[4px] px-[14px] font-bold rounded-[6px] bg-[#fff] text-[#000]'>Edit your profile</button>
        </div>
        <div className='w-[100%] h-auto my-[20px] px-[12px] flex justify-between border-t border-solid border-[rgba(255,255,255,.2)]'>
          <button>All</button>
          <button>Photo</button>
          <button>Video</button>
        </div>
      </div>
      {modal && (
        <Modal width={"100%"} height={"100vh"} top={"50%"} isOpen={modal} onRequestClose={() => { }}>
          <div className='w-[100%] h-[40px] border-b border-solid border-[#fff6] text-center flex justify-between items-center'>
            <button onClick={() => setInputTypes(true)} className={`w-[50%] h-[100%] rounded-[6px_0px_0px_0px] ${inputTypes === true ? "bg-[#fff6] hover:bg-[#fff8]" : "bg-[#fff0] hover:bg-[#fff1]"}`}>Name</button>
            <button onClick={() => setInputTypes(false)} className={`w-[50%] h-[100%] rounded-[0px_6px_0px_0px] ${inputTypes === false ? "bg-[#fff6] hover:bg-[#fff8]" : "bg-[#fff0]"}`}>Password</button>
          </div>
          <div className='w-[100%]'>
            {inputTypes === true ? (
              <div>
                <form onSubmit={handleSubmit(handleUpdateName)} className='w-[100%] h-auto my-[20px] flex flex-col gap-[14px] items-center'>
                  <h2 className='text-[26px] font-semibold text-center mg-[20px]'>Update your name or last name</h2>
                  <input
                    className='w-[100%] py-[4px] px-[8px] rounded-[6px] text-[#000]' placeholder='Enter your name...'
                    type="text"
                    {...register("name", {
                      required: "Please, fill your name"
                    })}
                  />
                  <input
                    className='w-[100%] py-[4px] px-[8px] rounded-[6px] text-[#000]' placeholder='Enter your lastname...'
                    type="text"
                    {...register("lastName", {
                      required: "Please, fill your lastname"
                    })}
                  />
                  <input
                    className='w-[100%] py-[4px] px-[8px] rounded-[6px] text-[#000]'
                    type="date"
                    {...register("birthDate", {
                      required: "Please, fill your birth date"
                    })}
                  />
                  <button className='w-[100%] py-[4px] px-[8px] bg-[#fff] text-[#000] mt-[20px] rounded-[6px] text-center'>Update</button>
                </form>
              </div>
            ) : (
              <div>
                <form className='w-[100%] h-auto my-[20px] flex flex-col gap-[14px] items-center'>
                  <h2 className='text-[26px] font-semibold text-center'>Update your password</h2>
                  <input
                    className='w-[100%] py-[4px] px-[8px] rounded-[6px] text-[#000]' placeholder='Enter your last password...'
                    type={`${show === false ? "password" : "text"}`}
                  />
                  <input
                    className='w-[100%] py-[4px] px-[8px] rounded-[6px] text-[#000]' placeholder='Enter your new password...'
                    type={`${show === false ? "password" : "text"}`}
                  />
                  <input
                    className='w-[100%] py-[4px] px-[8px] rounded-[6px] text-[#000]'
                    placeholder='Confirm your new password...'
                    type={`${show === false ? "password" : "text"}`}
                  />
                  <div className='w-[100%] py-[8px] px-[14px] flex flex-row gap-[20px] items-center'>
                    <input
                      checked={show}
                      type="checkbox"
                      onChange={() => setShow(!show)} // Handle checkbox change
                    />
                    <p className='text-[16px] font-bold'>Show your password</p>
                  </div>
                  <button className='w-[100%] py-[4px] px-[8px] bg-[#ccc] hover:bg-[#fff] text-[#000] mt-[20px] rounded-[6px] text-center font-bold'>Update</button>
                </form>
              </div>
            )}
          </div>
        </Modal >
      )}
    </div >
  );
};

export default Profile;
