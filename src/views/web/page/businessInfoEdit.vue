<template>
	<div style="max-width: 790px;margin: 0 auto;">
		<div class="home_title">商家入住信息</div>
		<el-form ref="form" :model="form" label-width="80px">
		  <el-form-item label="商家名称">
			<el-input v-model="form.store_name" placeholder="请填写入住商家名称"></el-input>
		  </el-form-item>
		  <el-form-item label="法人姓名">
		  	<el-input v-model="form.name" placeholder="请输入法人姓名"></el-input>
		  </el-form-item>
		  <el-form-item label="法人电话">
		  	<el-input v-model="form.phone" placeholder="请输入法人联系电话"></el-input>
		  </el-form-item>
		  <el-form-item label="商家分类">
			<el-select v-model="form.regionP" placeholder="请选择商户主营分类" @change="regionChange">
			  <el-option v-for="(item,index) in storeClass" :key="index" :label="item.sort_name" :value="index"></el-option>
			</el-select>
			<span> - </span>
			<el-select v-model="form.store_sort" placeholder="详细分类" v-if="storeClass[form.regionP]">
			  <el-option v-for="(citem,cindex) in storeClass[form.regionP].children" :key="cindex" :label="citem.sort_name" :value="citem.id"></el-option>
			</el-select>
		  </el-form-item>
		  <el-form-item label="商家详情">
		  	<el-input type="textarea" v-model="form.details" placeholder="请输入商家详细介绍(最多200字)" maxlength="200"></el-input>
		  </el-form-item>
		  <el-form-item label="商家城市">
			<el-select v-model="form.city" filterable size="large" @change="theLocation()">
				<el-option-group
				  v-for="group in citys"
				  :key="group.label"
				  :label="group.label">
				  <el-option
					v-for="item in group.options"
					:key="item.value"
					:label="item.label"
					:value="item.value">
				  </el-option>
				</el-option-group>
			  </el-select>
		  </el-form-item>
		  <el-form-item label="商家地址" placeholder="请填写入住商家具体地址">
		  		<el-autocomplete 
					v-model="form.address" 
					@select="searchList"
					:fetch-suggestions="querySearch"
					style="width: 100%;">
				</el-autocomplete>
				<div id="l-map" style="height: 500px;margin: 10px 0;"></div>
		  </el-form-item>
		  <el-form-item>
			<el-button type="primary" @click="onSubmit">立即创建</el-button>
			<el-button>取消</el-button>
		  </el-form-item>
		</el-form>
	</div>
</template>

