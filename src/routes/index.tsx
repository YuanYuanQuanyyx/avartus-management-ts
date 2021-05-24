import AdminUser from '../pages/users/AdminUser';
import Login from '../pages/Login';
import PageNotFound from '../pages/PageNotFound';
import RegularUser from '../pages/users/RegularUser';

export const mainRoutes =[{
    path: '/login',
    component: Login
},
{
    path: '/404',
    component: PageNotFound
}
]

export const userRoutes =[{
    path:'/users/admin',
    component: AdminUser
},
{
    path:'/users/regular',
    component: RegularUser
}]