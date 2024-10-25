import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { PostList } from './components/PostList'
import { PostDetail } from './components/PostDetail'
import './App.css'

function App () {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PostList />} />
        <Route path="/post/:id" element={<PostDetail />}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
