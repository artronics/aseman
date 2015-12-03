'use strict';

angular.module('asemanApp')
    .factory('configService',[function(){

       var config = {} ;

        var ConnectionStatus = Object.freeze({
            NOT_CONFIG:1,
            NOT_CONNECTED:2,
            CONNECTED:3
        });

        config.network={
            isStarted : false,
        };

        config.db = {
            status : ConnectionStatus.NOT_CONFIG,
            url:'127.1.1.1:3306',
            user : 'root',
            pass:''
        };

        config.isConnected = function (cs) {
            if(cs === ConnectionStatus.CONNECTED) {
                return true;
            }
            else {
                return false;
            }
        };

        return config;
    }]);

