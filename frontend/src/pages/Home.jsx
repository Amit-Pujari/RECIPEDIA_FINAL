import React, { useState } from 'react'
import foodRecipe from '../assets/foodRecipe.png'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import RecipeItems from '../components/RecipeItems'
import { useNavigate } from 'react-router-dom'
import Modal from '../components/Modal'
import InputForm from '../components/InputForm'

export default function Home() {
    const navigate = useNavigate()
    const [isOpen, setIsOpen] = useState(false)

    const addRecipe = () => {
        let token = localStorage.getItem("token")
        if (token)
            navigate("/addRecipe")
        else {
            setIsOpen(true)
        }
    }

    return (
        <>
<section className='home'>
            <motion.div 
              className="container"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
            >
                <motion.div 
                  className="left"
                  initial={{ x: -50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                >
                    <motion.h1 
                      className="headingStyle" 
                      initial={{ y: 30, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ duration: 0.8, delay: 0.4 }}
                    >Recipedia</motion.h1>
                    <motion.h5 
                      className="home-paragraph-text"
                      initial={{ y: 30, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ duration: 0.8, delay: 0.6 }}
                    >
                    Recipedia is a culinary platform that helps users discover, save, and manage their favorite recipes effortlessly. Whether you're a home cook or a professional chef, our app simplifies meal planning with step-by-step instructions, ingredient lists, and smart search features. Easily create, customize, and share your recipes while exploring a diverse collection of dishes. Recipedia makes cooking more organized and enjoyable!.
                    </motion.h5>
                    <motion.button 
                      onClick={addRecipe}
                      whileHover={{ scale: 1.05, boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 10px 10px -5px rgb(0 0 0 / 0.04)' }}
                      whileTap={{ scale: 0.95 }}
                      initial={{ y: 30, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ duration: 0.8, delay: 0.8 }}
                    >Share your recipe</motion.button>
                </motion.div>
                
                <motion.div 
                  className="right"
                  initial={{ x: 50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                >
                    <motion.img 
                      src={foodRecipe} 
                      alt="Recipe" 
                      className="hero-img"
                      whileHover={{ scale: 1.05, rotate: 2 }}
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.8, delay: 0.5 }}
                    />
                </motion.div>
            </motion.div>
            </section>
            {/* <div className='bg'>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#d4f6e8" fillOpacity="1" d="M0,32L40,32C80,32,160,32,240,58.7C320,85,400,139,480,149.3C560,160,640,128,720,101.3C800,75,880,53,960,80C1040,107,1120,181,1200,213.3C1280,245,1360,235,1400,229.3L1440,224L1440,320L1400,320C1360,320,1280,320,1200,320C1120,320,1040,320,960,320C880,320,800,320,720,320C640,320,560,320,480,320C400,320,320,320,240,320C160,320,80,320,40,320L0,320Z"></path></svg>
            </div> */}
            {(isOpen) && <Modal onClose={() => setIsOpen(false)}><InputForm setIsOpen={() => setIsOpen(false)} /></Modal>}
            <div className='recipe'>
                <RecipeItems />
            </div>
        </>
    )
}