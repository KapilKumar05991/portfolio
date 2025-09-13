import { projects } from "../constants/constants";
import Button from "./Button";


export default function Projects() {
    return (
        <section id="projects" className="min-h-screen flex items-center justify-center p-2 sm:p-4">
            <div className="glass backdrop-blur-3xl max-w-7xl w-full mx-auto p-4 md:p-6 flex flex-col items-center text-center">
                <h2 className="text-4xl md:text-5xl font-extrabold text-blue-400">Projects</h2>
                <p className="font-semibold text-lg sm:text-xl max-w-2xl mx-auto my-4">
                  A collection of projects that reflect my passion for technology and continuous learning.
                </p>
                <div className="w-full rounded-xl grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                    {projects.map((project, idx) => (
                        <div key={idx} className="glass border border-white/10 shadow-lg overflow-hidden flex flex-col">
                            <img
                                src={project.image}
                                alt={project.title}
                                className="sm:h-60 object-cover w-full"
                                loading="lazy"
                            />
                            <div className="p-4 flex flex-col flex-1 gap-1">
                                <h3 className="text-2xl font-bold">{project.title}</h3>
                                <p className="flex-1">{project.description}</p>
                                <div className="flex items-center justify-center gap-3 mt-auto">
                                    {project.github &&
                                    <Button size="small">
                                        <a
                                            href={project.github}
                                            target="_blank"
                                            className="hover:text-blue-400"
                                            >
                                            GitHub
                                        </a>
                                    </Button>}
                                    {project.demo && 
                                    <Button size="small">
                                        <a
                                            href={project.demo}
                                            target="_blank"
                                            className="hover:text-blue-400"
                                            >
                                            Visit
                                        </a>
                                    </Button>
                                    }
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
} 