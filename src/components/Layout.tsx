import { lazy, Suspense, useContext } from "react"
import { AppContext } from "../providers/AppProvider"

import Navbar from "./Navbar"
import Footer from "./Footer"
import About from "./About"
import { Loading } from "./Loading"
import Projects from "./Projects"
import Hero from "./Hero"
import Contact from "./Contact"

const Skills = lazy(() => import("./Skills"))
const Loader = lazy(() => import("./Loader"))

function Layout() {
    const { state } = useContext(AppContext)
    if (state.loading) {
        return (<Suspense fallback={<Loading />}>
            <Loader />
        </Suspense>)
    }
    return (
        <div className="font-primary min-h-screen">
            <Navbar />
            <Hero />
            <About />
            <Suspense fallback={<Loading />}>
                <Skills />
            </Suspense>
            <Projects />
            <Contact />
            <Footer />
        </div>
    )
}

export default Layout