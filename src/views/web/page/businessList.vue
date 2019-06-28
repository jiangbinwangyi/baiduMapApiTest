<template>
	<div class="businessGoods">
		<p class="home_title">附近商家搜索结果页</p>
		<div style="width: 1440px; margin: 0 auto;">
			<el-row :gutter="20" v-if="businessList.length>0">
			  <el-col :span="4" v-for="(item,index) in businessList" :key="index" style="padding: 10px;">
				<el-card :body-style="{ padding: '0px' }" style="position: relative;">
				  <img src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png" style="width: 100%;">
				  <div style="padding: 14px;">
					<p>{{item.store_name}}</p>
					<p style="color: #999;font-size: 0;padding-top: 6px;">
						<span style="font-size: 12px;width: 60%;overflow: hidden;display: inline-block;white-space:nowrap;text-overflow:ellipsis;">{{item.details}}</span>
						<span style="font-size: 12px;width: 40%;overflow: hidden;display: inline-block;text-align: right;color: #f8a14e;">{{item.distance}}米</span>
					</p>
				  </div>
				</el-card>
			  </el-col>
			</el-row>
			<div style="text-align: center;padding: 20px;background: #ddd;" v-else>抱歉，没有找到相关商户</div>
		</div>
	</div>
</template>

<script>
	import utils from '@/utils/index'
	
	export default{
		data(){
			return {
				businessList: [],
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
			requestBusinessList(){
				let points = this.$store.state.coordinate;
				if(points){
					utils.ajax.call(this, 'index/hall/searchByLatAndLng', {longitude:points.lng,latitude:points.lat}, (data, err) => {
						console.log(data);
						this.businessList = data;
					})
				}
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
			this.requestBusinessList();
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
