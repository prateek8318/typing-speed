import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center w-full min-h-[50vh] fade-in text-center font-mono">
      <Helmet>
        <title>404 // type.sys</title>
      </Helmet>
      
      <div className="text-red-500 mb-4 text-sm">ERR_FILE_NOT_FOUND</div>
      <h1 className="text-8xl font-black text-slate-200 mb-6 tracking-tighter">404</h1>
      <p className="text-slate-500 mb-8 max-w-md text-sm">
        The requested resource could not be located in the current directory tree.
      </p>
      
      <Link to="/" className="px-6 py-2 border border-slate-600 hover:border-slate-300 text-slate-400 hover:text-slate-200 text-xs transition-colors">
        RETURN_HOME
      </Link>
    </div>
  )
}