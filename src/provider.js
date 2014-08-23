angular.module('angular-validad-blitzer.provider', [])

.provider('blitzer', function () {
    'use strict';

    var topics = ['notify'];

    var Blitzer = function () {
        this.listeners = [];
        this.subjects = {};
        angular.forEach(topics, this.add, this);
    };

    Blitzer.prototype.add = function (topic) {
        this[topic] = this.subjects[topic] = function (group) {
            this.publish(topic, Array.prototype.slice.call(arguments));
        }.bind(this);
    };

    Blitzer.prototype.subscribe = function (listener) {
        this.listeners.push(listener);
    };

    Blitzer.prototype.publish = function () {
        var args = Array.prototype.slice.call(arguments);
        angular.forEach(this.listeners, function (listener) {
            listener.apply(this, args);
        }.bind(this));
    };

    // Provider Methods
    this.topics = function (userTopics) {
        topics = topics.concat(userTopics);
    };

    this.$get = function () {
        return new Blitzer();
    };
});
