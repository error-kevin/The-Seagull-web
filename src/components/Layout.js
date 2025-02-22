import { Outlet } from "react-router-dom";
import { Navbar, Footer } from './';
import useAuth from '../hooks/useAuth';

const Layout = () => {
    const { auth } = useAuth();

    return (
        <main className="App">
            <Navbar />
            <Outlet />
            <Footer />
            
        </main>
    );
}

export default Layout;
