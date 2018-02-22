'use strict';
var APP_NAME = "PORTFOLIO";

angular.module(
    APP_NAME, ['ui.router', 'angular-jwt'])



    .factory('Excel', function ($window) {
        var uri = 'data:application/vnd.ms-excel;base64,',
            template = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head><body><table>{table}</table></body></html>',
            base64 = function (s) { return $window.btoa(unescape(encodeURIComponent(s))); },
            format = function (s, c) { return s.replace(/{(\w+)}/g, function (m, p) { return c[p]; }) };
        return {
            tableToExcel: function (tableId, worksheetName) {
                var table = $(tableId),
                    ctx = { worksheet: worksheetName, table: table.html() },
                    href = uri + base64(format(template, ctx));
                return href;
            }
        };
    })


    .directive('showErrors', function () {
        return {
            restrict: 'A',
            link: function (scope, el) {
                el.bind('blur', function () {
                    var valid = // is valid logic
                        el.toggleClass('has-error', valid);
                });
            }
        }
    })



    .directive('numbersOnly',
    function () {
        return {
            require: 'ngModel',
            link: function (scope, element, attrs, modelCtrl) {
                modelCtrl.$parsers.push(function (inputValue) {
                    var transformedInput = inputValue ? inputValue
                        .replace(/[^\d.-]/g, '') : null;
                    if (transformedInput != inputValue) {
                        modelCtrl.$setViewValue(transformedInput);
                        modelCtrl.$render();
                    }

                    return transformedInput;
                });
            }
        };
    })

    // .directive('rowAppender',
    // function () {
    //     return {
    //         restrict: 'A',
    //         link: function (scope, element, attrs) {
    //             var tableBody = angular.element(element).parent();
    //             for (var i = 0; i < 3; i++) {
    //                 var td0 = angular.element(document.createElement('td')).html('<input type="text" class="input-sm fpms-textbox" value="123">');
    //                 tableBody.append(td0);
    //             }
    //         }
    //     };
    // })


    .config(
    function ($stateProvider, $urlRouterProvider, $httpProvider,
        jwtOptionsProvider, $compileProvider) {

        /* $compileProvider.urlSanitizationWhitelist(/^\s*(https?|ftp|mailto|file|javascript):/); */
        $compileProvider.aHrefSanitizationWhitelist(/^\s*(http|https?|ftp|mailto|file|data):/);

        jwtOptionsProvider.config({
            whiteListedDomains: ['localhost'],
            unauthenticatedRedirectPath: '/login',
            tokenGetter: ['options', function (options) {
                if (options) {
                    return null;
                }
                return localStorage.getItem('JWT');
            }]
        });

        $httpProvider.interceptors.push('jwtInterceptor');
        // home
        $stateProvider.state('home', {
            url: '/home',
            templateUrl: "../views/home.html",
            controller: 'homeController'

        });


        // error handler
        $stateProvider.state('error', {
            url: '/error',
            templateUrl: '404.html'
        });

        // logout
        // $stateProvider.state('logout', {
        //     url: '/logout',
        //     onEnter: function ($state, $localStorage) {
        //         localStorage.removeItem("JWT");
        //         $localStorage.$reset();
        //         $state.go("login");
        //     }

        // });

        $urlRouterProvider.otherwise('/home');
    })
    // .run(
    // function (authManager, $location, $rootScope,
    //     $state, jwtHelper, userService) {
    //     $rootScope.dateFormat = "MM-dd-yyyy";
    //     $rootScope.dateFormatByyear = "yyyy";
    //     $rootScope.fullDate = "EEEE, MMMM d, y";

        // $rootScope.$on('$locationChangeSuccess', function (event, next,
        //     current) {
        //     authManager.checkAuthOnRefresh();
        //     if (next.indexOf("logout") > -1) {
        //     } else {
        //         authManager.checkAuthOnRefresh();
        //         if (authManager.isAuthenticated()) {
        //             var role = jwtHelper.decodeToken(userService.getToken())[0].userroleId;
        //             if (next.indexOf("login") > -1) {
        //                 userService.redirectUser(role);
        //             } try {
        //                 if ($state.current.data.TYPE !== role) {
        //                     // userService.redirectUser(role);
        //                 }
        //             } catch (E) {
        //                 // userService.redirectUser(role)
        //             }
        //         } else {
        //             $location.path('/login');
        //             authManager.redirectWhenUnauthenticated();
        //         }
        //     }
        //     // console.log("app");
        // });
    // });
