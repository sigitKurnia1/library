import { Outlet } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'

const App = () => {
    const showNavFooter = !["/", "/sign-up"].includes(location.pathname)

    return (
      <div className="flex flex-col h-screen justify-between">
        { showNavFooter && <Navbar /> }
        <Outlet />
        { showNavFooter && <Footer /> }
      </div>
    )
}

export default App
