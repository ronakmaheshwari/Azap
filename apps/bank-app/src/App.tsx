import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Login from './pages/login'
import HdfcNetBanking from './pages/hdfc'
import Bank from './pages/bank'

function App() {


  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/hdfc' element={<Login />} />
          <Route path='/hdfcnetbank' element={<HdfcNetBanking />} />
           <Route path='/bank/:provider' element={<Bank />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
