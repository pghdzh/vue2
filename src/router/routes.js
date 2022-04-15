import Home from '@/pages/Home'
import Login from '@/pages/Login'
import Register from '@/pages/Register'
import Search from '@/pages/Search'
import Deatil from '@/pages/Detail'
import addcartsuccess from '@/pages/AddCartSuccess'
import ShopCart from '@/pages/ShopCart'

export default [

    {
        path:'/center',
        component:() => import('@/pages/Center'),
        meta:{show:true},
        
    },

    {
        path: '/paysucess',
        component: () => import('@/pages/PaySuccess'),
        meta: { show: true }
    },

    {
        path: '/pay',
        component: () => import('@/pages/Pay'),
        meta: { show: true },
        beforeEnter: (to, from, next) => {
            if (from.path == '/trade') {
                next();
            }
            else {
                next(false);
            }
        }
    },

    {
        path: '/trade',
        component: () => import('@/pages/Trade'),
        meta: { show: true },
        beforeEnter: (to, from, next) => {
            if (from.path == "/shopcart") {
                next();
            }
            else {
                next(false)
            }
        }
    },

    {
        path: '/shopcart',
        component: ShopCart,
        meta: { show: true }
    },

    {
        path: '/detail/:skuId',
        component: Deatil,
        meta: { show: true },
    },

    {
        path: '/addcartsuccess',
        component: addcartsuccess,
        meta: { show: true },
        name: "addcartsuccess"
    },

    {
        path: '/home',
        component: Home,
        meta: { show: true },
    },

    {
        path: '/login',
        component: Login,
        meta: { show: false },
    },

    {
        path: '/register',
        component: Register,
        meta: { show: false },
    },

    {
        path: '/search/:keyword?',
        //?代表可传可不传
        component: Search,
        meta: { show: true },
        name: 'search',
    },



    {
        path: '/',
        redirect: '/home'
    }
]