var assert = require('assert'),
    vars   = require('./variables'),
    stod   = require(vars.path);

module.exports = {
    'stod' : {
        'default cases' : {
            'stod()' : function () {
                assert(
                    stod() === 0
                );
            }
        },

        'general cases' : {
            "stod('3.5d')" : function () {
                assert(
                    stod('3.5d') === 302400000
                );
            },

            "stod('1.5h')" : function () {
                assert(
                    stod('1.5h') === 5400000
                );
            },

            "stod('175min')" : function () {
                assert(
                    stod('175min') === 10500000
                );
            },

            "stod('42sec')" : function () {
                assert(
                    stod('42sec') === 42000
                );
            },

            "stod('300ms')" : function () {
                assert(
                    stod('300ms') === 300
                );
            },

            "stod('1 hour 23 minutes 45 seconds 600 milliseconds')" : function () {
                assert(
                    stod('1 hour 23 minutes 45 seconds 600 milliseconds') === 5025600
                );
            }
        },

        'edge cases' : {
            'stod(300)' : function () {
                assert(
                    stod(300) === 0
                );
            }
        }
    }
};

