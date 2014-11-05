'use strict';

module.exports = function(app) {
    // inject:start
    require('./facebook')(app);
    // inject:end
};