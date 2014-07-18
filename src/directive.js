angular.module('angular-validad-blitzer.directive', [])

.directive('blitzer', function () {

    'use strict';

    return {
        restrict: 'E',
        replace: true,
        controller: function ($rootScope, $scope, blitzer) {
            blitzer.subscribe(function (state, messages) {
                $scope.messages = messages;
                $scope.state = state;
            });
            $scope.close = function () {

            };
        },
        template: function () {
            return [
                '<div',
                '   class="alert alert-{{state}}"',
                '   role="alert"',
                '   ng-repeat="message in messages"',
                '>',
                '   {{message}}',
                '</div>'
            ].join('');
        }
    };
});
