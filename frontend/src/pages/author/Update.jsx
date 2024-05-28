import { IoArrowBackOutline, IoLibrary } from "react-icons/io5"
import { FaBook, FaPenNib, FaCalendar } from "react-icons/fa"
import { useEffect, useState } from "react"
import Api from "../../api/Index"
import { useNavigate, useParams } from "react-router-dom"

const Update = () => {
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        author: "",
        publish_date: "",
        publisher: "",
    });

    const [cover, setCover] = useState(null);
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await Api.get(`update/${id}`, {
                    headers: {
                        "Authorization": "Bearer " + localStorage.getItem("token")
                    }
                });
                const data = response.data.data;
                setFormData({
                    title: data.title,
                    description: data.description,
                    author: data.author,
                    publish_date: data.publish_date,
                    publisher: data.publisher,
                });
                setCover(data.cover);
            } catch (error) {
                console.error("Error while fetching data: ", error);
            }
        };

        fetchData();
    }, [id]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleFileChange = (e) => {
        setCover(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const data = new FormData();
        for (const key in formData) {
            data.append(key, formData[key]);
        }

        if (cover && typeof cover !== 'string') {
            data.append('cover', cover);
        }

        try {
            await Api.post(`update-book/${id}`, data, {
                headers: {
                    "Authorization": "Bearer " + localStorage.getItem("token"),
                    "Content-Type": "multipart/form-data"
                }
            });
            navigate("/author");
        } catch (error) {
            console.error("Error while updating data: ", error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="card w-[500px] md:w-[700px] bg-base-100 shadow-2xl">
                <div className="ms-5">
                    <a href="/author">
                        <IoArrowBackOutline size={25} />
                    </a>
                </div>
                <form className="card-body items-center text-center" onSubmit={handleSubmit}>
                    <h2 className="card-title">Update Book</h2>
                    <div className="my-5 w-[320px] md:w-full md:px-5">
                        <label className="input input-bordered flex items-center gap-2 mb-5">
                            <FaBook size={20} className="opacity-70" />
                            <input 
                                className="grow" 
                                type="text" 
                                name="title" 
                                placeholder="Book Title" 
                                value={formData.title} 
                                onChange={handleChange} 
                                required
                            />
                        </label>
                        <textarea 
                            className="textarea textarea-bordered mb-4 w-full" 
                            name="description" 
                            placeholder="Book description" 
                            value={formData.description} 
                            onChange={handleChange} 
                            required
                        ></textarea>
                        <div className="md:grid md:grid-cols-2 md:gap-4">
                            <label className="input input-bordered flex items-center gap-2 mb-5">
                                <FaPenNib size={20} className="opacity-70" />
                                <input 
                                    className="grow" 
                                    type="text" 
                                    name="author" 
                                    placeholder="Author" 
                                    value={formData.author} 
                                    onChange={handleChange} 
                                    required
                                />
                            </label>
                            <label className="input input-bordered flex items-center gap-2 mb-5">
                                <IoLibrary size={20} className="opacity-70" />
                                <input 
                                    className="grow" 
                                    type="text" 
                                    name="publisher" 
                                    placeholder="Publisher" 
                                    value={formData.publisher} 
                                    onChange={handleChange} 
                                    required
                                />
                            </label>
                        </div>
                        <label className="input input-bordered flex items-center gap-2">
                            <FaCalendar size={20} className="opacity-70" />
                            <input 
                                className="grow" 
                                type="text" 
                                name="publish_date" 
                                placeholder="Tahun Terbit: tanggal-bulan-tahun" 
                                value={formData.publish_date} 
                                onChange={handleChange} 
                                required
                            />
                        </label>
                        <label className="form-control w-full">
                            <div className="label">
                                <span className="label-text">Cover</span>
                            </div>
                            <input 
                                className="file-input file-input-bordered w-full" 
                                name="cover" 
                                type="file" 
                                onChange={handleFileChange}
                            />
                        </label>
                    </div>
                    <div className="card-actions justify-end">
                        {loading ? (
                            <button className="btn btn-primary text-white mx-2" type="submit">
                                <span className="loading loading-ring loading-sm"></span>Update Book
                            </button>
                        ) : (
                            <button className="btn btn-primary text-white mx-2" type="submit">
                                Update Book
                            </button>
                        )}
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Update;
