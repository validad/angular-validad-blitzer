;
(function () {
  angular.module('angular-validad-blitzer.directive', []).directive('blitzer', function () {
    'use strict';
    return {
      restrict: 'E',
      replace: true,
      controller: [
        '$rootScope',
        '$scope',
        '$timeout',
        'blitzer',
        function ($rootScope, $scope, $timeout, blitzer) {
          $scope.blitzers = [];
          blitzer.subscribe(function (state, blitzers) {
            $scope.blitzers.push({
              state: state,
              msg: blitzers
            });
          });
        }
      ],
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
  angular.module('angular-validad-blitzer', [
    'angular-validad-blitzer.provider',
    'angular-validad-blitzer.directive'
  ]);
  angular.module('angular-validad-blitzer.provider', []).provider('blitzer', function () {
    'use strict';
    var states = ['notify'];
    this.defineStates = function (customStates) {
      states = states.concat(customStates);
    };
    this.$get = function () {
      return Blitzer.build(states);
    };
    var Blitzer = function () {
      this.listeners = [];
      this.subjects = {};
    };
    Blitzer.prototype.add = function (name) {
      this.subjects[name] = function () {
        var args = Array.prototype.slice.call(arguments);
        this.fire(name, args);
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
    Blitzer.build = function (states) {
      var blitzer = new Blitzer();
      angular.forEach(states, function (state) {
        blitzer.add(state);
      });
      return blitzer;
    };
  });
}());