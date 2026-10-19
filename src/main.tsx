import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { MotionConfig } from 'motion/react'
import '@fontsource/anton/latin-400.css'
import '@fontsource/inter/latin-400.css'
import '@fontsource/inter/latin-500.css'
import '@fontsource/inter/latin-600.css'
import '@fontsource/inter/latin-700.css'
import './index.css'
import App from './App'

createRoot(document.getElementById('root')!).render(<StrictMode><BrowserRouter><MotionConfig reducedMotion="user" transition={{ duration: .28, ease: 'easeOut' }}><App /></MotionConfig></BrowserRouter></StrictMode>)
