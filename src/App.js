import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { publicRoutes } from './routes/Routes';
import './App.css';
import { useContext } from 'react';
import { AuthContext } from './authContext/AuthContext';

function App() {
    const { currentUser } = useContext(AuthContext);
    return (
        <BrowserRouter>
            <div className="App">
                <Routes>
                    {publicRoutes.map((route, index) => {
                        return <Route key={index} path={route.path} element={<route.component />} />;
                    })}
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;
