const Koa = require('koa');
const Router = require('koa-router');
const staticfile = require('koa-static')
const path = require('path')
const bodyParser = require('koa-body');
const cors = require('koa-cors')

const router = new Router();

const { Sequelize, DataTypes } = require('sequelize')

const formdata = new Sequelize('formdata', 'root', 'ahY4deiFie7aichoophairahpha7ier0', {
	host: '0.0.0.0',
	dialect: 'mysql',
    pool: {
		max: 5,
		min: 0,
		idle: 30000
	}
})

const Recruitment = formdata.define('papic_autumn2022', {
	name: DataTypes.STRING,
	sex: DataTypes.STRING,
	origin: DataTypes.STRING,
	birthday: DataTypes.STRING,
	major: DataTypes.STRING,
	class: DataTypes.STRING,
	dorm: DataTypes.STRING,
	number: DataTypes.STRING,
	phone: DataTypes.STRING,
	qq: DataTypes.STRING,
	mail: DataTypes.STRING,
	personality: DataTypes.TEXT,
	reason: DataTypes.STRING,
	want: DataTypes.TEXT,
	skill: DataTypes.TEXT,
	adjustment: DataTypes.STRING,
	department: DataTypes.TEXT,
	abilities: DataTypes.TEXT,
}, {
	timestamps: false,
	freezeTableName: true
})

Recruitment.sync({ force: true })


const app = new Koa()
app.use(bodyParser())
router.post("/submit",async (ctx, next) => {
	try {
		const body = ctx.request.body
		await Recruitment.create({
			name: body.name,
			sex: body.sex,
			origin:body.origin,
			birthday: body.birthday,
			major: body.major,
			class: body.class,
			dorm: body.dorm,
			number: body.number,
			phone: body.phone,
			qq: body.qq,
			mail: body.mail,
			personality: body.personality,
			reason: body.reason,
			want: body.want,
			skill: body.skill,
			adjustment: body.adjustment,
            department:body.department,
			abilities: body.abilities,
		})
		ctx.body = 'success'
		console.log(ctx.body)
		 await next()
	} catch (e) {
		ctx.body ='error'
	}
})

app.use(async (ctx,next) =>{
	ctx.set({
		'Access-Control-Allow-Origin': '*',
		'Access-Control-Allow-Methods': 'PUT, GET, POST, DELETE, OPTIONS',
		'Access-Control-Allow-Headers': 'X-Requested-With, Content-Type',
		'Access-Control-Allow-Credentials': 'true'
	})
	ctx.response.status = 200
	await next()
})

app.use(staticfile('public'))
app.use(cors())


app.use(router.routes())


app.listen(9988);
