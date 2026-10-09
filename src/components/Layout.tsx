import { ReactNode } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Keyboard, Crown, Settings, User, Gamepad2 } from 'lucide-react'

export default function Layout({ children }: { children: ReactNode }) {
  const location = useLocation();
  
  const navIcon = (path: string, icon: ReactNode, label: string) => {
    const isActive = location.pathname === path;
    return (
      <Link 
        to={path} 
        className={`transition-colors duration-200 ${isActive ? 'text-white' : 'text-slate-500 hover:text-white'}`}
        title={label}
      >
        {icon}
      </Link>
    );
  };

  return (
    <div className="min-h-screen flex flex-col selection:bg-primary-500 selection:text-slate-900">
      
      <header className="px-6 py-8">
        <nav className="max-w-5xl mx-auto flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-3 text-slate-500 hover:text-white transition-colors group">
            <Keyboard size={32} className="text-primary-500" />
            <h1 className="text-3xl font-black tracking-tighter text-slate-500 group-hover:text-white transition-colors">
              typingspeed<span className="text-primary-500">pro</span>
            </h1>
          </Link>
          
          <div className="flex space-x-6">
            {navIcon('/', <Keyboard size={20} />, 'Test')}
            {navIcon('/game', <Gamepad2 size={20} />, 'Game')}
            {navIcon('/about', <Crown size={20} />, 'Leaderboard')}
            {navIcon('/contact', <Settings size={20} />, 'Settings')}
            {navIcon('/privacy-policy', <User size={20} />, 'Profile')}
          </div>
        </nav>
      </header>
      
      <main className="flex-1 max-w-5xl mx-auto w-full px-6 flex flex-col justify-center py-4">
        {children}
      </main>
      
      <footer className="px-6 py-6 mt-auto">
        <div className="max-w-5xl mx-auto flex justify-between items-center text-sm text-slate-500">
          <div className="flex space-x-4">
            <Link to="/contact" className="hover:text-white transition-colors">contact</Link>
            <Link to="/privacy-policy" className="hover:text-white transition-colors">privacy</Link>
          </div>
          <p>&copy; {new Date().getFullYear()} typingspeedpro</p>
        </div>
      </footer>
    </div>
  )
}