import { 
    Route,
    Routes, 
    BrowserRouter
} from 'react-router-dom'
import Err from './pages/Err'
import Fav from './pages/Fav'
import Home from './pages/Home'
import Fil from './pages/Fil'
import Header from './components/Header'

function RoutesApp() {
    return (
        <BrowserRouter>
            <Header />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/fil/:id" element={<Fil />} />
                <Route path="/fav" element={<Fav />} />
                <Route path="*" element={<Err />} />
            </Routes>
        </BrowserRouter>
    )
}

export default RoutesApp