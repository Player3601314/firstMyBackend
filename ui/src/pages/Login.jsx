import { IoEyeSharp } from "react-icons/io5"
import api from "../api/server"
import { useForm } from "react-hook-form"
import { FaEyeSlash } from "react-icons/fa"
import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
// import { v4 } from "uuid"

const Login = () => {
  const [show, setShow] = useState(false)
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const onSubmit = async (data) => {
    const userData = {
      email: data.email,
      password: data.password
    }

    const response = await api.post("/auth/login", userData)

    console.log(response.data);

    localStorage.setItem("token", JSON.stringify(response.data.token))
    window.location.reload()
    navigate("/")
  }

  return (
    <div className="w-[100%] h-[100vh] flex items-center justify-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-[80%] p-[14px] flex flex-col gap-[14px] items-center border border-solid rounded-[6px]">
        <h2 className="text-[26px] font-bold">Login</h2>
        <input
          {...register("email", {
            required: "Please enter your email",
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: "Invalid email address",
            },
          })}
          className="w-[100%] h-auto mt-auto py-[4px] px-[8px] rounded-[6px] text-[#000]"
          type="email"
          placeholder="Email"
        />
        <div className="w-[100%] h-[24px] mt-[-10px] text-[red]">
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
          className="w-[100%] h-auto mt-[-16px] py-[4px] px-[8px] rounded-[6px] text-[#000]"
          type={show === false ? "password" : "text"}
          autoComplete="new-password"
          placeholder="Password"
        />
        <div className="w-[100%] h-[24px] mt-[-10px] text-[red]">
          {errors.password?.message}
        </div>
        <div className="w-[20px] h-[20px] relative mt-[-67px] ml-[80%]">
          {show ? (
            <IoEyeSharp onClick={() => setShow(!show)} className="w-[20px] h-auto z-20" color="#000" fill="#000" />
          ) : (
            <FaEyeSlash onClick={() => setShow(!show)} className="w-[20px] h-auto z-20" color="#000" fill="#000" />
          )}
        </div>
        <div className="mt-[20px] underline font-bold">
          <Link to={"/register"}>
            {"You haven't an account ?"}
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

export default Login
