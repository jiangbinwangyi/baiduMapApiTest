<template>
	<el-row class="service_box">
		<el-col :span="8" :offset="3" :xs="{span: 22, offset: 1}">
			<el-card>
				<div slot="header">客户端 功能介绍</div>
				<div>
					<p>术前，一站式，从了解到进店，从兴趣到消费</p>
					<p>术后，AI内容分发，指导全渠道曝光二次引流</p>
					<p>专属优惠，引导，对比分析</p>
					<p></p>
					<el-button type="primary">客户端演示</el-button>
				</div>
			</el-card>
		</el-col>
		<el-col :span="8" :offset="1" :xs="{span: 22, offset: 1}">
			<el-card>
				<div slot="header">医生端 功能介绍</div>
				<div>
					<p>节约渠道成本</p>
					<p>精准O2O.提高线下成单率</p>
					<p>专业运营曝光.节约术后转介绍成本</p>
					<p>协调医患双方关系</p>
					<el-button type="primary">医生端功能演示</el-button>
				</div>
			</el-card>
		</el-col>
	</el-row>
</template>

<script>
	export default {
		data() {
			return {

			}
		}
	}
</script>

<style lang="less">
	.service_box{
		padding: 20px 0;
		
		p{
			font-size: 14px;
			color: #222;
			margin-bottom: 20px;
			line-height: 1;
			vertical-align: middle;
			&:before{
				content: "";
				font-size: 0;
				display: inline-block;
				width: 6px;
				height: 6px;
				background: #3D6EB7;
				vertical-align: middle;
				border-radius: 50%;
				margin-right: 8px;
			}
		}
		.el-button{
			background: #3D6EB7;
			border: #3D6EB7;
			width: 100%;
			font-size: 16px;
			line-height: 30px;
			margin-top: 30px;
		}
	}
</style>
