'use strict';

module.exports = function(app) {
    // inject:start
    require('./login')(app);
    require('./newsfeed')(app);
    // inject:end
};