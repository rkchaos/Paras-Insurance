import {
    BrowserRouter as Router,
    Routes, Route
} from 'react-router-dom';
import Home from './pages/Home.page';
import Authentication from './pages/Authentication.page';
import Header from './components/Header';
import Footer from './components/Footer';

const App = () => {
    return (
        <Router>
            <Header />
            <Routes>
                <Route exact path='/' element={<Home />} />
                <Route path='/auth' element={<Authentication />} />
            </Routes>
            <Footer />
        </Router>
    );
}

export default App;
