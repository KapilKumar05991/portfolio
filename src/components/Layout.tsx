import { lazy, Suspense, useContext } from "react"
import { AppContext } from "../providers/AppProvider"

import Navbar from "./Navbar"
import Footer from "./Footer"
import About from "./About"
import { Loading } from "./Loading"

const Projects = lazy(() => import("./Projects"))
const Skills = lazy(() => import("./Skills"))
const Contact = lazy(() => import("./Contact"))
const Hero = lazy(() => import("./Hero"))
const Loader = lazy(() => import("./Loader"))

function Layout() {
    const { state } = useContext(AppContext)
    if (state.loading) {
        return (<Suspense fallback={<Loading/>}>
            <Loader />
        </Suspense>)
    }
    return (
        <div className="min-h-screen">
            <Navbar />
            <Hero />
            <About />
            <Skills />
            <Projects />
            <Contact />
            <Footer />
        </div>
    )
}

export default Layout