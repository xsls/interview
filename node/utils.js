const util = require('util');
exports.puts = util.deprecate(() => {
  for (var i = 0, len = arguments.length; i < len; ++i) {
    process.stdout.write(arguments[i] + '\n');
    console.log('>>>>>>>>>>');
  }
}, 'util.puts: Use console.log instead');
