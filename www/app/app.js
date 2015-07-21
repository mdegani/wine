// Ionic Starter App
// angular.module is a global place for creating, registering and retrieving Angular modules
// the 2nd parameter is an array of 'requires'



angular.module('winemakingApp', ['ionic', 'angular-cache'])
    .run(function ($ionicPlatform, CacheFactory) {
        $ionicPlatform.ready(function () {
            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
            // for form inputs)
            if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
                //hopefully this stops the form jumping when focusing on text input on ios:
                cordova.plugins.Keyboard.disableScroll(true);
            }

            if (window.StatusBar) {
                // org.apache.cordova.statusbar required
                StatusBar.styleLightContent();
            }
        });



    })

    .config(function ($stateProvider, $urlRouterProvider) {

            // https://github.com/angular-ui/ui-router
            $stateProvider
            .state('app', {
                url: "",
                abstract: true,
                templateUrl: "app/tabs.html"
            })

            .state('app.home', {
                cache: false,
                url: '/home',
                views: {
                    'tab-home': {
                        templateUrl: 'app/home/home.html'
                    }
                }
            })

            .state('app.batches', {
                cache: false,
                url: '/batches',
                views: {
                    'tab-batches': {
                        templateUrl: 'app/batches/batches.html'
                    }
                }
            })

            .state('app.batches-detail', {
                cache: false,
                url: '/batches/:id',
                views: {
                    'tab-batches': {
                        templateUrl: 'app/batches/batch.html'
                    }
                }
            })

            .state('app.batches-edit', {
                url: '/batches/Edit/:id',
                views: {
                    'tab-batches': {
                        templateUrl: 'app/batches/editBatch.html'
                    }
                }
            })

            .state('app.batches-edit2', {
                url: '/batches/Edit2/:id',
                views: {
                    'tab-batches': {
                        templateUrl: 'app/batches/editBatch2.html'
                    }
                }
            })

            .state('app.batches-sgreadings', {
                url: '/batches/sgreadings/:id',
                views: {
                    'tab-batches': {
                        templateUrl: 'app/batches/batchSGreadings.html'
                    }
                }
            })

            .state('app.batches-editDateplan', {
                url: '/batches/EditDatePlan/:id',
                views: {
                    'tab-batches': {
                        templateUrl: 'app/batches/editBatchDateplan.html'
                    }
                }
            })


            .state('app.batches-new', {
                url: '/batches/new',
                views: {
                    'tab-batches': {
                        templateUrl: 'app/batches/newBatch.html'
                    }
                }
            })

            .state('app.batches-inv', {
                url: '/batches/inv/:id',
                views: {
                    'tab-batches': {
                        templateUrl: 'app/batches/editInventory.html'
                    }
                }
            })

            .state('app.cellar-batch', {
                cache: false,
                url: '/cellar/:id',
                views: {
                    'tab-cellar': {
                        templateUrl: 'app/cellar/cellarBatch.html'
                    }
                }
            })

            .state('app.cellar', {
                cache: false,
                url: '/cellar',
                views: {
                    'tab-cellar': {
                        templateUrl: 'app/cellar/cellar.html'
                    }
                }
            });

        $urlRouterProvider.otherwise('/home');

    });
