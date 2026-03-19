import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Menu from './pages/Menu';
import Chefs from './pages/Chefs';
import BookTable from './pages/BookTable';
import Blog from './pages/Blog';
import './index.css';

const App = () => (
  <div className="app">
    <Navbar />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/menu" element={<Menu />} />
      <Route path="/chefs" element={<Chefs />} />
      <Route path="/book" element={<BookTable />} />
      <Route path="/blog" element={<Blog />} />
    </Routes>
    <Footer />
  </div>
);

export default App;
