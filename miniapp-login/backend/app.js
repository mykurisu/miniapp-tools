const Axios = require('axios');
const Koa = require('koa');
const koaBody = require('koa-body');

const app = new Koa();
const config = {
    appid: '',
    secret: '',
}

app.use(koaBody({
    jsonLimit: '1kb'
}));

app.use(async (ctx) => {
    const { body } = ctx.request;
    const { code } = body;
    const grant_type = 'authorization_code';
    const authLink = `https://api.weixin.qq.com/sns/jscode2session?appid=${config.appid}&secret=${config.secret}&js_code=${code}&grant_type=${grant_type}`;
    const res = await Axios.get(authLink);
    const wxSession = res.data;
    ctx.body = wxSession;
})

app.listen(6000);
