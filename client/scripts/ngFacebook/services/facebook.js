'use strict';
var servicename = 'facebook';

module.exports = function(app) {

    var dependencies = ['$window', '$rootScope', '$q', '$http'];

    function service($window, $rootScope, $q, $http) {
        var FB_LOGIN_URL = 'https://www.facebook.com/dialog/oauth';
        // By default we store fbtoken in sessionStorage. This can be overriden in init()
        var tokenStore = $window.localStorage;
        var fbAppId;
        var oauthRedirectURL;
        // Indicates if the app is running inside Cordova
        var runningInCordova;

        document.addEventListener('deviceready', function() {
            runningInCordova = true;
        }, false);

        /**
         * Initialize the ngFacebook module. You must use this function and initialize the module with an appId before you can
         * use any other function.
         * @param {String} appId - The id of the Facebook app
         * @param {String} redirectURL - The OAuth redirect URL. Optional. If not provided, we use sensible defaults.
         * @param {Object} store - The store used to save the Facebook token. Optional. If not provided, we use sessionStorage.
         */
        var init = function(appId, redirectURL, store) {
            fbAppId = appId;
            if(redirectURL) {
                oauthRedirectURL = redirectURL;
            }
            if(store) {
                tokenStore = store;
            }
        };

        /**
         * Application-level logout: we simply discard the token.
         */
        var logout = function() {
            tokenStore.fbtoken = undefined;
        };

        /**
         * Login to Facebook using OAuth. The app will redirect to the facebook page and back the application page.
         * @param {String} fbScope - The set of Facebook permissions requested
         */
        var login = function(fbScope) {
            if(!fbAppId) {
                throw new Error('Facebook App Id is not set');
            }
            fbScope = fbScope || ''; //email,user_friends,public_profile,user_about_me,user_actions.news,user_actions.video,user_activities,user_events';
            logout();
            oauthRedirectURL = oauthRedirectURL || document.location.origin;
            if(!runningInCordova) {
                window.location = FB_LOGIN_URL + '?client_id=' + fbAppId + '&redirect_uri=' + oauthRedirectURL + '&response_type=token&display=popup&scope=' + fbScope;
            } else {
                window.location = FB_LOGIN_URL + '?client_id=' + fbAppId + '&redirect_uri=' + oauthRedirectURL + '&response_type=token&display=popup&scope=' + fbScope;
            }

        };

        /**
         * @private
         * @param {String} queryString - The query string
         * @returns {Object} - The parsed query string available as an object
         */
        var parseQueryString = function(queryString) {
            var qs = decodeURIComponent(queryString);
            var obj = {};
            var params = qs.split('&');
            params.forEach(function(param) {
                var splitter = param.split('=');
                obj[splitter[0]] = splitter[1];
            });
            return obj;
        };

        /**
         * Checks the response url callback from facebook and store the access_token
         * @param {String} url - The url we are getting back from facebook
         * @returns {Boolean} - true if successfull, false otherwise
         */
        var oauthCallback = function(url) {
            // Parse the OAuth data received from Facebook
            var queryString;
            var obj;

            if(url.indexOf('access_token=') >= 0) {
                queryString = url.substr(url.indexOf('#') + 2);
                obj = parseQueryString(queryString);
                tokenStore.fbtoken = obj.access_token;
                return true;
            } else if(url.indexOf('error=') >= 0) {
                queryString = url.substring(url.indexOf('?') + 2, url.indexOf('#'));
                obj = parseQueryString(queryString);
                return false;
            } else {
                return false;
            }
        };

        /**
         * Lets you make any Facebook Graph API request.
         * @param {Object} obj - Request configuration object. Can include:
         *  method:  HTTP method: GET, POST, etc. Optional - Default is 'GET'
         *  path:    path in the Facebook graph: /me, /me.friends, etc. - Required
         *  params:  queryString parameters as a map - Optional
         * @returns {Promise} - returns a promise
         */
        var api = function(obj) {

            var method = obj.method || 'GET';
            var params = obj.params || {};

            params.access_token = tokenStore.fbtoken;

            return $http({
                method: method,
                url: 'https://graph.facebook.com' + obj.path,
                params: params
            })
                .error(function(data, status, headers, config) {
                    if(data.error && data.error.type === 'OAuthException') {
                        $rootScope.$emit('OAuthException');
                    }
                });
        };

        /**
         * Helper function to de-authorize the app
         * @returns {Promise} - returns a promise
         */
        var revokePermissions = function() {
            return api({
                method: 'DELETE',
                path: '/me/permissions'
            });
        };

        /**
         * Helper function for a POST call into the Graph API
         * @param {String} path - The path of the http post
         * @param {Object} params - The params
         * @returns {Promise} - returns a promise
         */
        var post = function(path, params) {
            return api({
                method: 'POST',
                path: path,
                params: params
            });
        };

        /**
         * Helper function for a GET call into the Graph API
         * @param {String} path - The path of the http get
         * @param {Object} params - The params
         * @returns {Promise} - returns a promise
         */
        var get = function(path, params) {
            return api({
                method: 'GET',
                path: path,
                params: params
            });
        };

        return {
            init: init,
            login: login,
            logout: logout,
            revokePermissions: revokePermissions,
            api: api,
            post: post,
            get: get,
            oauthCallback: oauthCallback
        };

    }
    service.$inject = dependencies;
    app.factory(servicename, service);
};