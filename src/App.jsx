import { useState } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import Manager from './components/Manager'
import './components/manager.css'
import './components/Allpasswordstyle.css'
import './components/responsive.css'
import './components/Footerstyle.css'
import Footer from './components/Footer'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      
      <div className="container">
        <Navbar />
        <div className="innercont">
        <p className='heading'>PassWord Manager</p>
        <Manager />
        </div>
      </div>
      <Footer />
      
    </>
  )
}

export default App
