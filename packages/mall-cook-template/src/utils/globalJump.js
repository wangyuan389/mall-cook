export default function jump(target) {
    console.log('jump....');
    let { name, data } = target

    switch (name) {
        case 'home':
            uni.switchTab({
                url: "/pages/index/home",
            });
            break;
        case 'goods':
            console.log('tiaozhuan goods');
            uni.navigateTo({
                url: '/pages/index/goods',
                data
            })
            break;
    }
}