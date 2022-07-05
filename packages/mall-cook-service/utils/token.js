const jwt = require('jsonwebtoken');
const config = require('../config');

const secret = config.jwtSecret;  //密钥，不能丢

const addToken = (userinfo) => { //创建token并导出
    const token = jwt.sign({
        id: userinfo.id,
        account: userinfo.account,
    }, secret, { expiresIn: '1h' });
    return token;
};

const provingToken = (token) => {

    if (token) {

        // 解析
        let decoded = jwt.verify(token, secret);

        console.log('解析token');
        console.log(decoded);

        return decoded;
    }
};

module.exports = {
    addToken,
    provingToken
}