export default {
	order: [{
			name: '待付款',
			img: '/static/user/daifukuan.png',
			jumpUrl:'/pages/user/order/order?tab=PendingPayment'
		},
		{
			name: '待收货',
			img: '/static/user/daishouhuo.png',
			jumpUrl:'/pages/user/order/order?tab=PendingReceipt'
		},
		{
			name: '待评价',
			img: '/static/user/daipingjia.png',
			jumpUrl:'/pages/user/order/order?tab=Received'
		},
		{
			name: '退款/售后',
			img: '/static/user/shouhou.png',
			jumpUrl:'/pages/user/order/order?tab=Refund'
		}
	],
	myFn: [{
			name: '优惠券',
			img: '/static/user/youhuiquan.png',
			jumpUrl:'/pages/user/coupon/coupon'
		},
		{
			name: '我的红包',
			img: '/static/user/hongbao.png',
			jumpUrl:'/pages/user/redPacket/redPacket'
		},
		{
			name: '我的收藏',
			img: '/static/user/shoucang.png',
			jumpUrl:'/pages/user/like/like'
		},
		{
			name: '浏览记录',
			img: '/static/user/liulanjilu.png',
			jumpUrl:'/pages/user/history/history'
		}
	],
	tools: [{
			name: '我的钱包',
			img: '/static/user/qianbao.png'
		},
		{
			name: '官方客服',
			img: '/static/user/kefu.png'
		},
		{
			name: '用户反馈',
			img: '/static/user/yonghufankui.png'
		},
		{
			name: '资质证照',
			img: '/static/user/zizhizhengzhao.png'
		},
		{
			name: '协议规则',
			img: '/static/user/xieyiguize.png'
		},
		{
			name: '线下门店',
			img: '/static/user/xianxiamendian.png'
		},
		{
			name: '更新日志',
			img: '/static/user/update.png',
			url:'/pages/user/update/update'
		}
	]

}
