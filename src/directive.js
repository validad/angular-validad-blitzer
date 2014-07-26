angular.module('angular-validad-blitzer.directive', [])

.directive('blitzer', function (blitzer) {

    'use strict';

    return {
        restrict: 'E',
        replace: true,
        template: blitzer.template || function () {
            return ['<div',
                    '   class="alert alert-{{blitzer.state}}"',
                    '   role="alert"',
                    '   ng-click="close($index)"',
                    '   ng-repeat="blitzer in blitzers"',
                    '>',
                    '   {{blitzer.msg}}',
                    '</div>'
                ].join('');
        },
        controller: function ($rootScope, $scope, $timeout, blitzer) {
            $scope.blitzers = [];

            blitzer.subscribe(function (state, incomingBlitzers) {
                angular.forEach(incomingBlitzers, function (blitzer) {
                    this.push({
                        state: state,
                        msg: blitzer
                    });
                }, $scope.blitzers);
            });

            $scope.close = function (index) {
                $scope.blitzers.splice(index, 1);
            };
        }
    };
});
