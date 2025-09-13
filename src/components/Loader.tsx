import { motion } from 'framer-motion';
import { useContext, useEffect, useRef, useState } from 'react';
import { ICONS, TEXTURES } from '../constants/constants';
import ROCKET_GIF from '/rocket.gif';
import * as three from 'three'
import { AppContext } from '../providers/AppProvider';
import Button from './Button';

interface Assets {
    icons: any
    textures: any
}

function Loader() {
    const {state, setState } = useContext(AppContext)
    const [loading, setLoading] = useState(true);
    const [progress, setProgress] = useState(0);
    const assets = useRef<Assets>({icons: [],textures: []})
    const initialized = useRef(false)
    useEffect(() => {
        if(initialized.current) {
            return;
        }
        initialized.current = true;
        let loaded = 0;
        const total = TEXTURES.length + ICONS.length;
        const updateProgress = () => {
            loaded += 1;
            setProgress(Math.round((loaded / total) * 100));
            if (loaded === total) {
                setState({...state, icons: assets.current.icons, textures: assets.current.textures})
                setLoading(false);
            }
        };
        // Preload textures
        TEXTURES.forEach((texture) => {
            const tex = new three.TextureLoader();
            tex.load(texture.texture_path, (loadedTexture) => {
                assets.current.textures[texture.name] = loadedTexture
                updateProgress();
            }, undefined, updateProgress);
        });

        // Preload icon textures
        ICONS.forEach((icon) => {
            const tex = new three.TextureLoader();
            tex.load(icon.texture_path, (loadedTexture) => {
                assets.current.icons.push({ name: icon.name, texture: loadedTexture })
                updateProgress();
            }, undefined, updateProgress);
        });
    }, []);

    // Rocket animation range (in px, matches bar width)
    const barRef = useRef<HTMLDivElement>(null);
    const [barWidth, setBarWidth] = useState(65);
    const rocketWidth = 60;
    const rocketX = (progress / 100) * (barWidth - rocketWidth);

    const handleResize = () => {
        if (barRef.current) {
            setBarWidth(barRef.current.offsetWidth);
        }
    }
    useEffect(() => {
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <div className="z-50 h-screen p-4 flex flex-col items-center justify-center">
            <h1 className="text-5xl text-center font-extrabold text-blue-400 mb-8 drop-shadow-lg">Hi, Welcome Nice to meet you.</h1>
            {/* Progress Bar and Rocket */}
            <div ref={barRef} className="w-full h-20 max-w-xl mt-8 mb-4 relative overflow-hidden" >
                {/* Progress Bar Track */}
                <div className="w-full h-4 rounded-full overflow-hidden absolute top-1/2 left-0">
                    <div
                        className="h-4 bg-gradient-to-r from-yellow-300 via-orange-400 to-red-600 transition-all duration-300"
                        style={{ width: `${progress}%` }}
                    />
                </div>
                {/* Rocket GIF with Framer Motion */}
                <motion.div
                    className="absolute flex items-center"
                    style={{ top: '1%', left: 0, width: rocketWidth, height: 96, transform: 'translateY(-50%)', rotate: '90deg' }}
                    animate={{ x: rocketX }}
                    transition={{ type: 'spring', stiffness: 80, damping: 20 }}
                >
                    <img src={ROCKET_GIF} loading='lazy' alt="Rocket Animation" className="w-full h-full mx-auto" />
                </motion.div>
                {/* Percentage Text */}
                <div className="absolute left-1/2 top-[70%] transform -translate-x-1/2  text-lg font-bold">
                    {progress}%
                </div>
            </div>
            <Button
             onClick={() => {setState({...state,loading:false})}}
            >
                One More Click
            </Button>
            <p className="mt-8 text-center text-lg">
                {loading ? 'Please wait while we prepare your journey...' : 'Loading complete. Ready for launch!'}
            </p>
        </div>
    );
}

export default Loader