'use strict';

define([], function () {
    
    var routeResolver = function () {
        
        /*this.$get = function () {
            return this;
        }*/
        
        this.$get = ['$http', '$q', '$window', 'securityService', function securityServicesFactory($http, $q, $window, securityService) {
            return {
                routeConfig : this.routeConfig,
                securityServices: securityService
            }
        }];

        this.routeConfig = function () {
            var viewsDirectory = '/app/views/',
                controllersDirectory = '/app/controllers/',
                routes = [],

                setBaseDirectories = function (viewsDir, controllersDir) {
                    viewsDirectory = viewsDir;
                    controllersDirectory = controllersDir;
                },

                getViewsDirectory = function () {
                    return viewsDirectory;
                },

                getControllersDirectory = function () {
                    return controllersDirectory;
                },

                setRoutes = function (dynamicRoutes) {
                    routes = dynamicRoutes;
                },

                getRoutes = function () {
                    return routes;
                };

            return {
                setBaseDirectories : setBaseDirectories,
                getControllersDirectory : getControllersDirectory,
                getViewsDirectory : getViewsDirectory,
                setRoutes: setRoutes,
                getRoutes: getRoutes
            };
        }();

        this.route = function (routeConfig) {
            var resolve = function (baseName, path, controllerAs, secure, visible, params) {
                if (!path) path = '';
                
                var routeDef = {};
                var baseFileName = baseName.charAt(0).toLowerCase() + baseName.substr(1);
                routeDef.url = '/' + path;
                routeDef.templateUrl = routeConfig.getViewsDirectory() + path + '/' + baseFileName + '.html';
                routeDef.controller = baseName + 'Controller';
                
                if (controllerAs)
                    routeDef.controllerAs = controllerAs;
                
                routeDef.secure = (secure) ? secure : false;
                routeDef.visible = (visible) ? visible : false;
                
                if (params)
                    routeDef.params = params;
                
                routeDef.resolve = {
                    load: ['$q', '$rootScope', function ($q, $rootScope) {
                            var dependencies = [routeConfig.getControllersDirectory() + baseFileName + 'Controller.js'];
                            return resolveDependencies($q, $rootScope, dependencies);
                        }],
                    authorized: ['$q', 'securityService', '$state', 'loginState', function ($q, securityService, $state, loginState) {
                            var deferred = $q.defer();                         
                            var destRoute = routeDef.name;

                            securityService.validate(routeDef.secure).then(function (response) {
                                if (response == true) {
                                    deferred.resolve(response);
                                } else if (response.data && response.data.valid) {
                                    deferred.resolve(response.data.valid);
                                }
                            }, function (error) {
                                deferred.reject(false);
                                $state.go(loginState, { redirectRoute: destRoute });
                            });
                            
                            return deferred.promise;
                        }]
                };
                
                return routeDef;
            },

                resolveObj = function (route) {
                    if (!route.path) path = '';
                    
                    var routeDef = {};
                    var baseFileName = route.baseName.charAt(0).toLowerCase() + route.baseName.substr(1);
                    routeDef.url = '/' + route.path;
                    routeDef.templateUrl = routeConfig.getViewsDirectory() + route.path + '/' + baseFileName + '.html';
                    routeDef.controller = route.baseName + 'Controller';
                    
                    if (route.controllerAs)
                        routeDef.controllerAs = route.controllerAs;
                    
                    routeDef.secure = (route.secure) ? route.secure: false;
                    routeDef.visible = (route.visible) ? route.visible : false;
                    
                    if (route.params)
                        routeDef.params = route.params;
                    
                    routeDef.resolve = {
                        load: ['$q', '$rootScope', function ($q, $rootScope) {
                                var dependencies = [routeConfig.getControllersDirectory() + baseFileName + 'Controller.js'];
                                return resolveDependencies($q, $rootScope, dependencies);
                            }],
                        authorized: ['$q', 'securityService', function ($q, securityService) {
                                var deferred = $q.defer();
                                
                                securityService.validate(routeDef.secure).then(function (response) {
                                    if (response == true) {
                                        deferred.resolve(response);
                                    } else if (response.data && response.data.valid) {
                                        deferred.resolve(response.data.valid);
                                    }
                                }, function (error) {
                                    deferred.reject(false);
                                });
                                
                                return deferred.promise;
                            }]
                    };
                    
                    return routeDef;
                },

                gatherRoutes = function () {
                    $.ajax({
                        method: "GET",
                        url: "./api/routes", 
                        cache: false,
                        success: function (result) {
                            if (result && result.routes != null) {
                                routeConfig.setRoutes(result.routes);
                            }
                        }
                    })
                },

                resolveDependencies = function ($q, $rootScope, dependencies) {
                    var defer = $q.defer();
                    require(dependencies, function () {
                        defer.resolve();
                        $rootScope.$apply();
                    });

                    return defer.promise;
                };
            
            return {
                resolve: resolve,
                resolveObj: resolveObj,
                gatherRoutes: gatherRoutes
            }
        }(this.routeConfig);

    };

    var servicesApp = angular.module('routeResolverServices', ['securityResolverServices']);

    servicesApp.provider('routeResolver', routeResolver);
});