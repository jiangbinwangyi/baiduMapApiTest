<template>
	<div class="registerBox">
		<el-form :model="form" :rules="register.rules" label-width="80px" ref="regForm" @keyup.native.enter="registers">
			<el-form-item label="帐号" prop="username">
				<el-input v-model="form.username" :placeholder="placeholder.username"></el-input>
			</el-form-item>
			<el-form-item label="手机号" prop="user_phone">
				<el-input v-model="form.phone" :placeholder="placeholder.phone"></el-input>
			</el-form-item>
			<el-form-item :label="type==='register'?'密码':'新密码'" prop="password">
				<el-input type="password" v-model="form.password" :placeholder="placeholder.pass"></el-input>
			</el-form-item>
			<el-form-item label="确认密码" prop="passwords">
				<el-input type="password" v-model="form.passwords" :placeholder="placeholder.pass"></el-input>
			</el-form-item>
			<!-- 用户身份 商家1 -->
			<input type="hidden" v-model="form.identity">
		</el-form>
		<div style="text-align: right;">
			<el-button type="warning" :disabled="register.loading" @click="registers">注 册</el-button>
			<el-button @click="setLogin({state:'login'})">已有帐号，去登录</el-button>
		</div>
	</div>
</template>

<script>
	import common from '@/../server/common'
	import utils from '@/utils/index'
	import {mapMutations} from 'vuex'

	export default {
		data() {
			const _this = this
			return {
				placeholder: {
					username: common.name_txt,
					pass: common.pass_txt,
					phone: "请输入手机号码"
				},
				type: 'register', // register|retrieve
				loading: false,
				err: '',
				register: {
					visible: false,
					loading: false,
					rules: {
						username: [{
							required: true,
							message: '用户帐号不能为空！',
							trigger: 'change'
						}, {
							validator: (rule, value, callback) => {
								if (!common.name_reg.test(value)) {
									callback(new Error(common.name_txt))
								} else if (_this.err.includes('帐号')) {
									callback(new Error(_this.err))
								} else {
									callback()
								}
							},
							trigger: 'change'
						}],
						password: [{
							required: true,
							message: '密码不能为空！',
							trigger: 'change'
						}, {
							validator: (rule, value, callback) => {
								if (!common.pass_reg.test(value)) {
									callback(new Error(common.pass_txt))
								} else {
									_this.form.passwords && _this.$refs.regForm.validateField('passwords')
									callback()
								}
							},
							trigger: 'change'
						}],
						passwords: [{
							required: true,
							message: '确认密码不能为空！',
							trigger: 'change'
						}, {
							validator: (rule, value, callback) => {
								if (!common.pass_reg.test(value)) {
									callback(new Error(common.pass_txt))
								} else if (_this.form.password !== _this.form.passwords) {
									callback(new Error('密码与确认密码不相同！'))
								} else {
									callback()
								}
							},
							trigger: 'change'
						}],
						user_email: [{
							required: true,
							message: '邮箱不能为空！',
							trigger: 'change'
						}, {
							validator: (rule, value, callback) => {
								if (!common.email_reg.test(value)) {
									callback(new Error(common.email_txt))
								} else if (_this.err.includes('邮箱')) {
									callback(new Error(_this.err))
								} else {
									callback()
								}
							},
							trigger: 'change'
						}]
					}
				},
				form: {
					username: '',
					password: '',
					passwords: '',
					phone: '',
					identity: '2'
				}
			}
		},
		methods: {
			registers() {
				this.$refs.regForm.validate(valid => {
					if (valid) {
						this.$confirm('确定要注册？注意：操作后需要邮箱激活帐号！', '系统提醒', {
							confirmButtonText: '确定',
							cancelButtonText: '取消',
							type: 'warning'
						}).then(() => {
							this.register.loading = true
							utils.ajax.call(this, 'index/login/register', this.form, (data, err) => {
								this.register.loading = false
								if (!err) {
									this.register.visible = false
									this.$refs.regForm.resetFields(); //成功返回清空
									
									this.$message({
										message: '恭喜您注册成功',
										type: 'success'
									})
									
									this.$router.push({path:'/businessInfoEdit'})
								} else {
									this.err = err
									if (err.includes('帐号') || err.includes('邮箱')) {
										this.$refs.regForm.validateField(err.includes('帐号') ? 'user_name' : 'user_email')
									}
								}
							})
						}).catch(() => {})
					}
				})
			},
			...mapMutations(['setLogin']),
		},
		watch: {
			'form.user_name'() {
				if (this.err.includes('帐号')) this.err = ''
			},
			'form.user_email'() {
				if (this.err.includes('邮箱')) this.err = ''
			}
		}
	}
</script>

<style>
</style>
