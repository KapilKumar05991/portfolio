import { Moon, Sun } from "lucide-react";
import { useContext, useState } from "react";
import { AppContext } from "../providers/AppProvider";


const OPTIONS = [
    {  label: "light", icon: <Sun size={20} /> },
    {  label: "dark", icon: <Moon size={20} /> },
];

function ThemeSwitcher() {
    const context = useContext(AppContext)
    const [selected, setSelected] = useState(context?.state.theme);
     const [index, setIndex] = useState(1);
     const translatePercent = index * 100;

    function toggleTheme(idx: number) {
        if(idx == 0) {
            context?.setState({... context?.state, theme: 'light'})
        } else {
            context?.setState({... context?.state, theme: 'dark'})
        }
        setIndex(idx)
        setSelected(context?.state.theme)
    }
    return (
        <div
            className="glass-container backdrop-blur-sm relative w-40 h-12 p-1 flex items-center"
            role="radiogroup"
        >
            <div
                className={`glass-bubble backdrop-blur-xs absolute top-0.5 h-10`}
                style={{
                    width: `calc(100% / ${OPTIONS.length} - 0.25rem)`,
                    transform: `translateX(${translatePercent}%)`,
                    transition: 'transform 420ms cubic-bezier(1,0,0.4,1)',
                    animation: index ? 'squish 420ms cubic-bezier(.2,.9,.2,1)' : undefined,
                }}
            />

            <div className="relative z-10 flex w-full">
                {OPTIONS.map((opt, idx) => (
                    <button
                        key={idx}
                        role="radio"
                        title={opt.label}
                        onClick={() => {toggleTheme(idx)}}
                        className={`flex-1 h-12 mx-1 rounded-full flex items-center justify-center transition-transform duration-200
                        ${selected != opt.label ? 'text-gray-900 dark:text-gray-100' : 'text-gray-500 dark:text-gray-300'}
                        ${selected != opt.label ? 'scale-100' : 'scale-95 hover:scale-105'}`}
                    >
                        {opt.icon}
                    </button>
                ))}
            </div>
        </div>
    )
}

export default ThemeSwitcher