# Ionic Facebook like application
This is a show case for building a simple mobile facebook like application

![ionic-fb1](https://cloud.githubusercontent.com/assets/4806944/4914108/a29674cc-64bd-11e4-80cf-8b9ea5d8705a.png)  ![ionic-fb2](https://cloud.githubusercontent.com/assets/4806944/4914112/a7585ef8-64bd-11e4-935f-c9f133634e2b.png)


This app was built using generator-angular-famous-ionic (https://www.npmjs.org/package/generator-angular-famous-ionic).   
It uses browserify to bundle the file together. For more info see the github repo https://github.com/thaiat/generator-angular-famous-ionic.

## Install
```
npm install
```

This should also install bower packages. In case it didn't, run
```
bower install
```

Change the facebook AppId in `client/scripts/main.js` with your own.   
This require that you have your own facebook app, (https://developers.facebook.com)   
Make sure you configure correctly the callback url of the application


## Usage
Run
```
gulp browsersync
```

This will run a browser sync server. (Usually 0.0.0.0 port 5000). You can change the default parameters in `gulp_tasks/common/constants.js` **serve** property.

Grab its url (you will see it in the console after you execute the command), open a browser and navigate to it.
You can now see the mobile app.

You can also use your mobile to try it out.



## Testing
Run
```
gulp karma
```

Expore the other gulp tasks with the command
```
gulp help
```



