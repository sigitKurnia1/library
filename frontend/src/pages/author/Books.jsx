import BookcardItem from "../../components/BookcardItem"
import { useState, useEffect } from "react"
import Api from "../../api/Index"

const Books = () => {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect (() => {
        setLoading(true)
        const fetchData = async () => {
            try {
                const response = await Api.get("/book-list", {
                    headers: {
                        "Authorization": "Bearer " + localStorage.getItem("token")
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
    }, [])

    return (
        loading ? (
            <div className="flex items-center justify-center h-screen">
                <span className="loading loading-ring loading-lg"></span>
            </div>
        ) : (
            data.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 justify-items-center">
                    {data.map((item, index) => (
                        <BookcardItem key={index} image={item.cover} title={item.title} description={item.description} link={`/details/${item.id}`}/>
                    ))}
                </div>
            ) : (
                <div className="flex items-center justify-center h-screen">
                    No data
                </div>
            )
        )
    )
}

export default Books
