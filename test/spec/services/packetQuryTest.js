'use strict';

describe('Service: PacketQueryService', function () {
    var queryService;
    var packetS;
    var $timeout;
    var httpBackend, Restangular,q;


    beforeEach(module('asemanApp'));

    // then we use the $injector to obtain the instances of the services we would like to mock/use
    // but not of the service that we want to test
    beforeEach(inject(function( _Restangular_, _$httpBackend_, $q) {
        httpBackend = _$httpBackend_;
        Restangular = _Restangular_;
        q = $q;
    }));

    module(function ($provide) {
        $provide.value('PacketService', packetS);//function () {
        //    this.post=jasmine.createSpy('post').andCallFake(function (packet) {
        //        console.log('it is modke'+packet);
        //    })
        //});
    });

    beforeEach(inject(function($injector) {
        $timeout = $injector.get('$timeout');
    }));

    beforeEach(inject(function (packetQuery) {
        queryService = packetQuery;
    }));

    describe('Packet Query', function () {
        it('should getQueryResult', function () {
            expect(queryService.getQueryResult()).not.toBe(null);
        });
        it('should change the status to finish if it finishes', function(){
            queryService.start('succeed packet',1,1000);
            $timeout.flush();
            var queryResult = queryService.getQueryResult();
            expect(queryResult.status).toBe('finished');
        });
        //there is a problem with $timeout.flush(). it ticks
        //for second start().
        //it('should be started after finishes', function(){
        //    queryService.start('succeed packet',1,1000);
        //    $timeout.flush();
        //
        //    queryService.start('succeed packet',1,1000);
        //    var queryResult = queryService.getQueryResult();
        //    expect(queryResult.status).toBe('running');
        //});


        describe('should send packet after each timeout tick', function () {
            beforeEach(function () {
                queryService.start('succeed packet',2,1000);
            });
            it('should substitude queryResult with provided data', function(){
                var qr = queryService.getQueryResult();
                expect(qr.numOfQueries).toBe(2);
                expect(qr.packet).toBe('succeed packet');
                expect(qr.delay).toBe(1000);
            });
            it('should reset all queryResults', function(){
                var qr = queryService.getQueryResult();
                expect(qr.numOfSucceed).toBe(0);
                expect(qr.numOfFailed).toBe(0);
            });
            it('should change status to running', function(){
                expect(queryService.getQueryResult().status).toBe('running');
            });
            it('should change isStarted to true', function(){
                var qr = queryService.getQueryResult();
                expect(qr.isStarted).toBe(true);
            });
            it('should change isAvailable to true', function(){
                var qr = queryService.getQueryResult();
                expect(qr.isAvailable).toBe(true);
            });
            it('should throw exp if we call start while it is running', function(){
                expect(function(){queryService.start('foo',2,1000);})
                    .toThrow();
            });
            it('should send first packet immediately', function(){
                expect(queryService.getQueryResult().numOfSent).toBe(1);
            });

            it('should increase numOfSent after each timeout tick', function(){
                $timeout.flush();
                expect(queryService.getQueryResult().numOfSent).toBe(2);
            });
            it('when numOfQueries equals numOfSent timout should stop', function () {
                //$timeout.flush();
                //except(queryService)
            });

        });

        describe('stop functionality', function () {
            beforeEach(function () {
                queryService.start('succeed packet',2,1000);
            });
            it('should set status to stop if stop is called', function(){
                queryService.stop();
                expect(queryService.getQueryResult().status).toBe('stopped');
            });
            it('should change isStarted to false', function(){
                queryService.stop();
                expect(queryService.getQueryResult().isStarted).toBe(false);
            });
            it('should keep isAvailable always true afer first run', function(){
                queryService.stop();
                expect(queryService.getQueryResult().isAvailable).toBe(true);
            });
        });

        //describe('Mock PacketService: Restangular', function () {
        //    it('should call post method', function () {
        //        // set up a spy on Restangular, so we test with what
        //        // parameters it was called, also allow the call to continue
        //        spyOn(Restangular, 'one').andCallThrough();
        //        // a mock to be returned from http. We would later expect
        //        // our service to 'enhance' this mock with an additional property
        //        var mockToReturn = {
        //            someProp: 'someValue',
        //            someOtherProp: 'someOtherValue'
        //        };
        //        var packet ={};
        //        httpBackend.expectPOST('/packets')
        //            // respond with the mock
        //            .respond(mockToReturn);
        //
        //        packetS.post(packet);
        //
        //        expect(Restangular.post).toHaveBeenCalledWith('someVariable');
        //
        //        httpBackend.flush();
        //        expect(newRes).toEqual({
        //            someProp: 'someValue',
        //            someOtherProp: 'someOtherValue',
        //            newlyCreatedProp : 'newlyCreatedProp'
        //        });
        //
        //    });
        //});
    });
});
