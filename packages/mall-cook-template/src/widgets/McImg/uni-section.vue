<template>
	<view class="uni-section">
		<view class="uni-section-header" nvue>
			<view v-if="type" class="uni-section__head">
				<view :class="type" class="uni-section__head-tag"/>
			</view>
			<view class="uni-section__content">
				<text :class="{'distraction':!subTitle}" :style="{color:color}" class="uni-section__content-title">{{ title }}</text>
				<text v-if="subTitle" class="uni-section__content-sub">{{ subTitle }}</text>
			</view>
		</view>
		<view :style="{padding: padding ? '10px' : ''}">
			<slot/>
		</view>
	</view>
</template>

<script>

	/**
	 * Section 标题栏
	 * @description 标题栏
	 * @property {String} type = [line|circle] 标题装饰类型
	 * 	@value line 竖线
	 * 	@value circle 圆形
	 * @property {String} title 主标题
	 * @property {String} subTitle 副标题
	 */

	export default {
		name: 'UniSection',
		emits:['click'],
		props: {
			type: {
				type: String,
				default: ''
			},
			title: {
				type: String,
				default: ''
			},
			color:{
				type: String,
				default: '#333'
			},
			subTitle: {
				type: String,
				default: ''
			},
			padding: {
				type: Boolean,
				default: false
			}
		},
		data() {
			return {}
		},
		watch: {
			title(newVal) {
				if (uni.report && newVal !== '') {
					uni.report('title', newVal)
				}
			}
		},
		methods: {
			onClick() {
				this.$emit('click')
			}
		}
	}
</script>
<style lang="scss" scoped>
	$uni-primary: #2979ff !default;
	
	.uni-section {
		background-color: #fff;
		// overflow: hidden;
		margin-top: 10px;
	}
	.uni-section-header {
		position: relative;
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: row;
		align-items: center;
		padding: 12px 10px;
		// height: 50px;
		font-weight: normal;
	}
	.uni-section__head {
		flex-direction: row;
		justify-content: center;
		align-items: center;
		margin-right: 10px;
	}

	.line {
		height: 12px;
		background-color: $uni-primary;
		border-radius: 10px;
		width: 4px;
	}

	.circle {
		width: 8px;
		height: 8px;
		border-top-right-radius: 50px;
		border-top-left-radius: 50px;
		border-bottom-left-radius: 50px;
		border-bottom-right-radius: 50px;
		background-color: $uni-primary;
	}

	.uni-section__content {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: column;
		flex: 1;
		color: #333;
	}

	.uni-section__content-title {
		font-size: 14px;
		color: $uni-primary;
	}

	.distraction {
		flex-direction: row;
		align-items: center;
	}

	.uni-section__content-sub {
		font-size: 12px;
		color: #999;
		line-height: 16px;
		margin-top: 2px;
	}
</style>
