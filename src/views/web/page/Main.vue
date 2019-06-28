<template>
	<el-container class="main">
		<el-header height="64px">
			<el-row type="flex" align="middle" class="headerMain">
				<el-col :span="4">
					<div class="logo">
						<img src="@/assets/images/logo2.png" alt="">
					</div>
				</el-col>
				<el-col :span="14" class="nav">
					<!-- 暂时无导航
					* <el-menu :default-active="activeIndex" mode="horizontal" :router="true">
					*  <el-menu-item v-for="item in getMenu" :key="item.path" :index="item.path">{{item.meta.title}}</el-menu-item>
					*</el-menu> 
					* -->
				</el-col>
				<el-col :span="6" class="isLogin">
					<div class="noLogin" v-if="!loginInfo.is">
						<el-button type="text" @click="setLogin({state:'login',show:true});">用户登录</el-button>
						<span style="font-size: 12px;color: #fff;margin: 0 12px;">|</span>
						<el-button type="text" @click="setLogin({state:'register',show:true});">用户注册</el-button>
						<el-button type="text" @click="setLogin({state:'business',show:true});">商户入住</el-button>
					</div>
					<div class="yesLogin" v-if="loginInfo.is">
						<el-button type="text" @click="toBusinessInfo">{{userInfo.username}}</el-button>
						<span style="font-size: 12px;color: #fff;margin: 0 12px;">|</span>
						<el-button type="text" @click="logout">退出</el-button>
					</div>
				</el-col>
			</el-row>
		</el-header>
		
		<el-main class="body_main">
			<!-- <transition name="slide"> -->
				<router-view></router-view>
			<!-- </transition> -->
		</el-main>
		
		<el-footer>Copyright&copy;私生活 PrivateLife</el-footer>
		
		<el-dialog
		  :title="loginTitle"
		  :visible.sync="loginInfo.show"
		  width= "30%" style="min-width: 300px;">
		  <div>
			  <login-box v-if="loginInfo.state=='login'"></login-box>
			  <register-box v-if="loginInfo.state=='register'"></register-box>
			  <business-box v-if="loginInfo.state=='business'"></business-box>
		  </div>
		</el-dialog>
	</el-container>
</template>

<script>
	import common from '@/../server/common'
	import utils from '@/utils/index'
	import { mapState, mapMutations} from 'vuex'
	import registerBox from '../components/register.vue'
	import businessBox from '../components/business.vue'
	import loginBox from '../components/login.vue'
	
	export default {
		data() {
			const _this = this
			return {
				activeIndex: '1',
				// showLogin: false
			}
		},
		computed:{
			...mapState(['loginInfo']),
			loginTitle(){
				if(this.loginInfo.state=='login'){
					return '用户登录'
				}else if(this.loginInfo.state=='register'){
					return '用户注册'
				}else{
					return '商家入驻'
				}
			},
			userInfo(){
				if(this.loginInfo.is){
					return utils.storage.get('userInfo')
				}else{
					return "";
				}
			},
			getMenu(){
				let menu = this.$router.options.routes;
				let nav;
				menu.forEach(obj => {
				  if(obj.name == 'main'){
					  nav = obj.children;
				  }
				})
				return nav;
			}
		},
		mounted() {},
		created() {
			this.setLogin({is: Object.keys(utils.storage.get('userInfo')).length !== 0});
		},
		methods:{
			handleSelect(key,keyPath){
				console.log(key,keyPath);
			},
			logout(){
				utils.storage.remove('userInfo');
				window.location.reload();
			},
			toBusinessInfo(){
				this.$router.push({path:'/businessInfoEdit'})
			},
			...mapMutations(['setLogin'])
		},
		watch:{},
		components:{
			registerBox,
			loginBox,
			businessBox
		}
	}
</script>

<style lang="less">
	.el-header{
		background: #f8a14e;
		overflow: hidden;
	}
	.headerMain{
		width: 100%;
		max-width: 1440px;
		margin: 0 auto;
		font-size: 0;
	}
	.logo{
		font-size: 0;
		color: #fff;
		display: inline-block;
	}
	.logo p{
		font-size: 14px;
		text-align: center;
		margin: 0;
		letter-spacing: 10px;
	}
	.el-footer{
		border-top: solid 1px #ddd;
		line-height: 60px;
		text-align: center;
	}
	.nav{
		height: 64px;
		.el-menu{
			background: none;
		}
		.el-menu-item{
			opacity: 0.7;
			color: #fff;
			:hover{
				color: #000;
			}
		}
		.el-menu--horizontal>.el-menu-item{
			height: 64px;
			line-height: 64px;
			border: none;
		}
		.el-menu-item:hover{
			background-color: #000;
		}
		.el-menu-item.is-active{
			opacity: 1;
			border: none;
			background: none;
			color: #fff;
		}
		.el-menu--horizontal .el-menu-item:not(.is-disabled):focus, .el-menu--horizontal .el-menu-item:not(.is-disabled):hover{
			color: #fff;
			background: none;
		}
	}
	.body_main{
		width: 100%;
		padding: 0;
	}
	
	.slide-enter-active {
	  animation: slide-in .3s;
	  -webkit-animation: slide-in .3s;
	}
	
	.slide-leave-active {
	  /* animation: slide-out .2s */
	  /* -webkit-animation: slide-out .2s; */
	}
	
	.isLogin{
		text-align: right;
	}
	
	@keyframes slide-in {
	  0% {
	    transform: translateY(100%)
	  }
	  100% {
	    transform: translateY(0)
	  }
	}
	
	@keyframes slide-out {
	  0% {
	    transform: translateY(0)
	  }
	  100% {
	    transform: translateY(100%)
	  }
	}
</style>
