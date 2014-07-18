describe('angular-validad-blitzer', function () {
    var blitzer;

    beforeEach(module('angular-validad-blitzer'));

    beforeEach(inject(function (_blitzer_) {
        blitzer = _blitzer_;
    }));

    //beforeEach(module(function (_blitzerProvider_) {
        //blitzerProvider = _blitzerProvider_;
    //}));

    //describe('blitzer provider settings', function () {
        //var sampleStates = ['error', 'warning'];

        //it('should extend default blitzer states', function () {
            //inject(function (blitzer) {
                //expect(blitzer.error).toBeDefined();
            //});
        //});
    //});

    describe('blitzer basic service', function () {

        it('should be defined', function () {
            expect(blitzer).toBeDefined();
        });

        it('should have default notify function', function () {
            expect(typeof blitzer.notify).toBe('function');
        });
    });
});
