import Main from '../views/web/page/Main.vue'
import Home from '../views/web/page/Home.vue'
import businessList from '../views/web/page/businessList.vue'
import dataChart from '../views/web/page/dataChart.vue'
import businessGoods from '../views/web/page/businessGoods.vue'
import businessInfoEdit from '../views/web/page/businessInfoEdit.vue'

export default[
	{
		path: '/',
		name: 'main',
		component: Main,
		children: [{
			path: '/',
			name: 'home',
			meta: {title: '首页',verify:false},
			component: Home
		},{
			path: '/businessList',
			name: 'businessList',
			meta: {title: '产品服务'},
			component: businessList
		},
		{
			path: '/dataChart',
			name: 'dataChart',
			meta: {title: '业务热力图'},
			component: dataChart
		},
		{
			path: '/businessGoods',
			name: 'businessGoods',
			meta: {title: '商品管理',verify:true},
			component: businessGoods
		},
		{
			path: '/businessInfoEdit',
			name: 'businessInfoEdit',
			meta: {title: '商家信息',verify:true},
			component: businessInfoEdit
		}]
	},
	
]