<script>
	import utils from '@/utils/index'
	export default{
		data(){
			return {
				map: null,
				local: null,
				results: [],
				citys: [{
				  label: '热门城市',
				  options: [{
					coordinate: [31.2363429624,121.4803295328],
					value: 'Shanghai',
					label: '上海'
				  }, {
					coordinate: [39.9110666857,116.4136103013],
					value: 'Beijing',
					label: '北京'
				  },{
					coordinate: [-37.807459,144.964088],
					value: 'Melbourne',
					label: '墨尔本'
				  }]
				}, {
				  label: '城市名',
				  options: [{
					coordinate: [30.5763307666,104.0712219292],
					value: 'ChengDu',
					label: '成都'
				  }, {
					coordinate: [22.5485544122,114.0661345267],
					value: 'Shenzhen',
					label: '深圳'
				  }, {
					coordinate: [23.1351666766,113.2708136740],  
					value: 'Guangzhou',
					label: '广州'
				  }, {
					coordinate: [41.6833188772,123.4695980294],  
					value: 'ShenYang',
					label: '沈阳'
				  }]
				}],
				storeClass: [],
				form: {
				  store_name: '',
				  name: '',
				  regionP: '',
				  store_sort: '',
				  phone: '',
				  details: '',
				  city: 'Beijing',
				  address: '',
				  coordinate: '',
				  longitude: '', //经度
				  latitude: '', //维度
				}
			}
		},
		methods: {
		  onSubmit() {
			utils.ajax.call(this, 'index/hall/store_perfection', this.form, (data, err) => {
				if(!err){
					this.$message({
						message: '恭喜您提交成功',
						type: 'success'
					})
				}
			})
		  },
		  //城市定位
		  theLocation(){
		  	// var city = document.getElementById("cityName").value;
		  	let point = null;
		  	if(this.form.city != ""){
		  		this.citys.map(e=>{
		  			e.options.map(n=>{
		  				if(n.value == this.form.city){
		  					point = new BMap.Point(n.coordinate[1],n.coordinate[0]);
		  				}
		  			})
		  		})
		  		this.map.centerAndZoom(point,12);      // 用城市名设置地图中心点
				this.map.addControl(new BMap.NavigationControl());    
				// this.map.addControl(new BMap.ScaleControl());    
				// this.map.addControl(new BMap.OverviewMapControl());    
				// this.map.addControl(new BMap.MapTypeControl());    
		  	}
		  },
		  //地址搜索
		  querySearch(queryString, cb) {
		  	let options = {
		  		onSearchComplete: (results)=>{
		  			// 判断状态是否正确
		  			this.results = [];
		  			if (this.local.getStatus() == BMAP_STATUS_SUCCESS){
		  				for (let i = 0; i < results.getCurrentNumPois(); i ++){
		  					results.getPoi(i).value = results.getPoi(i).title;
		  					this.results.push(results.getPoi(i))
		  				}
		  			}else{}
		  			cb(this.results);
		  		}
		  	};
		  	this.local = new BMap.LocalSearch(this.map, options);
		  	if(queryString!==""){
		  		this.local.search(queryString)
		  	}else{
		  		cb([]);
		  	}
		  },
		  //结果搜索定位
		  searchList(){
			  let result = this.results.filter(e=>{
				  return e.value == this.form.address;
			  })[0]
			  this.form.address = result.address;
			  let point = new BMap.Point(result.point.lng,result.point.lat);
			  this.map = new BMap.Map("l-map"); 
			  this.map.centerAndZoom(point,18);
			  this.map.addControl(new BMap.NavigationControl());
			  let marker = new BMap.Marker(point);        // 创建标注    
			  this.map.addOverlay(marker);               // 将标注添加到地图中 
			  marker.enableDragging(); //可拖拽
			  marker.addEventListener("click", (e)=>{
				  //确认当前坐标
				  this.form.coordinate = e.point;
				  this.form.latitude = e.point.lat;
				  this.form.longitude = e.point.lng;
				  console.log(this.form);
				}); 
		  },
		  regionChange(){
			  this.form.store_sort = this.storeClass[this.form.regionP].children[0].id;
		  }
		},
		mounted(){
			this.map = new BMap.Map("l-map"); 
			//初始化定位城市（北京）
			this.theLocation();
		},
		created() { 
			//分类遍历
			utils.ajax.call(this, 'index/hall/store_sort', {}, (data, err) => {
				if(!err){
					data.map(e=>{
						if(e.sup_id==0){
							e.children = [];
							this.storeClass.push(e);
						}else{
							let target = this.storeClass.findIndex(n=>{
								return n.id == e.sup_id; 
							})
							this.storeClass[target].children.push(e);
						}
					})
					//设置默认值
					this.form.regionP = 0;
					this.form.store_sort = this.storeClass[this.form.regionP].children[0].id;
				}
			})
		}
	}
</script>

<style lang="less">
	.contact_box{
		width: 90%;
		max-width: 630px;
		margin: 0 auto;
		padding-bottom: 180px;
		p{
			font-size: 14px;
			line-height: 24px;
			margin-bottom: 30px;
		}
		.contact_icon{
			width: 24px;
			height: 24px;
			vertical-align: middle;
			display: inline-block;
			font-size: 0;
			line-height: 0;
			margin-right: 8px;
			&.contact_tel{
				background: url(../../../assets/images/contact_tel.svg) no-repeat;
				background-size: 100% 100%;
			}
			&.contact_address{
				background: url(../../../assets/images/contact_address.svg) no-repeat;
				background-size: 100% 100%;
			}
			&.contact_email{
				background: url(../../../assets/images/contact_email.svg) no-repeat;
				background-size: 100% 100%;
			}
		}
		strong{
			font-weight: normal;
			color: #596573;
			padding-left: 18px;
		}
	}
</style>