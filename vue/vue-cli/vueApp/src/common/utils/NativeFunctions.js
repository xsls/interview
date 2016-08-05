import router from './NativeRouter';
const wvbridge = window.WebViewJavascriptBridge;
export function nativeNav () {
};
nativeNav.close = (cb) => {
	if (wvbridge) {
		wvbridge.callHandler('nativeNav_close', null, () => {
			cb();
		});
	} else {
		window.alert('nativeNav_close');
	}
};
function init () {
	window.nativeRouterGo = router;
};
export default init;