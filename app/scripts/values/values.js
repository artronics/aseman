'use strict';

angular.module('asemanApp')
    .value('queryResult', {
        isAvailable: false,
        numOfQueries: 10,
        numOfSent: 0,
        numOfSucceed: 0,
        numOfFailed: 0,
        delay: 1000,
        status: 'stopped'
    });