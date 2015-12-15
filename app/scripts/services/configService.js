'use strict';

angular.module('asemanApp')
    .factory('config',[function(){

       var ConfigService = {} ;

        var ConnectionStatus = Object.freeze({
            NOT_CONFIG:1,
            NOT_CONNECTED:2,
            CONNECTED:3
        });

        ConfigService.network={
            isStarted : false,
        };

        ConfigService.db = {
            status : ConnectionStatus.NOT_CONFIG,
            url:'127.1.1.1:3306',
            user : 'root',
            pass:''
        };

        ConfigService.isConnected = function (cs) {
            if(cs === ConnectionStatus.CONNECTED) {
                return true;
            }
            else {
                return false;
            }
        };
        ConfigService.foo=function(){
            ConfigService.isConnected('kir');
        }

        return ConfigService;
    }]);

