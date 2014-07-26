angular.module('angular-validad-blitzer.provider', [])

.provider('blitzer', function () {

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
