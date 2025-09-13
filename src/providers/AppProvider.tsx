import { createContext, useEffect, useState, type ReactNode } from "react";



export const AppContext = createContext<any>(null)

interface AppProviderProp {
    children: ReactNode
}

function AppProvider({ children }: AppProviderProp) {
    const [state, setState] = useState({
        theme: 'dark',
        icons: null,
        textures: null,
        loading: true
    })
    
    useEffect(() => {
        const root = window.document.documentElement
        if(state.theme ==  'dark') {
            root.classList.add('dark')
        } else {
            root.classList.remove('dark')
        }
    }, [state.theme])
    
    return (
        <AppContext.Provider value={{ state, setState }}>
            {children}
        </AppContext.Provider>
    )
}

export default AppProvider