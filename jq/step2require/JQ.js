define(function(require, exports, module) {
        var JQ = require('./core'),
            global = require('./global'),
            init = require('./init');

            global(JQ);
			init(JQ);

        return JQ;
});