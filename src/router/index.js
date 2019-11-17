import Vue from 'vue'
import Router from 'vue-router'
import Vant from "vant"
import 'vant/lib/index.css';


Vue.use(Router)
Vue.use(Vant);

const Home = r => require.ensure([], () => r(require('../components/home/index')), 'index')
const Login = r => require.ensure([], () => r(require('../components/home/login')), 'index')

const Forgetpass = r => require.ensure([], () => r(require('../components/home/forgetpass')), 'index')
const Index = r => require.ensure([], () => r(require('../components/index')), 'index')

const Briefintroduction = r => require.ensure([], () => r(require('../components/briefintroduction/index')), 'index') //简介
const Dynamiccom = r => require.ensure([], () => r(require('../components/dynamiccom/index')), 'index')  //动态
const Freecreation = r => require.ensure([], () => r(require('../components/freecreation/index')), 'index') //免费创建

const Product = r => require.ensure([], () => r(require('../components/product/index')), 'index') // 产品
const Productdetails = r => require.ensure([], () => r(require('../components/product/productdetails')), 'index') // 产品


const Cardholder = r => require.ensure([], () => r(require('../components/managementCom/cardholder')), 'index') // 产品

const Systemsetup = r => require.ensure([], () => r(require('../components/managementCom/systemsetup')), 'index') // 产品

const Manhome = r => require.ensure([], () => r(require('../components/managementCom/manhome')), 'index') // 产品
const Productman = r => require.ensure([], () => r(require('../components/managementCom/productman/productman')), 'index') // 产品
const Banner = r => require.ensure([], () => r(require('../components/managementCom/productman/banner')), 'index') // 产品
const Procategory = r => require.ensure([], () => r(require('../components/managementCom/productman/procategory')), 'index') // 产品
const Catrelease = r => require.ensure([], () => r(require('../components/managementCom/productman/catrelease')), 'index') // 产品
const Propublish = r => require.ensure([], () => r(require('../components/managementCom/productman/propublish')), 'index') // 产品


const Publicadynamics = r => require.ensure([], () => r(require('../components/managementCom/publicadynamics/index')), 'index') // 产品
const Bannerdynam = r => require.ensure([], () => r(require('../components/managementCom/publicadynamics/bannerdynam')), 'index') // 产品

const Dyprocategory = r => require.ensure([], () => r(require('../components/managementCom/publicadynamics/dyprocategory')), 'index') // 产品

const Dyncatrelease = r => require.ensure([], () => r(require('../components/managementCom/publicadynamics/dyncatrelease')), 'index') // 产品

const Dynamicspub = r => require.ensure([], () => r(require('../components/managementCom/publicadynamics/dynamicspub')), 'index') // 产品

const Introduction = r => require.ensure([], () => r(require('../components/managementCom/introduction')), 'index') // 产品

const Chosestyle = r => require.ensure([], () => r(require('../components/managementCom/chosestyle')), 'index') // 产品

const Vsitorsta = r => require.ensure([], () => r(require('../components/managementCom/vsitorsta/index')), 'index') // 产品
const router= new Router({
  // base:"card",
  routes: [
    {
      path: '/',
      redirect: '/home',
    },
    {
      path: '/home',
      name: 'Home',
      component: Home,
      // redirect: '/index/home',
      meta: {
        isLogin: false,
        title: '名片'
      },
    },
    {
      path: '/briefintroduction',
      name: 'Briefintroduction',
      component: Briefintroduction,
      meta: {
        title: '简介'
      }
    }, 
    {
      path: '/freecreation',
      name: 'Freecreation',
      component: Freecreation,
      meta: {
        title: '免费创建'
      }
    }, 
    
    {
      path: '/product',
      name: 'Product',
      component: Product,
      meta: {
        title: '产品'
      }
    }, 
       {
      path: '/productdetails',
      name: 'Productdetails',
      component: Productdetails,
      meta: {
        title: '产品详情'
      }
    }, 
    
    {
      path: '/dynamiccom',
      name: 'Dynamiccom',
      component: Dynamiccom,
      meta: {
        title: '动态'
      }
    },
    {
      path: '/manhome',
      name: 'Manhome',
      component: Manhome,
      meta: {
        title: '产品管理'
      }
    },
    {
      path: '/productman',
      name: 'Productman',
      component: Productman,
      meta: {
        title: '产品管理'
      }
    },
    {
      path: '/banner',
      name: 'Banner',
      component: Banner,
      meta: {
        title: '产品Banner管理'
      }, 
    },
    {
      path: '/procategory',
      name: 'Procategory',
      component: Procategory,
      meta: {
        title: '产品类别管理'
      },
    },
    {
    path: '/catrelease',
    name: 'Catrelease',
    component: Catrelease,
    meta: {
      title: '产品类别发布'
    },
  },
  {
    path: '/propublish',
    name: 'Propublish',
    component: Propublish,
    meta: {
      title: '新产品发布'
    },
  },
  {
    path: '/publicadynamics',
    name: 'Publicadynamics',
    component: Publicadynamics,
    meta: {
      title: '动态管理'
    },
  },
  {
    path: '/bannerdynam',
    name: 'Bannerdynam',
    component: Bannerdynam,
    meta: {
      title: '新闻Banner管理'
    },
  },
  {
    path: '/dyprocategory',
    name: 'Dyprocategory',
    component: Dyprocategory,
    meta: {
      title: '动态类别管理'
    },
  },
  {
    path: '/dyncatrelease',
    name: 'Dyncatrelease',
    component: Dyncatrelease,
    meta: {
      title: '动态类别发布'
    },
    
  },
  {
    path: '/dynamicspub',
    name: 'Dynamicspub',
    component: Dynamicspub,
    meta: {
      title: '动态发布'
    },
    
  },
  {
    path: '/introduction',
    name: 'Introduction',
    component: Introduction,
    meta: {
      title: '修改简介'
    },
  },
  {
    path: '/chosestyle',
    name: 'Chosestyle',
    component: Chosestyle,
    meta: {
      title: '修改简介'
    },
  },
  {
    path: '/vsitorsta',
    name: 'Vsitorsta',
    component: Vsitorsta,
    meta: {
      title: '访客统计'
    },
  },
  {
    path: '/forgetpass',
    name: 'Forgetpass',
    component: Forgetpass,
    meta: {
      title: '忘记密码'
    },
  },
  {
    path: '/cardholder',
    name: 'Cardholder',
    component: Cardholder,
    meta: {
      title: '我得名片夹'
    },
  },
  {
    path: '/systemsetup',
    name: 'Systemsetup',
    component: Systemsetup,
    meta: {
      title: '系统设置'
    },
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: {
      title: '登入'
    },
  },
  
  
  
  
  
  
  
  
  
  
  
    
    
     

  ],
  mode:"history"
})

// router.beforeEach((to, from, next) => {
//   /* 路由发生变化修改页面title */
//   if (to.meta.title) {
//     document.title = to.meta.title;
//   }
//   next();
// })

export default router
