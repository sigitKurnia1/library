import { MdEmail } from "react-icons/md"
import { FaKey, FaUser } from "react-icons/fa"
import { IoArrowBackOutline } from "react-icons/io5"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import Api from "../api/Index"

const Register = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
    })

    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    useEffect (() => {
        if (localStorage.getItem("token")) {
            navigate ("/author")
            navigate(0)
        }
    }, [navigate])

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const registerHandler = async (e) => {
        e.preventDefault()
        setLoading(true)

        const data = new FormData()
        for (const key in formData) {
            data.append(key, formData[key])
        }

        try {
            await Api.post("/create-account", data)
            navigate("/")
        } catch (error) {
            console.error("Error while creating accoutn: ", error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="card w-[400px] bg-base-100 shadow-2xl">
                <div className="mt-5 ms-5">
                    <a href="/">
                        <IoArrowBackOutline size={25} />
                    </a>
                </div>
                <div className="card-body items-center text-center">
                    <h2 className="card-title">Sign up!</h2>
                    <form onSubmit={registerHandler}>
                        <div className="my-5 w-[320px]">
                            <label className="input input-bordered flex items-center gap-2 mb-5">
                                <FaUser size={20} className="opacity-70" />
                                <input className="grow" type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Username"/>
                            </label>
                            <label className="input input-bordered flex items-center gap-2 mb-5">
                                <MdEmail size={20} className="opacity-70" />
                                <input className="grow" type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email"/>
                            </label>
                            <label className="input input-bordered flex items-center gap-2 mb-5">
                            <FaKey size={20} className="opacity-70" />
                                <input className="grow" type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Password"/>
                            </label>
                            <label className="input input-bordered flex items-center gap-2 mb-5">
                            <FaKey size={20} className="opacity-70" />
                                <input className="grow" type="password" name="password_confirmation" value={formData.password_confirmation} onChange={handleChange} placeholder="Retype password"/>
                            </label>
                            {/* <div className="form-control">
                            <label className="label cursor-pointer">
                                <span className="label-text">Publisher</span> 
                                <input type="radio" name="radio-10" className="radio checked:radio-primary" defaultChecked />
                            </label>
                            </div>
                            <div className="form-control">
                            <label className="label cursor-pointer">
                                <span className="label-text">Student</span> 
                                <input type="radio" name="radio-10" className="radio checked:radio-primary" />
                            </label>
                            </div> */}
                        </div>
                        <div className="card-actions justify-center">
                            {
                                loading ? (
                                    <button className="btn btn-primary text-white mx-2">
                                        <span className="loading loading-ring loading-sm"></span>Sign up
                                    </button>
                                ) : (
                                    <button className="btn btn-primary text-white mx-2">
                                        Sign up
                                    </button>
                                )
                            }
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Register
