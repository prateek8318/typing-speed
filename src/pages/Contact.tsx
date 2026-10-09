import { Helmet } from 'react-helmet-async'
import { Mail, Send } from 'lucide-react'

export default function Contact() {
  return (
    <div className="max-w-3xl mx-auto w-full fade-in">
      <Helmet>
        <title>Contact - typingspeedpro</title>
      </Helmet>
      
      <div className="flex items-center space-x-3 mb-8">
        <Mail size={28} className="text-primary-500" />
        <h1 className="text-3xl font-black text-slate-200">Contact Us</h1>
      </div>
      
      <div className="bg-slate-800 p-8 rounded-xl border border-slate-700">
        <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
          <div>
            <label className="block text-slate-400 font-medium mb-2">Name</label>
            <input type="text" className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-slate-200 focus:outline-none focus:border-primary-500 transition-colors" placeholder="Your Name" />
          </div>
          <div>
            <label className="block text-slate-400 font-medium mb-2">Email</label>
            <input type="email" className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-slate-200 focus:outline-none focus:border-primary-500 transition-colors" placeholder="your@email.com" />
          </div>
          <div>
            <label className="block text-slate-400 font-medium mb-2">Message</label>
            <textarea className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-slate-200 focus:outline-none focus:border-primary-500 transition-colors h-32 resize-none" placeholder="How can we help?"></textarea>
          </div>
          <button type="submit" className="flex items-center space-x-2 bg-primary-500 hover:bg-primary-600 text-slate-900 font-bold py-3 px-6 rounded-lg transition-colors">
            <Send size={18} /> <span>Send Message</span>
          </button>
        </form>
      </div>
    </div>
  )
}