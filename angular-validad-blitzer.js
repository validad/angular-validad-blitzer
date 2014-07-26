;
(function () {
  angular.module('angular-validad-blitzer.directive', []).directive('blitzer', [
    'blitzer',
    function (blitzer) {
      'use strict';
      return {
        restrict: 'E',
        replace: true,
        scope: { group: '@' },
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
        controller: [
          '$rootScope',
          '$scope',
          '$timeout',
          'blitzer',
          function ($rootScope, $scope, $timeout, blitzer) {
            $scope.blitzers = [];
            blitzer.subscribe(function (state, group, incomingBlitzers) {
              if (group === $scope.group) {
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
        ]
      };
    }
  ]);
  angular.module('angular-validad-blitzer', [
    'angular-validad-blitzer.provider',
    'angular-validad-blitzer.directive'
  ]);
  angular.module('angular-validad-blitzer.provider', []).provider('blitzer', function () {
    'use strict';
    var states = ['notify'];
    var template = null;
    this.defineStates = function (customStates) {
      states = states.concat(customStates);
    };
    this.defineTemplate = function (tmplStr) {
      template = tmplStr;
    };
    this.$get = function () {
      return Blitzer.build(states, template);
    };
    var Blitzer = function (template) {
      this.listeners = [];
      this.subjects = {};
      this.template = template;
    };
    Blitzer.prototype.add = function (name) {
      this.subjects[name] = function (group) {
        var args = Array.prototype.slice.call(arguments, 1);
        this.fire(name, group, args);
      }.bind(this);
      // extend Blitzer with subject as function
      this[name] = this.subjects[name];
    };
    Blitzer.prototype.subscribe = function (listener) {
      this.listeners.push(listener);
    };
    Blitzer.prototype.fire = function () {
      var args = Array.prototype.slice.call(arguments);
      this.listeners.forEach(function (listener) {
        listener.apply(this, args);
      }.bind(this));
    };
    Blitzer.build = function (states, template) {
      var blitzer = new Blitzer(template);
      angular.forEach(states, function (state) {
        blitzer.add(state);
      });
      return blitzer;
    };
  });
}());