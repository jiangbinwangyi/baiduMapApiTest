<template>
		<div class="loginBox">
			<el-form label-width="0px" :model="data" :rules="rule_data" ref="loginForm">
				<el-form-item prop="identity">
					<el-radio v-model="data.identity" label="2" border>用户</el-radio>
					<el-radio v-model="data.identity" label="1" border>商家</el-radio>
				</el-form-item>
			  <el-form-item prop='phone'>
			    <el-input type="text" placeholder="手机号" v-model="data.phone"
			              :disabled="loading" autofocus @keyup.native.enter="login()"></el-input>
			  </el-form-item>
			  <el-form-item prop='password'>
			    <el-input type="password" placeholder="密码" v-model="data.password"
			              :disabled="loading" @keyup.native.enter="login()"></el-input>
			  </el-form-item>
			</el-form>
			<div style="text-align: right;">
				<el-button type="primary" @click="login" :disabled="loading">登录</el-button>
				<el-button type="text" @click="setLogin({state:'register'})">还没帐号，去注册</el-button>
			</div>
		</div>
</template>

<script>
	import common from '@/../server/common'
	import utils from '@/utils/index'
	import {mapMutations} from 'vuex'
	
	export default{
		data(){
			const _this = this
			return {
				data: {
					identity: "2",
				  phone: '',
				  password: ''
				},
				loading: false,
				err: '',
				rule_data: {
				  phone: [{
				    required: true,
				    message: '帐号不能为空！',
				    trigger: 'change'
				  }],
				  password: [{
				    required: true,
				    message: '密码不能为空！',
				    trigger: 'change'
				  }, {
				    pattern: common.pass_reg,
				    message: common.pass_txt,
				    trigger: 'change'
				  }]
				},
			}
		},
		methods:{
			...mapMutations(['setLogin']),
			login () {
			  this.$refs.loginForm.validate(valid => {
			    if (valid && !this.loading) {
			      this.loading = true
			      utils.ajax.call(this, 'index/login/login', this.data, (data, err) => {
			        this.loading = false
			        if (!err) {
			          utils.storage.set('userInfo', data, () => {
									this.$refs.loginForm.resetFields(); //清空登录框
									this.$message({
										message: '登录成功',
										type: 'success'
									});
									
									this.setLogin({show:false,is:true})
									
									if(data.store_perfection==1){ //未填写认证信息
										this.$router.push({path:'/businessInfoEdit'})
									}else if(data.store_perfection==2){ //未认证通过
										this.$router.push({path:'/businessGoods'}) //暂时不审核
									}else{ //通过认证
										this.$router.push({path:'/businessGoods'})
									}
									
			            // let url = this.$route.query.url
			            // url = url && !url.includes('login') ? url : '/admin/article/list'
			            // this.$router.replace('/')
			          })
			        }
			      })
			    }
			  })
			}
		},
		watch:{
			
		}
	}
</script>

<style>
</style>
