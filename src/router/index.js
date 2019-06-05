import NoFind from '../views/common/page/NoFind.vue'

//前台
import web from './web.js'

//后台
import admin from './admin.js'

let routes = [
	{
	  path: '*',
	  name: '/404',
	  component: NoFind
	}
]

routes = routes.concat(web,admin);

export default {
  mode: 'history',
  base: process.env.BASE_URL,
  routes
}
