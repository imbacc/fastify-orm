 /**
 * 利用redis限流
 * spname参数为api名称命名 例：apit_sms
 * spid索引 例：apit_sms_手机号码
 * time 为时间 xx/秒		默认60秒
 * count 为次数			默认 60秒/10次
 */

const config = require('./config.js')
const router = config.limit

module.exports = async (fastify, spname, spid, time = 30, count = 10, update = false) => {
	
	//false为关闭redis限流
	if(!config.apitime) return true
	
	const val = spname + '_' + spid
	const key_id = 'apit_' + val
	const key_id2 = 'apin_' + val
	const cfg = router[spname.split('?')[0]]
	
	if(typeof cfg === 'object' && !update){
		time = cfg[0]
		count = cfg[1]
	}
	
	const api_time = await fastify.get_redis(key_id) 	//获取 访问API时间间隔
	const api_count = await fastify.get_redis(key_id2) 	//获取 访问API次数间隔的时间
	const datetime = new Date().getTime()
	const cache = time * count
	
	// console.log('api_time=',api_time)
	// console.log('api_count=',api_count)

	if (api_time === '' || api_time === null || api_count === undefined) {
		fastify.set_redis(key_id, datetime, cache)
		fastify.set_redis(key_id2, 1, cache)
	} else {
		//Api时间限制
		let second = (datetime - parseInt(api_time)) / 1000
		// console.log('second='+second)

		if (second < time) {

			//Api次数限制
			let add = parseInt(api_count) + 1

			if (add > count) {
				return false
			} else {
				fastify.set_redis(key_id2, add, cache)
			}
		} else {
			fastify.set_redis(key_id, datetime, cache)
			fastify.set_redis(key_id2, 1, cache)
		}
	}
	
	return true
}