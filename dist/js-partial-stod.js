/**
 * @overview A partial to return the duration as a number (string to duration).
 *
 * @module js/partial/stod
 * @version 0.0.0
 *
 * @author Richard King <richrdkng@gmail.com> [GitHub]{@link https://github.com/richrdkng}
 * @license MIT
 */

/**
 * UMD - [returnExports.js pattern]{@link https://github.com/umdjs/umd/blob/master/templates/returnExports.js}
 * For more information and license, check the link below:
 * [UMD GitHub Repository]{@link https://github.com/umdjs/umd}
 */
(function (root, factory) {
    // AMD
    /* istanbul ignore next: ignore coverage test for UMD */
    if (typeof define === 'function' && define.amd) {
        define([], factory);

    // Nodejs
    } else if (typeof module === 'object' && module.exports) {
        module.exports = factory();

    // Browser
    } else {
        root.js_partial_stod = factory();
    }
}(this, function () {
    'use strict';

    /**
     * Returns the duration as a number (string to duration).
     *
     * @function stod
     *
     * @param {string}  string  The duration(s) to parse.
     *                          Multiple durations are allowed in the string separated by spaces and/or commas.
     *                          Only positive (non-negative) durations are allowed.
     *                          The valid duration units are: days, hours, minutes, seconds, milliseconds.
     *                          Possible duration unit variations:
     *                              - days:         'd',  'day',         'days'
     *                              - hours:        'h',  'hour',        'hours'
     *                              - minutes:      'm',  'minute',      'minutes'
     *                              - seconds:      's',  'second',      'seconds'
     *                              - milliseconds: 'ms', 'millisecond', 'milliseconds'
     *
     * @param {Object}  [options]                        Additional options to filter the returned duration.
     * @param {string}  [options.returnUnitAs='ms']      The unit in which the returned duration will be converted.
     *                                                   By default, the returned duration will be in milliseconds.
     *                                                   Possible units are the same as for the duration(s) to parse
     *                                                   (from 'days' to 'milliseconds').
     * @param {boolean} [options.roundMilliseconds=true] If the returned duration (in milliseconds by default)
     *                                                   will have decimals, round it to the nearest integer.
     * @param {boolean} [options.roundReturnUnit=false]  If the returned duration in custom unit will have decimals,
     *                                                   round it to the nearest integer.
     * @example
     *     stod('3.5h');
     *     stod('1.5h');
     *     stod('175min');
     *     stod('42 sec');
     *     stod('300ms');
     *     stod('1 hour 23 minutes 45 seconds 600 milliseconds');
     *
     * @returns {number} The duration in number.
     *                   If the given duration is invalid, the returned duration will be 0 (zero).
     */
    return function stod(string, options) {

        // options - default values
        var returnUnitAs      = 'ms',
            roundMilliseconds = true,
            roundReturnUnit   = false;

        var pattern  = /([\d.]+)\s*(\w+)/g,
            duration = 0,
            matches;

        if (options) {
            returnUnitAs = options.returnUnitAs
                             ? options.returnUnitAs
                             : returnUnitAs;

            roundMilliseconds = options.roundMilliseconds
                                    ? options.roundMilliseconds
                                    : roundMilliseconds;

            roundReturnUnit   = options.roundReturnUnit
                                    ? options.roundReturnUnit
                                    : roundReturnUnit;
        }

        // type, and sanity guards
            // type guard
            if (typeof string !== 'string') {
                return duration;
            }

            // type and length guard
            if (typeof string === 'string' && string.length === 0) {
                return duration;
            }

        while ((matches = pattern.exec(string)) !== null) {
            var value = parseFloat(matches[1]);
            var unit  = matches[2];
            var ms    = 0;

            // NaN guard
            if (value === value) {
                switch (unit) {
                    case 'd':
                    case 'day':
                    case 'days':
                        ms = value * 86400000;
                        break;

                    case 'h':
                    case 'hour':
                    case 'hours':
                        ms = value * 3600000;
                        break;

                    case 'm':
                    case 'min':
                    case 'minute':
                    case 'minutes':
                        ms = value * 60000;
                        break;

                    case 's':
                    case 'sec':
                    case 'second':
                    case 'seconds':
                        ms = value * 1000;
                        break;

                    case 'ms':
                    case 'millisecond':
                    case 'milliseconds':
                        ms = value;
                        break;
                }
            }

            duration += ms;
        }

        // if duration has any meaningful value, than 0, only then run through additional options
        if (duration > 0) {

            if (roundMilliseconds) {
                // round down decimals of milliseconds
                duration = Math.round(duration);
            }

            // if the returnUnit is in different unit, than the default 'ms' (milliseconds)
            if (returnUnitAs !== 'ms') {
                var returnUnitDivider = 1;

                switch (returnUnitAs) {
                    case 'd':
                    case 'day':
                    case 'days':
                        returnUnitDivider = 86400000;
                        break;

                    case 'h':
                    case 'hour':
                    case 'hours':
                        returnUnitDivider = 3600000;
                        break;

                    case 'm':
                    case 'min':
                    case 'minute':
                    case 'minutes':
                        returnUnitDivider = 60000;
                        break;

                    case 's':
                    case 'sec':
                    case 'second':
                    case 'seconds':
                        returnUnitDivider = 1000;
                        break;
                }

                duration /= returnUnitDivider;

                if (roundReturnUnit) {
                    duration = Math.round(duration);
                }
            }
        }

        return duration;
    };
}));
