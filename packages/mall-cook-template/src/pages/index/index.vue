<!--
 * @Description: What's this for
 * @Autor: WangYuan
 * @Date: 2022-01-08 11:04:13
 * @LastEditors: WangYuan
 * @LastEditTime: 2022-01-08 12:19:28
-->
<template>
	<view class="content">
		<template v-for="item in list">
			<McTitle v-if='item.component=="McTitle"' :styles='item.styles' :attrs='item.attrs' :value='item.value'></McTitle>
			<!-- <McTitle v-if='item.component=="McTitle"' v-bind='{id:1}'></McTitle> -->
		</template>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list: []
			}
		},
		onLoad() {
			this.getMall()
		},
		methods: {
			getMall() {
				uni.request({
					url: 'http://110.42.184.128:3000/project/getById',
					method: 'POST',
					data: {
						id: "61b9997d03c79373691b874d"
					},
					success: (res) => {
						console.log('....');
						console.log(res.data.data.pages[0].componentList);
						this.list = res.data.data.pages[0].componentList
					}
				})
			}
		}
	}
</script>

<style>
	.content{
		background-color: #f5f5f5;
		height: 100vh;
	}
</style>
