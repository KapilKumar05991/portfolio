import {  useContext } from "react";
import { AppContext } from '../providers/AppProvider';
import Icon from "./Icon";




function TechIcons() {
    const { state } = useContext(AppContext)
    const icons = state.icons
 
    return (
        icons.map((icon: any, i: number) => (
            <div key={i} className="flex flex-col items-center">
                <h1 className='text-lg sm:text-2xl font-bold'>{icon.name}</h1>
                <Icon texture={icon.texture}/>
            </div>
        ))
    )
}

export default TechIcons