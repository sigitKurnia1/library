import BookcardItem from "./BookcardItem"
import shoes from "../assets/shoes.jpg"

const Bookcard = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 justify-items-center">
            <BookcardItem image={shoes} title="Shoes" description="This is my shoe" />
            <BookcardItem image={shoes} title="Shoes" description="This is my shoe" />
            <BookcardItem image={shoes} title="Shoes" description="This is my shoe" />
            <BookcardItem image={shoes} title="Shoes" description="This is my shoe" />
            <BookcardItem image={shoes} title="Shoes" description="This is my shoe" />
        </div>
    )
}

export default Bookcard
