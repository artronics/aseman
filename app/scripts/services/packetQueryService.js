'use strict';
angular.module('asemanApp')
    .service('packetQuery',['$timeout','packets',function ($timeout,packets) {
        var service={};
        var queryResult=
        {
            packet:{},
            isAvailable: false,
            isStarted:false,
            numOfQueries: 10,
            numOfSent: 0,
            numOfSucceed: 0,
            numOfFailed: 0,
            delay: 1000,
            status: 'stopped'
        };
        service.getQueryResult=function(){
            return queryResult;
        };

        var sendPacket=function(packet){
            //packets.post(packet);
        };
        service.start=function(qPacket,num,delay){
            if (queryResult.status==='stopped' | queryResult.status==='finished') {
                queryResult.isAvailable = true;
                queryResult.isStarted = true;

                queryResult.packet = qPacket;
                queryResult.delay = delay;
                queryResult.numOfQueries=num;

                queryResult.status = 'running';
                //run first send immediately
                service.onTimeout();
                service.myTimeout = $timeout(service.onTimeout, queryResult.delay);
            }
            else {
                throw new Error("Can not run start method wile query is running");
            }
        };
        service.onTimeout=function(){
            if (queryResult.numOfSent===queryResult.numOfQueries){
                queryResult.isStarted = false;
                queryResult.status='finished';
                $timeout.cancel(service.myTimeout);
                return;
            }

            queryResult.numOfSent++;
            sendPacket(queryResult.packet);
        }
        
        service.stop = function () {
            $timeout.cancel(service.myTimeout);
            queryResult.isStarted = false;
            queryResult.status='stopped';
        };
        
        return service;
    }]);
