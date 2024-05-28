import axios from "axios"
import { useNavigate } from "react-router-dom"

const Navbar = () => {
    const token = localStorage.getItem("token")
    const navigate = useNavigate()

    const logoutHandler = async () => {
        try {
            axios.defaults.headers.common["Authorization"] = `Bearer ${token}`
            await axios.post("http://localhost:8000/api/account-logout")
            localStorage.removeItem("token")
            navigate("/")
            navigate(0)
        } catch (error) {
            console.error("Error during logout", error)
            navigate("/author")
        }
    }

    return (
        <div className="navbar bg-base-100">
            <div className="flex-1">
                <a className="btn btn-ghost text-xl" href="/author">
                    Library
                </a>
            </div>
            <div className="flex-none">
                <ul className="menu menu-horizontal px-1">
                    <li><a href="/books">Books</a></li>
                    <li><a onClick={logoutHandler}>Logout</a></li>
                </ul>
            </div>
        </div>
    )
}

export default Navbar
