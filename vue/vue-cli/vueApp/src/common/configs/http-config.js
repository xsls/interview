import VueResource from 'vue-resource';
import Vue from 'vue';
import NativeHttp from '../utils/NativeHttp';
import Cache from '../utils/cache';
Vue.use(VueResource);
const env = process.env.NODE_ENV;
Vue.http.options.crossOrigin = true;
Vue.http.options.xhr = {withCredentials: true};
if(window.webViewJavascriptBridge) {
	Vue.http.options.client = NativeHttp;
}

function addMockToken (request) {
	request.params._token = '';
};
Vue.http.interceptord.push({
	request (request) {
		request.headers = {
			token: Cache.token,
			...request.headers,
			'Content-Type': 'application/json;charset=utf-8'
		};
		if (env !== 'production') {
			addMockToken(request);
		}
		return request;
	},
	response (response) {
		const {status} = response;
		if (status === 401) {
		}
		return response;
	}
});
let urlMap;
if (env === 'production') {
	urlMap = {
		A: '/hiap-admin/'
	};
} else {
	urlMap = {
		A: 'hiap-admin/'
	};
}
function getUrl (url, key = 'A') {
	return urlMap[key] + url;
};
function install (Vue) {
	Vue.prototype.$getUrl = getUrl;
	Vue.getUrl = getUrl;
};
Vue.use(install);
export default getUrl;



