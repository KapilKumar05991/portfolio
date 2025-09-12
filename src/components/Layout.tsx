import { lazy, Suspense, useContext } from "react"
import { AppContext } from "../providers/AppProvider"

import Navbar from "./Navbar"
import Footer from "./Footer"
import About from "./About"
import Projects from "./Projects"
const Loader = lazy(() => import("./Loader"))
const Hero = lazy(() => import("./Hero"))
const Skills = lazy(() => import("./Skills"))
const Contact = lazy(() => import("./Contact"))

function Layout() {
    const context = useContext(AppContext)
    if (context?.state.loading) {
        return (<Suspense fallback={<div className="min-h-screen flex items-center justify-center"><span className="text-2xl italic animate-pulse">Loading...</span></div>}>
            <Loader />
        </Suspense>)
    }
    return (
        <div className="min-h-screen">
            <Navbar />
            <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><span className="text-2xl italic animate-pulse">Loading...</span></div>}>
                <Hero />
                <About />
                <Skills />
                <Projects />
                <Contact />
            </Suspense>
            <Footer />
        </div>
    )
}

export default Layout