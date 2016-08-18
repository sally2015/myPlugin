define(function(require, exports, module) {
    var JQ = require('./core'),
        global = require('./global'),
        init = require('./init'),
        sizzleInit = require('./sizzleInit');

        global(JQ);
		init(JQ);
		sizzleInit(JQ);

    return JQ;
});