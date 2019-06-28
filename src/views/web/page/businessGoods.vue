<template>
	<div class="businessGoods">
		<p class="home_title">这里是商家商品管理页面</p>
		<div style="width: 1440px; margin: 0 auto;">
			<el-tabs tab-position="left" @edit="goodsTypeOperation" editable v-model="goodsInfo.menu_id" @tab-click="requestGoodsList()">
				<el-tab-pane v-for="(item,index) in goods" :key="index" :name="item.menu_id" :label="item.menu_name">
					<el-button type="primary" @click="goodsVisible = true">添加商品</el-button>
					<el-row :gutter="20">
					  <el-col :span="4" v-for="(citem,cindex) in goodsList" :key="cindex" style="padding: 10px;">
						<el-card :body-style="{ padding: '0px' }" style="position: relative;">
						  <img src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png" style="width: 100%;">
						  <div style="padding: 14px;">
							<span>{{citem.name}}</span>
							<div class="clearfix">
							  <span style="font-size: 12px;color:#E6A23C;">价格:{{ citem.price }}</span>
							  <el-button type="text" style="color: #67C23A;float: right;">加入购物车</el-button>
							</div>
						  </div>
						  <el-button @click="removeGoods(citem.id)" plain="true" type="primary" circle size="mini" icon="el-icon-close" style="position: absolute;top: 3px;right: 3px;"></el-button>
						</el-card>
					  </el-col>
					</el-row>
				</el-tab-pane>
			</el-tabs>
		</div>
		
		<!-- 添加商品分类弹框 -->
		<el-dialog
		  title="添加商品分类"
		  :visible.sync="goodsTypeVisible"
		  width="30%">
		  <el-form :inline="true">
			  <el-form-item label="分类名称" :label-width="120">
				<el-input v-model="newGoodsType" autocomplete="off"></el-input>
			  </el-form-item>
		  </el-form>
		  <span slot="footer" class="dialog-footer">
			<el-button @click="goodsTypeVisible = false">取 消</el-button>
			<el-button type="primary" @click="goodsTypeAdd">确 定</el-button>
		  </span>
		</el-dialog>
		
		<!-- 添加商品弹框 -->
		<el-dialog
		  title="添加商品"
		  :visible.sync="goodsVisible"
		  width="30%">
		  <el-form ref="goodsForm" :rules="goodsRules" :model="goodsInfo" label-width="80px">
			  <el-form-item label="商品名称" prop="name">
				<el-input v-model="goodsInfo.name" autocomplete="off"></el-input>
			  </el-form-item>
			  <el-form-item label="商品价格" prop="price">
			  		<el-input v-model="goodsInfo.price" autocomplete="off"></el-input>
			  </el-form-item>
			  <el-form-item label="商品描述" prop="content">
			  		<el-input v-model="goodsInfo.content" autocomplete="off"></el-input>
			  </el-form-item>
			  <el-form-item label="库存数量" prop="inventory">
			  		<el-input v-model="goodsInfo.inventory" autocomplete="off"></el-input>
			  </el-form-item>
		  </el-form>
		  <span slot="footer" class="dialog-footer">
			<el-button @click="goodsVisible = false">取 消</el-button>
			<el-button type="primary" @click="goodsAdd">确 定</el-button>
		  </span>
		</el-dialog>
	</div>
</template>

<script>
	import utils from '@/utils/index'
	
	export default{
		data(){
			return {
				goodsTypeVisible: false,
				goodsVisible: false,
				newGoodsType: '',
				goodsInfo: {
					name: '',
					menu_id: '',
					price: '',
					content: '',
					inventory: ''
				},
				goodsRules: {
					name: [{
					  required: true,
					  message: '商品名称不能为空！',
					  trigger: 'change'
					}],
					price: [{
					  required: true,
					  message: '商品价格不能为空！',
					  trigger: 'change'
					}],
					content: [{
					  required: true,
					  message: '商品描述不能为空！',
					  trigger: 'change'
					}],
					inventory: [{
					  required: true,
					  message: '商品库存数量不能为空！',
					  trigger: 'change'
					}]
				  },
				goods:[],
				goodsList: [],
			}
		},
		methods:{
			goodsTypeList(){
				return new Promise((resolve, reject) => {
					utils.ajax.call(this, 'index/hall/menu_list', {}, (data, err) => {
						this.goods = data;
						this.goodsInfo.menu_id = data[0].menu_id;
						resolve();
					})
				})
			},
			requestGoodsList(){
				let menu_id = this.goodsInfo.menu_id;
				utils.ajax.call(this, 'index/hall/commodity_list', {menu_id}, (data, err) => {
					this.goodsList = data;
				})
			},
			goodsTypeOperation(targetName,action,c){
				if(action=="add"){
					//弹框添加
					this.goodsTypeVisible = true;
				}else if(action=="remove"){
					//移除确认
					this.$confirm('是否确认删除该分类?', '提示', {
						confirmButtonText: '确定',
						cancelButtonText: '取消',
						type: 'warning'
					}).then(()=>{
						utils.ajax.call(this, 'index/hall/del_menu', {menu_id: targetName}, (data, err) => {
							if(!err){
								this.goodsTypeList();
								this.$message({message:'删除成功',type:'success'})
							}
						})
					})
				}
			},
			goodsTypeAdd(){
				if(this.newGoodsType!==''){
					utils.ajax.call(this, 'index/hall/add_menu', {menu_name: this.newGoodsType}, (data, err) => {
						if(!err){
							this.newGoodsType = '';
							this.goodsTypeVisible = false;
							this.goodsTypeList();
							this.$message({message:'分类添加成功',type:'success'})
						}
					})
				}
			},
			goodsAdd(){
				this.$refs.goodsForm.validate(valid => {
				  if (valid) {
					  utils.ajax.call(this, 'index/hall/add_commodity', this.goodsInfo, (data, err) => {
					  	if(!err){
					  		// this.goodsTypeList();
					  		this.$refs['goodsForm'].resetFields();
					  		this.goodsVisible = false;
							this.requestGoodsList(this.goodsInfo.menu_id);
					  		this.$message({message:'商品添加成功',type:'success'})
					  	}
					  })
					}
				})  
			},
			removeGoods(id){
				this.$confirm('是否确定删除', '提示', {
				  confirmButtonText: '确定',
				  cancelButtonText: '取消',
				  type: 'warning'
				}).then(() => {
					utils.ajax.call(this, 'index/hall/del_commodity', {commodity_id: id}, (data, err) => {
						if(!err){
							this.$message({message:'商品删除成功',type:'success'})
							this.requestGoodsList(this.goodsInfo.menu_id);
						}
					})
				})
			}
		},
		mounted() {
			//初始化请求
			this.goodsTypeList().then(menuId=>{
				this.requestGoodsList(menuId);
			});
		}
	}
</script>

<style lang="less">
	.businessGoods{
		.el-tabs__nav-wrap.is-left{
			padding-bottom: 100px;
			min-width: 200px;
		}
		.el-tabs__new-tab{
			position: absolute;
			bottom: 60px;
			float: none;
			right: 20px;
			width: auto;
			height: auto;
			line-height: 1;
			color: #ffc75b;
			border-color: #ffc75b;
			cursor: pointer;
			padding: 6px 0;
			z-index: 1;
			.el-icon-plus:after{
				content: "添加新分类";
				padding-left: 5px;
			}
		}
		.clearfix:before,
		  .clearfix:after {
			  display: table;
			  content: "";
		  }
		  
		  .clearfix:after {
			  clear: both
		  }
	}
</style>
