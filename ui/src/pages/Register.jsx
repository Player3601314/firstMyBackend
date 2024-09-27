import { IoEyeSharp } from "react-icons/io5"
import api from "../api/server"
import { useForm } from "react-hook-form"
import { FaEyeSlash } from "react-icons/fa"
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
// import { v4 } from "uuid"

const Register = () => {
  const [show, setShow] = useState(false)
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const onSubmit = async (data) => {
    const userData = {
      firstname: data.firstName,
      lastname: data.lastName,
      email: data.email,
      password: data.password,
      date_of_birth: data.birthDate
    }

    const response = await api.post("/auth/register", userData)

    localStorage.setItem("token", JSON.stringify(response.data.token))
    window.location.reload()
    navigate("/")
  }

  return (
    <div className="w-[100%] h-[100vh] flex items-center justify-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-[80%] h-[80%] p-[14px] rounded-[6px] flex flex-col items-center border border-solid">
        <h2 className="text-[26px] font-bold mb-[20px]">Sign Up</h2>
        <input
          {...register("firstName", {
            required: "Please fill your name"
          })}
          className="w-[100%] h-auto py-[4px] px-[8px] rounded-[6px] text-[#000]"
          type="text"
          placeholder="First Name"
        />
        <div className="w-[100%] h-[24px] text-[red]">
          {errors.firstName?.message}
        </div>

        <input
          {...register("lastName", {
            required: "Please fill your last name"
          })}
          className="w-[100%] h-auto py-[4px] px-[8px] rounded-[6px] text-[#000]"
          type="text"
          placeholder="Last Name"
        />
        <div className="w-[100%] h-[24px] text-[red]">
          {errors.lastName?.message}
        </div>

        <input
          {...register("birthDate", {
            required: "Please fill your birth date",
          })}
          className="w-[100%] h-auto py-[4px] px-[8px] rounded-[6px] text-[#000]"
          type="date"
        />
        <div className="w-[100%] h-[24px] text-[red]">
          {errors.birthDate?.message}
        </div>

        <input
          {...register("email", {
            required: "Please enter your email",
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: "Invalid email address",
            },
          })}
          className="w-[100%] h-auto py-[4px] px-[8px] rounded-[6px] text-[#000]"
          type="email"
          placeholder="Email"
        />
        <div className="w-[100%] h-[24px] text-[red]">
          {errors.email?.message}
        </div>

        <input
          {...register("password", {
            required: "Password is required",
            minLength: {
              value: 8,
              message: "Password must be at least 8 characters",
            },
          })}
          className="w-[100%] h-auto py-[4px] px-[8px] rounded-[6px] text-[#000]"
          type={show === false ? "password" : "text"}
          autoComplete="new-password"
          placeholder="Password"
        />
        <div className="w-[100%] h-[24px] text-[red]">
          {errors.password?.message}
        </div>
        <div className="w-[20px] h-[20px] relative mt-[-50px] ml-[80%]">
          {show ? (
            <IoEyeSharp onClick={() => setShow(!show)} className="w-[20px] h-auto z-20" color="#000" fill="#000" />
          ) : (
            <FaEyeSlash onClick={() => setShow(!show)} className="w-[20px] h-auto z-20" color="#000" fill="#000" />
          )}
        </div>
        <div className="mt-[20px] underline font-bold">
          <Link to={"/login"}>
            {"You have an account ?"}
          </Link>
        </div>
        <button
          className="w-[100%] mt-auto rounded-[6px] text-[#000] bg-[#ffcc] hover:bg-[#ffff] py-[6px] px-[14px]"
          type="submit"
        >
          Submit
        </button>
      </form>
    </div>
  )
}

export default Register
