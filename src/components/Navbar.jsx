import React, { useState } from 'react'
import LoginModal from './LoginModal'

export default function Navbar(){
  const [open, setOpen] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const scrollTo = (id) => {
    const el = document.getElementById(id)
    if(el) el.scrollIntoView({ behavior: 'smooth' })
    setMobileOpen(false)
  }

  return (
    <header className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur z-50 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="font-bold text-xl text-primary">KL UNIVERSITY</div>
        <nav className="hidden md:flex gap-4 items-center">
          <button onClick={()=>scrollTo('home')} className="link">HOME</button>
          <button onClick={()=>scrollTo('clubs')} className="link">CLUBS & EVENTS</button>
          <button onClick={()=>scrollTo('gallery')} className="link">GALLERY</button>
          <button onClick={()=>scrollTo('notices')} className="link">NOTICES</button>
          <button onClick={()=>scrollTo('contact')} className="link">CONTACT</button>
          <button onClick={()=>scrollTo('participation')} className="link">CHECK PARTICIPATION</button>
          <button onClick={()=>setOpen(true)} className="px-3 py-1 bg-primary text-white rounded">LOGIN</button>
        </nav>

        {/* Mobile: toggle menu */}
        <div className="md:hidden">
          <button onClick={()=>setMobileOpen(v=>!v)} className="px-3 py-1 bg-primary text-white rounded">Menu</button>
        </div>
      </div>

      {/* Mobile menu dropdown */}
      {mobileOpen && (
        <div className="md:hidden bg-white shadow-sm">
          <div className="max-w-6xl mx-auto px-4 py-3 flex flex-col gap-2">
            <button onClick={()=>scrollTo('home')} className="text-left link">HOME</button>
            <button onClick={()=>scrollTo('clubs')} className="text-left link">CLUBS & EVENTS</button>
            <button onClick={()=>scrollTo('gallery')} className="text-left link">GALLERY</button>
            <button onClick={()=>scrollTo('notices')} className="text-left link">NOTICES</button>
            <button onClick={()=>scrollTo('contact')} className="text-left link">CONTACT</button>
            <button onClick={()=>scrollTo('participation')} className="text-left link">CHECK PARTICIPATION</button>
            <div className="pt-2">
              <button onClick={()=>{ setOpen(true); setMobileOpen(false) }} className="w-full px-3 py-2 bg-primary text-white rounded">LOGIN</button>
            </div>
          </div>
        </div>
      )}

      <LoginModal open={open} setOpen={setOpen} />
    </header>
  )
}
