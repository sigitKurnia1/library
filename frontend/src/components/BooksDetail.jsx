// eslint-disable-next-line react/prop-types
const BooksDetail = ({cover, author, title, description, publisher, publishDate, link}) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 mx-3">
            <div className="flex justify-center">
                <img className="rounded-lg w-[500px] shadow-lg" src={cover} alt="Stock"/>
            </div>
            <div className="mt-5 mx-7 md:mx-0 md:mt-1">
                <div className="text-gray-500 mb-0.5">{author}</div>
                <div className="mb-3 text-gray-600">{title}</div>
                <div className="mb-2 text-gray-600">{description}</div>
                <div className="text-sm breadcrumbs text-gray-500">
                    <ul>
                        <li>{publisher}</li>
                        <li>{publishDate}</li>
                    </ul>
                </div>
                <a className="btn btn-sm btn-secondary text-white mt-5" href={link}>Back</a>
            </div>
        </div>
    )
}

export default BooksDetail
