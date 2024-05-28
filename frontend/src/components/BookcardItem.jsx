/* eslint-disable react/prop-types */

const BookcardItem = ({title, image, description, link}) => {
    return (
        <div className="card card-compact w-80 bg-base-100 shadow-xl my-5">
            <figure>
                <img src={image} alt="Books"/>
            </figure>
            <div className="card-body">
                <h2 className="card-title">{title}</h2>
                <p>{description}</p>
                <div className="card-actions justify-end">
                    <a className="btn btn-primary text-white" href={link}>See Details</a>
                </div>
            </div>
        </div>
    )
}

export default BookcardItem
