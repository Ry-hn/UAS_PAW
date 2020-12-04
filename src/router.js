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
        component: importComponent('LandingPage'),
    }, 
    {
        path:"/login",
        name:"Login",
        component: importComponent('Login')
    },
    {
        path:"/",
        name:"Navbar",
        component: importComponent('NavigationBar'),
        children: [{
            path:"/",
            name:"menu",
            component: importComponent('MenuPage')
        }]
    }]
});


export default router;