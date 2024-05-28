import BooksDetail from "../../components/BooksDetail"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import Api from "../../api/Index"

const Details = () => {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)

    const { id } = useParams()

    useEffect (() => {
        setLoading(true)
        const fetchData = async () => {
            try {
                const response = await Api.get(`/detail-book/${id}`, {
                    headers: {
                        'Authorization': 'Bearer ' + localStorage.getItem('token'),
                    }
                })
                setData(response.data.data)
            } catch (error) {
                console.error("Error while fetching data: ", error)
            } finally {
                setLoading(false)
            }
        }

        fetchData()
    }, [id])

    return (
        loading ? (
            <div className="flex items-center justify-center h-screen">
                <span className="loading loading-ring loading-lg"></span>
            </div>
        ) : (
            data ? (
                <BooksDetail cover={data.cover} author={data.author} title={data.title} description={data.description} publisher={data.publisher} publishDate={data.publish_date} link="/books" />
            ) : (
                <div className="flex items-center justify-center h-screen">
                    No data
                </div>
            )
        )
    )
}

export default Details
