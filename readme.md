#Ionic framework winemaking app

This app tracks winemaking activities such as dates and inventory for the wine you make at home.

This is an early version.  Please see [this post](!http://mdegani.github.io/javascript,/angularjs,/ionic/2015/07/07/ionic-app-one.html) for a detailed description of the app: http://mdegani.github.io/javascript,/angularjs,/ionic/2015/07/07/ionic-app-one.html.

I will work on a video demo and post it soon.

Please see live demo here: http://winemaking.azurewebsites.net/www/#/home.

This app uses an API, which has been built in asp.net Web API 2.  Code is not yet available, but it is running live at http://wineapi.azurewebsites.net/Help.  This API can work with multiple end-users and uses oauth2, but the login page of the app has not been implemented.  I've temporarily hard-coded a bearer token into the app (see [www/app/services/configInfo.js](!https://github.com/mdegani/wine/blob/master/www/app/services/configInfo.js)).
