import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect:'/upLoad'
    },
    {
      path: '/table/:type',
      name: 'table',
      component: function (resolve) {
        require(['@/pages/Table'], resolve)
      }
    },
    {
      path: '/tableList/:type',
      name: 'tableList',
      component: function (resolve) {
        require(['@/pages/TableList'], resolve)
      }
    },
    {
        path:'/upload',
        name:'upload',
        component:function(resolve){
            require(['@/pages/upLoad'],resolve)
        }
    },
    {
      path:'/otherTable',
      name:'otherTable',
      component:function(resolve){
          require(['@/pages/otherTable'],resolve)
      }
    },  
    {
      path:'/explain',
      name:'explain',
      component:function(resolve){
          require(['@/pages/Explain'],resolve)
      }
    }, 
    {
      path:'/login',
      name:'login',
      component:function(resolve){
          require(['@/pages/Login'],resolve)
      }
    }, 
    {
      path:'/todayTable',
      name:'todayTable',
      component:function(resolve){
        require(['@/pages/todayTable'],resolve)
    }
  }
  ]
})
