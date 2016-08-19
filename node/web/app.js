const koa = require('koa');
const app = new koa();
app.use(async(ctx, next) => {
	await next();
	ctx.response.type = 'text/html';
	ctx.response.body = '<h1>Hello koa2</h1>'
});
app.listen(3000);
console.log('this is a koa2 app');