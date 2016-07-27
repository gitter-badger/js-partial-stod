var assert = require('assert'),
    vars   = require('./variables'),
    stod   = require(vars.path);

module.exports = {
    'stod' : {
        'default cases' : {
            'stod()' : function () {
                assert(stod() === 0);
            }
        },

        'general cases' : {
            "stod('3.5d')" : function () {
                assert(stod('3.5d')    === 302400000);
                assert(stod('3.5day')  === 302400000);
                assert(stod('3.5days') === 302400000);
            },

            "stod('1.5h')" : function () {
                assert(stod('1.5h')     === 5400000);
                assert(stod('1.5hour')  === 5400000);
                assert(stod('1.5hours') === 5400000);
            },

            "stod('175min')" : function () {
                assert(stod('175m')       === 10500000);
                assert(stod('175min')     === 10500000);
                assert(stod('175minute')  === 10500000);
                assert(stod('175minutes') === 10500000);
            },

            "stod('42sec')" : function () {
                assert(stod('42s')       === 42000);
                assert(stod('42sec')     === 42000);
                assert(stod('42second')  === 42000);
                assert(stod('42seconds') === 42000);
            },

            "stod('300ms')" : function () {
                assert(stod('300ms')           === 300);
                assert(stod('300millisecond')  === 300);
                assert(stod('300milliseconds') === 300);
            },

            "stod('1 hour 23 minutes 45 seconds 600 milliseconds')" : function () {
                assert(stod('1 hour 23 minutes 45 seconds 600 milliseconds') === 5025600);
            }
        },

        'extended cases' : {
            "stod('1.5 d', {returnUnitAs : 'd'})" : function () {
                assert(stod('1.5 d', { returnUnitAs : 'd' }) === 1.5);
            },

            "stod('1.5 d', {returnUnitAs : 'h'})" : function () {
                assert(stod('1.5 d', { returnUnitAs : 'h' }) === 36);
            },

            "stod('1.5 d', {returnUnitAs : 'm'})" : function () {
                assert(stod('1.5 d', { returnUnitAs : 'm' }) === 2160);
            },

            "stod('1.5 d', {returnUnitAs : 's'})" : function () {
                assert(stod('1.5 d', { returnUnitAs : 's' }) === 129600);
            },

            "stod('36 h', {returnUnitAs : 'd', roundReturnUnit : true})" : function () {
                assert(stod('36 h', { returnUnitAs : 'd', roundReturnUnit : true }) === 2);
                assert(stod('35 h', { returnUnitAs : 'd', roundReturnUnit : true }) === 1);
            },

            "stod('100.5 ms', {roundReturnUnit : true})" : function () {
                assert(stod('100.5 ms', { roundReturnUnit : true }) === 101);
                assert(stod('100.49 ms', { roundReturnUnit : true }) === 100);
            },

            "stod('100.5 ms', {roundMilliseconds : true})" : function () {
                assert(stod('100.5 ms', { roundMilliseconds : true }) === 101);
            },

            "stod('100.5 ms', {roundMilliseconds : false})" : function () {
                assert(stod('100.498 ms', { roundMilliseconds : false }) === 100.498);
            }
        },

        'edge cases' : {
            'stod(300)' : function () {
                assert(stod(300) === 0);
            },

            "stod(0sec)" : function () {
                assert(stod('0sec') === 0);
            },

            "stod('')" : function () {
                assert(stod('') === 0);
            }
        }
    }
};

