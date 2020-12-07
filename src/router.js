import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

function importComponent(path) {
    return () => import(`./components/${path}.vue`);
}

Vue.use(VueRouter);

const router = new VueRouter({
    mode:"history",
    routes: [{
        path:"/landingpage",
        name:"landingpage",
        meta: {title: 'landingpage'},
        component: importComponent('LandingPage'),
    }, 
    {
        path:"/login",
        name:"Login",
        meta: {title: 'Login'},
        component: importComponent('Login')
    },
    {
        path:"/",
        name:"Navbar",
        component: importComponent('NavigationBar'),
        children: [
        {
            path:"/",
            name:"menu",
            meta: {title: 'menu'},
            component: importComponent('MenuPage'),
        },
        {
            path:"/profile",
            name:"profile",
            meta: {title: 'profile', mustLogin: true},
            component: importComponent('Profile'),
        },
        ]
    },
    {
        path:'*',
        redirect: '/'
    }]
});

router.beforeEach((to, from, next) => {
    document.title = to.meta.title ? to.meta.title : from.meta.title;
    
    if(to.matched.some( rec => rec.meta.mustLogin)) {
        if(localStorage.getItem('token')) next();
        else router.replace('/login');
    }
    else next();
});


export default router;