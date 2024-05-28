import { MdEmail } from "react-icons/md"
import { FaKey } from "react-icons/fa"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import Api from "../api/Index"

const Login = () => {
    const [formdata, setFormData] = useState({
        email: "",
        password: "",
    })

    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    useEffect (() => {
        if (localStorage.getItem("token")) {
            navigate("/author")
            navigate(0)
        }
    }, [navigate])

    const handleChange = (e) => {
        setFormData({
            ...formdata,
            [e.target.name]: e.target.value
        })
    }

    const loginHandler = async (e) => {
        e.preventDefault()
        setLoading(true)

        try {
            const { data } = await Api.post("login-account", formdata)
            localStorage.setItem("token", data.token)
            navigate("/author")
            navigate(0)
        } catch (error) {
            console.error(error.response.data)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="card w-[400px] bg-base-100 shadow-2xl">
                <div className="card-body items-center text-center">
                    <h2 className="card-title">Sign in!</h2>
                    <form onSubmit={loginHandler}>
                        <div className="my-5 w-[320px]">
                            <label className="input input-bordered flex items-center gap-2 mb-5">
                                <MdEmail size={20} className="opacity-70" />
                                <input className="grow" type="email" name="email" value={formdata.email} onChange={handleChange} placeholder="Email"/>
                            </label>
                            <label className="input input-bordered flex items-center gap-2">
                            <FaKey size={20} className="opacity-70" />
                                <input className="grow" type="password" name="password" value={formdata.password} onChange={handleChange} placeholder="Password"/>
                            </label>
                        </div>
                        <div className="card-actions justify-center">
                            {
                                loading ? (
                                    <button className="btn btn-primary text-white mx-2">
                                        <span className="loading loading-ring loading-sm"></span>Sign in
                                    </button>
                                ) : (
                                    <button className="btn btn-primary text-white mx-2">
                                        Sign in
                                    </button>
                                )
                            }
                            <a className="btn mx-2" href="/sign-up">Sign up</a>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login
