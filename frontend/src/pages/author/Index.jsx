import { FiPlus } from "react-icons/fi"
import { RxHamburgerMenu } from "react-icons/rx"
import { RiPencilFill } from "react-icons/ri"
import { FaTrash } from "react-icons/fa"
import { PiMagnifyingGlassFill } from "react-icons/pi"
import { useState, useEffect } from "react"
import Api from "../../api/Index"
import { FaMagnifyingGlass } from "react-icons/fa6"
import { useNavigate } from "react-router-dom"

const Index = () => {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    const [search, setSearch] = useState("")
    const navigate = useNavigate()
    const token = localStorage.getItem("token")

    useEffect(() => {
        setLoading(true)
        const fetchData = async () => {
            try {
                const response = await Api.get("/book-list", {
                    headers: {
                        "Authorization": "Bearer " + token,
                    }
                })
                setData(response.data.data.data)
            } catch (error) {
                console.error("Error while fetching data: ", error)
            } finally {
                setLoading(false)
            }
        }

        fetchData()
    }, [token])

    useEffect (() => {
        if (!token) {
            navigate("/")
            navigate(0)
            return
        }
    })

    const deleteBook = async (id) => {
        try {
            await Api.get(`/delete-book/${id}`, {
                headers: {
                    "Authorization": "Bearer " + localStorage.getItem("token")
                }
            })
            setData(data.filter(book => book.id !== id))
        } catch (error) {
            console.error("Error while deleting data: ", error)
        }
    }

    const handleSearch = async (e) => {
        setSearch(e.target.value)
        setLoading(true)
        try {
            const response = await Api.get(`/search-book/${e.target.value}`, {
                headers: {
                    "Authorization": "Bearer " + localStorage.getItem("token")
                }
            })
            setData(response.data.data.data)
        } catch (error) {
            console.error("Error while searching data: ", error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <>
            <div className="grid grid-cols-2 place-items-center">
                <div className="w-full ms-5">
                <label className="input input-bordered flex items-center gap-2">
                    <input className="grow" type="text" name="search" placeholder="Search book by title" value={search} onChange={handleSearch}/>
                    <FaMagnifyingGlass className="text-slate-300" size={15} />
                </label>
                </div>
                <div className="ms-[180px] md:ms-[500px]">
                    <a className="btn btn-sm btn-primary text-white my-5" href="/add-book">
                        <FiPlus size={15} />
                        Book
                    </a>
                </div>
            </div>
            <div className="overflow-x-auto mx-3">
            <table className="table">
                <thead>
                    <tr>
                        <th>Cover</th>
                        <th>Title</th>
                        <th>Publish Date</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                {
                    loading ? (
                        <tr>
                            <td colSpan="4" className="text-center">
                            <span className="loading loading-ring loading-lg"></span>
                            </td>
                        </tr>                    ) : (
                        data.length > 0 ? (
                            data.map((item, index) => (
                                <tr key={index}>
                                    <td>
                                        <div className="avatar">
                                            <div className="rounded-sm w-12 h-12">
                                                <img src={item.cover} alt="Book Cover" />
                                            </div>
                                        </div>
                                    </td>
                                    <td>{item.title}</td>
                                    <td>{item.publish_date}</td>
                                    <td>
                                        <div className="dropdown dropdown-left dropdown-end">
                                            <div className="btn m-1" tabIndex={0} role="button">
                                                <RxHamburgerMenu size={15} />
                                            </div>
                                            <ul className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-32" tabIndex={0}>
                                                <li><a href={`/details/${item.id}`}><PiMagnifyingGlassFill />Detail</a></li>
                                                <li><a href={`/update-book/${item.id}`}><RiPencilFill />Edit</a></li>
                                                <li><a onClick={() => deleteBook(item.id)}><FaTrash />Delete</a></li>
                                            </ul>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="4" className="text-center">No data available</td>
                            </tr>
                        )
                    )
                }
                </tbody>
            </table>
        </div>
        </>
    )
}

export default Index
