import { createBrowserRouter } from "react-router-dom"
import Login from "../pages/Login"
import Register from "../pages/Register"
import Index from "../pages/author/Index"
import App from "../App"
import Books from "../pages/author/Books"
import Create from "../pages/author/Create"
import Details from "../pages/author/Details"
import Update from "../pages/author/Update"

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            { path: "/", element: <Login /> },
            { path: "/sign-up", element: <Register /> },
            { path: "/author", element: <Index /> },
            { path: "/books", element: <Books /> },
            { path: "/add-book", element: <Create /> },
            { path: "/details/:id", element: <Details /> },
            { path: "/update-book/:id", element: <Update /> },
        ]
    }
])

export default router