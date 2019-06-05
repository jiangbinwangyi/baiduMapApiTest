<template>
	<div>
		<el-row>
			<el-col :span="18" :xs="24">
				<el-card shadow="never" class="dataChartBox">
					<div id="dataChart" style="width: 100%; height: 60vw; max-height: 800px;"></div>
				</el-card>
			</el-col>
			<el-col :span="6" :xs="24">
				<el-card shadow="never" style="border: none;">
					<div class="dataType">
						<ul>
							<li v-for="(item,index) in dataType" :class="{'active': item.type==activeType}" :key="index" @click="changeData(item)">
								<span v-text="item.text"></span>
							</li>
						</ul>
					</div>
				</el-card>
			</el-col>
		</el-row>
	</div>
</template>

<script>
	import echarts from 'echarts'
	import axios from 'axios'

	export default {
		data() {
			return {
				dataChart: null,
				activeType: '',
				dataType: [
					{text:'曝光度',type: 'baoguang',color: '#EF8282'},
					{text:'进店量',type:'jindian',color: '#EBBE5B'},
					{text:'成单营业额',type:'yingye',color: '#86CD6D'},
					{text:'术后患者转介绍进店',type:'shuhoujindian',color: '#80B2E0'},
					{text:'术后患者转介绍营业额',type:'shuhouyingye',color: '#B09EE9'}
				],
				chartOption: {
					tooltip: {
						trigger: 'item',
						formatter: function(params) {
							if(params.name !== "") {
								let val = params.value[2] || 0;
								return params.name + ' : ' + val;
							}
						}
					},
					geo: {
						map: 'newMap',
						left: 0, top: 0, right: 0, bottom: 0,
						itemStyle: {
							areaColor: '#fff',
							borderColor: '#e7e7e7',
							borderWidth: 1,
							color: '#000',
						},
						label: {
							normal: {
								show: true,
								color: '#e7e7e7',
								position: 'inside'
							},
						},
						silent: true,
					},
					grid: {
						top: 0,
						bottom: 0,
						left: 0,
						right: 0
					},
					series: [{
						type: 'effectScatter',
						coordinateSystem: 'geo',
					    showEffectOn: 'render',
					    rippleEffect: {
					        brushType: 'stroke'
					    },
					    hoverAnimation: true,
					    label: {
					        normal: {
					            formatter: '{b}',
					            position: 'right',
					            show: true,
					            fontSize: 12,
					            color: '#222',
								borderColor: '#666',
					        }
					    },
					    itemStyle: {
					        normal: {
					            color: '#fff',
					            shadowBlur: 0,
					            shadowColor: '#333'
					        }
					    },
					    //symbol: 'pin',  //可设置为图片
					    symbolSize: function (val) {
							return val[2] / 200;
						},
						data: null,
					}]
				}
			}
		},
		mounted() {
			this.$nextTick(function(){
				this.chartInit();
			})
		},
		methods:{
			chartInit(){
				//初始化
				this.dataChart = echarts.init(document.getElementById('dataChart'))
				
				let cityJson = require('./echartsgeojson/china_geo.json');
				echarts.registerMap('newMap', cityJson);
				
				this.changeData(this.dataType[0])
			},
			changeData(item){
				this.activeType = item.type;
				
				let dataChart = require('./dataChart.json');

				let geoCoordMap = dataChart.coordinates;
				
				let convertData = (data)=>{
				    let res = [];
				    for (let i = 0; i < data.length; i++) {
				        let geoCoord = geoCoordMap[data[i].name];
				        if (geoCoord) {
				            res.push({
				                name: data[i].name,
				                value: geoCoord.concat(data[i].value),
				                itemStyle: {
					                color: item.color,
					            },
				            });
				        }
				    }
				    return res;
				};
				
				this.chartOption.series[0].data = convertData(dataChart[item.type]);
				
				this.dataChart.setOption(this.chartOption);
			}
		}
	}
</script>

<style lang="less">
	.dataChartBox{
		padding: 16px;
		border: none;
	}
	.dataType li{
		cursor: pointer;
		margin: 30px 0 50px;
		color: #222;
		opacity: .5;
	}
	.dataType li.active{
		opacity: 1;
		span{
			border-bottom: solid 2px #3484F5;
		}
	}
</style>
