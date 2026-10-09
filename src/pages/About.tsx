import { Helmet } from 'react-helmet-async'
import { Info } from 'lucide-react'

export default function About() {
  return (
    <div className="max-w-3xl mx-auto w-full fade-in">
      <Helmet>
        <title>About Us | Typing Speed Pro</title>
        <meta name="description" content="Learn about Typing Speed Pro, a minimalist typing test platform designed to help you focus and increase your WPM through distraction-free practice." />
      </Helmet>
      
      <div className="flex items-center space-x-3 mb-8">
        <Info size={28} className="text-primary-500" />
        <h1 className="text-3xl font-black text-slate-200">About typingspeedpro</h1>
      </div>
      
      <div className="space-y-6 text-slate-400 text-lg leading-relaxed bg-slate-800 p-8 rounded-xl border border-slate-700">
        <p>
          Welcome to <span className="font-bold text-slate-200">typingspeedpro</span>, a minimalist typing test application designed for pure focus and performance.
        </p>
        <p>
          Our platform is built to help you improve your typing speed and accuracy without unnecessary distractions. Just raw metrics and a smooth typing experience.
        </p>
        <p>
          Whether you're practicing for an exam or just want to increase your daily productivity, we provide the tools you need to track your progress over time.
        </p>
      </div>
    </div>
  )
}