import { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import Button from './Button';
import { Phone } from 'lucide-react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';

const SERVICE_ID=import.meta.env.VITE_EMAIL_SERVICE_ID
const TEMPLATE_ID=import.meta.env.VITE_EMAIL_TEMPLATE_ID
const PUBLIC_KEY=import.meta.env.VITE_EMAIL_PUBLIC_KEY

function Telephone(props: any) {
  const { scene } = useGLTF('/model/scene.gltf');
  return <primitive object={scene} {...props} />;
}

export default function Contact() {
  const form = useRef<HTMLFormElement>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  const sendEmail = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);
    if (!form.current) return;
    emailjs
      .sendForm(
        SERVICE_ID,
        TEMPLATE_ID, 
        form.current,
        PUBLIC_KEY
    )
    .then(
        () => {
          setResult('Message sent success!');
          setTimeout(() => {
            setResult(null)
          },5000)
          setLoading(false);
          form.current?.reset();
        },
        (error) => {
          console.log(error)
          setResult('Failed to send. Please try again.');
          setLoading(false);
        }
      );
  };

  
  return (
    <>
      <section id="contact" className="min-h-screen flex items-center justify-center p-2 sm:p-4">
        <div className="glass max-w-7xl w-full mx-auto p-4 sm:p-6 flex flex-col items-center text-center">
          <h2 className="text-4xl md:text-5xl font-extrabold text-blue-400">Contact Me</h2>
          <p className="font-semibold text-lg sm:text-xl max-w-2xl mx-auto my-4">
              I'm always excited to work on new projects and share ideas - let’s get in touch.
          </p>
          <div className="w-full flex flex-col-reverse md:flex-row items-center md:items-stretch gap-10">
            {/* Left: Contact Form */}
            <div className="rounded-xl shadow-blue-200 border-t-2 border-t-blue-200 shadow-md p-4 sm:p-8 flex flex-col justify-center">
              <h2 className="text-2xl flex gap-2 items-center justify-center font-bold"><Phone className='mt-0.5' size={20} />Contact Me</h2>
              <h3 className="sm:text-lg text-neutral-400 mb-4 text-center font-medium">Feel free to reach out for collaboration or just to say hi.</h3>
              <form ref={form} onSubmit={sendEmail} className="flex flex-col gap-4">
                <input
                  type="text"
                  name="user_name"
                  placeholder="Your Name"
                  required
                  className="glass rounded-md px-4 py-2  placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <input
                  type="email"
                  name="user_email"
                  placeholder="Your Email"
                  required
                  className="glass rounded-md px-4 py-2  placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <textarea
                  name="message"
                  placeholder="Your Message"
                  required
                  rows={5}
                  className="glass resize-none rounded-md px-4 py-2  placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <Button
                  size='small'
                  disabled={loading}
                >
                  {loading ? 'Sending...' : 'Send Message'}
                </Button>
                {result && <p className={`mt-2 text-sm ${result.startsWith('Message') ? 'text-green-400' : 'text-red-400'}`}>{result}</p>}
              </form>
            </div>
            {/* Right: Telephone */}
            <div className="h-[380px] sm:h-[500px] bg-[#202526] border-4 rounded-md border-gray-400 flex w-full md:w-3/5 items-center justify-center">
              <div style={{ width: '100%', height: '100%' }}>
                <Canvas camera={{ position: [0,1,10], fov: 30 }}>
                  <ambientLight intensity={1.5} />
                  <directionalLight intensity={1} position={[2, 2, 2]} />
                  <Telephone
                   position={[0, 0, 1]}
                   scale={[12,12,12]}
                   />
                  <OrbitControls
                   minPolarAngle={Math.PI / 3}  // Lock vertical angle (X axis)
                   maxPolarAngle={Math.PI / 3}  // Lock vertical angle (X axis)
                   />
                </Canvas>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
} 