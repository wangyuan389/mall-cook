const jwt = require('jsonwebtoken');
const serect = 'token';  //密钥，不能丢

const addToken = (userinfo) => { //创建token并导出
    const token = jwt.sign({
        id: userinfo.id,
        account: userinfo.account,
    }, serect, { expiresIn: '1h' });
    return token;
};

const provingToken = (token) => {

    if (token) {
        
        // 解析
        let decoded = jwt.decode(token, serect);

        console.log('解析token');
        console.log(decoded);
        
        return decoded;
    }
};

module.exports = {
    addToken,
    provingToken
}