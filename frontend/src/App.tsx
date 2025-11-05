import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './Login'
import Protected from './Protected'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/protected" element={<Protected />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
