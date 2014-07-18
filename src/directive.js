angular.module('angular-validad-blitzer.directive', [])

.directive('blitzer', function () {

    'use strict';

    return {
        restrict: 'E',
        replace: true,
        controller: function ($rootScope, $scope, $timeout, blitzer) {
            $scope.blitzers = [];
            blitzer.subscribe(function (state, blitzers) {
                $scope.blitzers.push({
                    state: state,
                    msg: blitzers
                });
            });
        },
        template: function () {
            return [
                '<div',
                '   class="alert alert-{{blitzer.state}}"',
                '   role="alert"',
                '   ng-click="close($index)"',
                '   ng-repeat="blitzer in blitzers"',
                '>',
                '   {{blitzer.msg}}',
                '</div>'
            ].join('');
        }
    };
});
