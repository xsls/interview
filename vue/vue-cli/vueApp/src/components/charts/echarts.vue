<template>
	<div class="echarts-container" v-el:echarts></div>
</template>
<script>
	import echarts from 'echarts/lib/echarts';
	import 'echarts/lib/chart/line';
	import 'echarts/lib/chart/bar';
	import 'echarts/lib/component/tooltip';
	import 'echarts/lib/component/title';
	import 'echarts/lib/component/legend';
	export default {
		props: {
			options: {
				type: Object,
				default: {}
			}
		},
		ready () {
			// 进行初始化
			this.chart = echarts.init(this.$els.echarts);
			this.chart.setOption({
				tooltip: this.options.tooltip || {},
				title: this.options.title || {},
				grid: {
					left: 60,
					top: 20,
					bottom: 20,
					right: 40
				},
				color: [''],
				xAxis: this.options.xAxis || {},
				yAxis: this.options.yAxis || {},
				series: this.options.series || {},
				legend: this.options.legend || {}
			});
			$(window).on('resize', this.onResize);
		},
		methods: {
			onResize () {
				if (this.st) {
					window.clearTimeout(() => {
						this.chart.resize();
					}, 100)
				}
			},
			beforeDestory () {
				$(window).off('resize', this.onResize);
			}
		}
 	}
</script>
<style scoped lang="less">
	.echarts-container{
		padding-top: 5px;
		padding-bottom: 20px;
	}
</style>