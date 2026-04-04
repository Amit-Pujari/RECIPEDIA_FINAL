import React, { useEffect, useState } from 'react'
import Modal from './Modal'
import InputForm from './InputForm'
import { NavLink } from 'react-router-dom'
import { motion } from 'framer-motion'

export default function Navbar() {
  const [modalOpen, setModalOpen] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  let token = localStorage.getItem("token")
  const [isLogin, setIsLogin] = useState(token ? false : true)
  let user = JSON.parse(localStorage.getItem("user"))

  useEffect(()=>{
    setIsLogin(token ? false : true)
  },[token])

  const checkLogin = () => {
    if (token) {
      localStorage.removeItem("token")
      localStorage.removeItem("user")
      setIsLogin(true)
    } else {
      setModalOpen(true)
    }
  }

  return (
    <>
        <header>
            <h2>Recipedia</h2>
            <ul>
                <li><NavLink to="/" className={({ isActive }) => isActive ? 'active' : ''}>Home</NavLink></li>
                <li><NavLink to="/myRecipe" className={({ isActive }) => isActive ? 'active' : ''}>My Recipes</NavLink></li>
                <li><NavLink to="/favRecipe" className={({ isActive }) => isActive ? 'active' : ''}>Favourites</NavLink></li>
                <li><p className='login' onClick={checkLogin}>{isLogin ? 'Login' : `Logout (${user?.email})`}</p></li>
            </ul>
            <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
              <span></span>
              <span></span>
              <span></span>
            </div>
        </header>
        <motion.div 
          className={`nav-mobile ${menuOpen ? 'open' : ''}`}
          initial={{ x: '100%' }}
          animate={{ x: menuOpen ? 0 : '100%' }}
          transition={{ type: 'spring', bounce: 0.3 }}
        >
          <ul>
            <li><NavLink to="/" onClick={() => setMenuOpen(false)} className={({ isActive }) => isActive ? 'active' : ''}>Home</NavLink></li>
            <li><NavLink to="/myRecipe" onClick={() => setMenuOpen(false)} className={({ isActive }) => isActive ? 'active' : ''}>My Recipes</NavLink></li>
            <li><NavLink to="/favRecipe" onClick={() => setMenuOpen(false)} className={({ isActive }) => isActive ? 'active' : ''}>Favourites</NavLink></li>
            <li><p className='login' onClick={() => { checkLogin(); setMenuOpen(false); }} >{isLogin ? 'Login' : `Logout (${user?.email})`}</p></li>
          </ul>
        </motion.div>
       { modalOpen && <Modal onClose={() => setModalOpen(false)}><InputForm setIsOpen={() => setModalOpen(false)} /></Modal>}
    </>
  )
}
