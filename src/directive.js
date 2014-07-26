angular.module('angular-validad-blitzer.directive', [])

.directive('blitzer', function (blitzer) {

    'use strict';

    return {
        restrict: 'E',
        replace: true,
        scope: {
            group: '@'
        },
        template: blitzer.template || function () {
            return [
                '<div class="m-blitzer m-blitzer--small" ng-show="!!blitzers.length">',
                '   <span',
                '       class="m-blitzer__msg is-{{blitzer.state}}"',
                '       ng-click="close($index)"',
                '       ng-repeat="blitzer in blitzers"',
                '   >',
                '       <span>{{blitzer.message}}</span>',
                '   </span>',
                '</div>'
            ].join('');
        },
        controller: function ($rootScope, $scope, $timeout, blitzer) {
            $scope.blitzers = [];
            blitzer.subscribe(function (state, group, incomingBlitzers) {
                if(group === $scope.group) {
                    angular.forEach(incomingBlitzers, function (blitzer) {
                        this.push({
                          state: state,
                          message: blitzer
                        });
                    }, $scope.blitzers);
                    return;
                }
            });

            $scope.close = function (index) {
                $scope.blitzers.splice(index, 1);
            };
        }
    };
});
