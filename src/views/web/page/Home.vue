<template>
	<div class="home_main">
		<div class="home_content">
			<h1>华人商家的免费广告平台</h1>
			<el-form :inline="true" :model="address" class="home_address">
				<el-row>
					<el-col :span="4">
						<el-form-item>
							<el-select v-model="address.city" filterable size="large" @change="theLocation()">
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
					</el-col>
					<el-col :span="17">
						<el-form-item>
							<el-autocomplete
							   style="width: 520px;"
							  v-model="address.info"
							  :fetch-suggestions="querySearch"
							   size="large"
							  placeholder="请输入您的订餐地址（写字楼、小区或学校等）"
							></el-autocomplete>
						</el-form-item>
					</el-col>
					<el-col :span="3">
						<el-form-item style="width: 100%;margin: 0;">
							<el-button type="warning" size="large" @click="searchList()">搜索</el-button>
						</el-form-item>
					</el-col>
				</el-row>
			</el-form>
			<div class="home_code">
				<img src="../../../assets/images/home_code.png">
				<p>扫码下载私生活APP 尽享品质生活</p>
				<el-row>
				  <el-button type="warning">IPhone 下载</el-button>
				  <el-button type="warning">Android 下载</el-button>
				</el-row>
			</div>
		</div>
		<div id="l-map"></div>
	</div>
</template>

<script>
	import utils from '@/utils/index'
	import BMap from 'BMap'
	
	export default{
		data(){
			return {
				map: null,
				local: null,
				address:{
					city: "Beijing",
					info: ""
				},
				results: [],
				citys:[{
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
				}]
			}
		},
		beforeMount() {},
		mounted(){
			this.map = new BMap.Map("l-map"); 
			//初始化定位城市（北京）
			this.theLocation();
		},
		methods:{
			//城市定位
			theLocation(){
				// var city = document.getElementById("cityName").value;
				let point = null;
				if(this.address.city != ""){
					this.citys.map(e=>{
						e.options.map(n=>{
							if(n.value == this.address.city){
								point = new BMap.Point(n.coordinate[1],n.coordinate[0]);
							}
						})
					})
					this.map.centerAndZoom(point,12);      // 用城市名设置地图中心点
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
				  let points = this.results.filter(e=>{
					  return e.value == this.address.info;
				  })[0].point
				  let point = new BMap.Point(points.lng,points.lat);
				  this.map.centerAndZoom(point,18);
				  
				  console.log(points);
				  //存一下坐标,再跳转到列表页
				  this.$store.commit('setCoordinate',points);
				  this.$router.push({path: '/businessList'})
			  },
		},
		beforeDestroy() {
			
		}
	}
</script>

<style lang="less">
	.home_main{
		background: url(../../../assets/images/yunying.png) no-repeat center center;
		background-size: cover;
		width: 100%;
		height: 884px;
	}
	.home_content{
		width: 100%;
		max-width: 1440px;
		margin: 0 auto;
		h1{
			text-align: center;
			color: #fff;
			padding-top: 4%;
			font-size: 46px;
			font-weight: normal;
		}
		.home_address{
			padding-top: 4%;
			width: 750px;
			margin: 0 auto;
			.el-input__inner{
				height: 55px;
			}
			.el-form-item__content{
				width: 100%;
			}
			.el-button{
				padding: 0;
				width: 100%;
				height: 55px;
				line-height: 55px;
			}
		}
		.home_code{
			text-align: center;
			padding-top: 8%;
			p{
				color: #fff;
				line-height: 60px;
				font-size: 14px;
			}
		}
	}
</style>
