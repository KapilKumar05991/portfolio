import Navbar from "./Navbar"
import Loader from "./Loader"
import { useContext } from "react"
import { AppContext } from "../providers/AppProvider"
import Hero from "./Hero"
import About from "./About"
import Skills from "./Skills"
import Footer from "./Footer"
import Projects from "./Projects"
import Contact from "./Contact"

function Layout() {
    const context = useContext(AppContext)
    if(context?.state.loading) {
        return <Loader/>
    }
    return (
        <div className="min-h-screen">
            <Navbar/>
            <Hero/>
            <About/>
            <Skills/>
            <Projects/>
            <Contact/>
            <Footer/>
        </div>
    )
}

export default Layout