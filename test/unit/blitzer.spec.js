describe('angular-validad-blitzer', function () {
    var topics = ['notify', 'danger', 'warning', 'success'];

    beforeEach(module('angular-validad-blitzer'));
    beforeEach(module(function (blitzerProvider) {
        blitzerProvider.topics(topics);
    }));

    describe('blitzer service', function () {
        it('should have topics as function', inject(function (blitzer) {
            angular.forEach(topics, function (topic) {
                spyOn(blitzer, topic);
                blitzer[topic]();
                expect(blitzer[topic]).toHaveBeenCalled();
            });
        }));

        it('should subscribe', inject(function (blitzer) {
            var message = ['mymessage', {'ping': 'pong'}];

            // first subscribe a callback
            blitzer.subscribe(function (topic, messages) {
                expect(message).toEqual(messages);
            });
            // invoke blitzer(s)
            angular.forEach(topics, function (topic) {
                blitzer[topic].apply(null, message);
            });

        }));
    });
});
