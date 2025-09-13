import TechIcons from '../models/TechIcons';

export default function Skills() {
  
  
  return (
    <section id="skills" className="min-h-screen flex items-center justify-center p-2 sm:p-4">
      <div className="glass backdrop-blur-3xl max-w-7xl py-6 w-full mx-auto flex flex-col items-center text-center">
        <h2 className="text-4xl md:text-5xl font-extrabold text-blue-400">Skills</h2>
        <p className="font-semibold text-lg sm:text-xl max-w-2xl mx-auto my-4">
          My core technologies, visualized in 3D
        </p>
        <div className="w-full flex flex-wrap justify-center sm:gap-6">
            <TechIcons/>
        </div>
      </div>
    </section>
  );
} 