import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/layout/Layout'
import HomePage from './pages/HomePage'
import ReadingPage from './pages/ReadingPage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="readings/:week/:slug" element={<ReadingPage />} />
          {/* 자식 페이지 라우트 (prompt-engineering-guide/:childSlug) */}
          <Route path="readings/:week/:slug/:childSlug" element={<ReadingPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
