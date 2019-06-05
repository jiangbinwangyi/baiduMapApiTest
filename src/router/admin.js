import common from '@/../server/common'

import Login from '../views/admin/page/Login.vue'
import adminHome from '../views/admin/page/Home.vue'
import ArticleList from '../views/admin/page/Article/list.vue'
import ArticleSort from '../views/admin/page/Article/sort.vue'
import ArticleAdd from '../views/admin/page/Article/add.vue'
import UpFileList from '../views/admin/page/UpFile/list.vue'
import userList from '../views/admin/page/User/list.vue'
import userAdd from '../views/admin/page/User/add.vue'

export default[
	{
	  path: '/admin',
	  redirect: '/admin/login'
	}, {
	  path: '/admin/login',
	  name: 'login',
	  meta: { title: '登录' },
	  component: Login
	}, {
	  path: '/admin/article',
	  meta: {
	    verify: true,
	    title: '文章管理',
	    icon: 'fa fa-file-text-o'
	  },
	  component: adminHome,
	  redirect: '/admin/article/list',
	  children: [{
	    path: 'sort',
	    meta: {
	      verify: true,
	      grade: common.page_grade.listSort,
	      title: '分类管理',
	      icon: 'fa fa-th-large'
	    },
	    component: ArticleSort
	  }, {
	    path: 'list',
	    meta: {
	      verify: true,
	      grade: common.page_grade.listArticle,
	      title: '文章列表',
	      icon: 'fa fa-newspaper-o'
	    },
	    component: ArticleList
	  }, {
	    path: 'add',
	    meta: {
	      verify: true,
	      title: '添加文章',
	      icon: 'fa fa-clone'
	    },
	    component: ArticleAdd
	  }, {
	    path: 'edit/:id',
	    meta: {
	      verify: true,
	      title: '编辑文章',
	      icon: 'fa fa-clone'
	    },
	    component: ArticleAdd
	  }]
	}, {
	  path: '/admin/user',
	  meta: {
	    verify: true,
	    title: '用户管理',
	    icon: 'fa fa-user-o'
	  },
	  redirect: '/admin/user/list',
	  component: adminHome,
	  children: [{
	    path: 'list',
	    meta: {
	      verify: true,
	      grade: common.page_grade.userList,
	      title: '用户列表',
	      icon: 'fa fa-address-card-o'
	    },
	    component: userList
	  }, {
	    path: 'add',
	    meta: {
	      verify: true,
	      grade: common.page_grade.updateUser,
	      title: '添加用户',
	      icon: 'fa fa-user-plus'
	    },
	    component: userAdd
	  }, {
	    path: 'edit/:id',
	    meta: {
	      verify: true,
	      title: '编辑用户',
	      icon: 'fa fa-user-times'
	    },
	    component: userAdd
	  }]
	}, {
	  path: '/admin/upfile',
	  meta: {
	    verify: true,
	    title: '上传管理',
	    icon: 'fa fa-upload'
	  },
	  component: adminHome,
	  redirect: '/admin/upfile/list',
	  children: [{
	    path: 'list',
	    meta: {
	      verify: true,
	      grade: common.page_grade.listUpFile,
	      title: '上传列表',
	      icon: 'fa fa-files-o'
	    },
	    component: UpFileList
	  }]
	}
]