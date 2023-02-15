import Register from '../register/Register';
import Login from '../login/Login';
import Layout from '../component/layout';
const publicRoutes = [
    { path: '/', component: Register },
    { path: '/login', component: Login },
    { path: '/home', component: Layout },
];
const privateRoutes = [];

export { publicRoutes, privateRoutes };
