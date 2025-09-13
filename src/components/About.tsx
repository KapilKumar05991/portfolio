export default function About() {
  return (
    <section id="about" className="flex items-center justify-center p-2 sm:p-4">
      <div className="max-w-7xl backdrop-blur-3xl glass w-full mx-auto p-4 sm:p-8 flex flex-col md:flex-row items-center justify-center gap-12">
        <div className="flex-1 flex flex-col items-center text-center lg:items-start lg:text-left">
          <h2 className="text-4xl md:text-5xl font-extrabold text-blue-400 mb-6">About Me</h2>
          <p className="sm:text-lg md:text-xl  mb-6 max-w-2xl">
            As a full-stack developer, I specialize in creating robust web solutions using modern technologies. I’m driven by curiosity and a commitment to best practices, constantly refining my skills and staying updated with the latest trends to build scalable, efficient, and engaging digital products
          </p>
          <ul className=" text-base md:text-lg space-y-2">
            <li>🌍 Based in: <span className="font-semibold">Meerut U.P, India</span></li>
            <li>💻 Favorite Stack: <span className="font-semibold">React, Next.js, TypeScript, Node.js</span></li>
            <li>🎨 Hobbies: <span className="font-semibold">Build & Deploy, Tech Exploration, Gaming</span></li>
          </ul>
        </div>

        <div className="md:w-2/5 w-full">
          <h1 className='text-xl sm:text-2xl font-semibold'>Education</h1>
          <div className='my-2 flex sm:text-lg justify-between'>
            <p>Bachelor of Computer Science</p>
            <span>2022 - 2025</span>
          </div>
          <div className='sm:text-lg flex flex-col gap-4'>
            <span className='flex gap-4 items-center'>
              <img className='bg-black rounded-full size-8' src="/github-mark-white.png" alt="github_link" />
              <a className='text-blue-400' target="_blank" href="http://github.com/kapilkumar05991">Github/KapilKumar05991</a>
            </span>
            <span className='flex gap-4 items-center'>
              <img className=' size-8' src="/linkedin.png" alt="github_link" />
              <a className='text-blue-400' target="_blank" href="https://www.linkedin.com/in/kapilkumar05991/">Linkedin/KapilKumar05991</a>
            </span>
            <span className='flex gap-4 items-center'>
              <img className='bg-white rounded-sm size-8' src="/twitter.png" alt="github_link" />
              <a className='text-blue-400' target="_blank" href="https://x.com/KapilKumar_1">X/KapilKumar_1</a>
            </span>
            <span className='flex gap-4 items-center'>
              <img className='rounded-sm size-8' src="/gmail.png" alt="github_link" />
              <a className='text-blue-400' href="mailto:kapilkumar05991@gmail.com">KapilKumar05991@gmail.com</a>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
} 