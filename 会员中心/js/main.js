requirejs.config(window.requirejs_cfg);
require(["jquery", "plugins", "modules", "plugins/cometd", "plugins/ajaxlogin"],
    function ($, plugins, modules, cometd, ajaxLogin) {
/*
        $.ajaxSetup({
            statusCode: {
                403: function () {
                    ajaxLogin.showLoginDialog();
                }
            }
        });
*/
        cometd.comet.join();
        $(document).ready(function () {
            plugins.init();
            modules.init();
        });

});