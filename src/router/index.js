import store from '@/store'
import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes'
Vue.use(VueRouter)


let originPush = VueRouter.prototype.push
let originReplace = VueRouter.prototype.replace

VueRouter.prototype.push = function (location, resolve, reject) {
    if (reject && resolve) {
        originPush.call(this, location, resolve, reject);
    }
    else {
        originPush.call(this, location, () => { }, () => { });
    }
}

VueRouter.prototype.replace = function (location, resolve, reject) {
    if (reject && resolve) {
        originReplace.call(this, location, resolve, reject);
    }
    else {
        originReplace.call(this, location, () => { }, () => { });
    }
}

const router = new VueRouter({
    routes,
    scrollBehavior(to, from, savePosition) {
        return { y: 0 }
    }
})

router.beforeEach(async (to,from,next)=>{
    let token = store.state.user.token;
    let name = store.state.user.userInfo.name;

    if(token){
        if(to.path == "/login"){
            next("/home");
        }
        else{
            if(name){
                next();
            }
            else{
                try{
                    await store.dispatch('getUserInfo');
                    next();
                }catch(error){
                    await store.dispatch('userLogout');
                    next('login')
                }
            }
        }
    }else{
        let topath = to.path;
        if(topath.indexOf('trade')!= -1 || topath.indexOf('pay') != -1 || topath.indexOf('center') != -1){
            next('/login?redirect='+topath);
        }
        else{
            next();
        }
    }
})


export default router