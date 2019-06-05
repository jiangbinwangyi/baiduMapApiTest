import Main from '../views/web/page/Main.vue'
import Home from '../views/web/page/Home.vue'
import service from '../views/web/page/service.vue'
import dataChart from '../views/web/page/dataChart.vue'
import cooperate from '../views/web/page/cooperate.vue'
import businessInfoEdit from '../views/web/page/businessInfoEdit.vue'

export default[
	{
		path: '/',
		name: 'main',
		component: Main,
		children: [{
			path: '/',
			name: 'home',
			meta: {title: '首页'},
			component: Home
		},{
			path: '/service',
			name: 'service',
			meta: {title: '产品服务'},
			component: service
		},
		{
			path: '/dataChart',
			name: 'dataChart',
			meta: {title: '业务热力图'},
			component: dataChart
		},
		{
			path: '/cooperate',
			name: 'cooperate',
			meta: {title: '关于我们'},
			component: cooperate
		},
		{
			path: '/businessInfoEdit',
			name: 'businessInfoEdit',
			meta: {title: '联系我们'},
			component: businessInfoEdit
		}]
	},
	
]