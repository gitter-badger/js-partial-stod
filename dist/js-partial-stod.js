/**
 * @overview A partial to return the duration as a number (string to duration).
 *
 * @module js/partial/stod
 * @version 0.0.1
 *
 * @author Richard King <richrdkng@gmail.com> [GitHub]{@link https://github.com/richrdkng}
 * @license MIT
 */

/**
 * UMD - [returnExports.js pattern]{@link https://github.com/umdjs/umd/blob/master/templates/returnExports.js}
 * For more information and license, check the link below:
 * [UMD GitHub Repository]{@link https://github.com/umdjs/umd}
 */
(function(root, factory) {
    // AMD
    /* istanbul ignore next: ignore coverage test for UMD */
    if (typeof define === 'function' && define.amd) {
        define([], factory);

    // CommonJS
    } else if (typeof module === 'object' && module.exports) {
        module.exports = factory();

    // Browser
    } else {
        root.js_partial_stod = factory();
    }
}(this, function() {
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

            // constants
        var DAYS_IN_MS    = 86400000,
            HOURS_IN_MS   = 3600000,
            MINUTES_IN_MS = 60000,
            SECONDS_IN_MS = 1000,

            // options - default values
            returnUnitAs      = 'ms',
            roundMilliseconds = true,
            roundReturnUnit   = false,

            // general variables
            pattern  = /([\d.]+)\s*(\w+)/g,
            duration = 0,
            matches,
            value,
            unit,
            returnUnitDivider;

        if (options) {
            if (options.returnUnitAs) {
                returnUnitAs = options.returnUnitAs;
            }

            if (typeof options.roundMilliseconds === 'boolean') {
                roundMilliseconds = options.roundMilliseconds;
            }

            if (typeof options.roundReturnUnit === 'boolean') {
                roundReturnUnit = options.roundReturnUnit;
            }
        }

        // type guard
        if (typeof string !== 'string') {
            return duration;
        }

        // type and length guard
        if (typeof string === 'string' && string.length === 0) {
            return duration;
        }

        // split up input by pattern
        while ((matches = pattern.exec(string)) !== null) {
            value = parseFloat(matches[1]);
            unit  = matches[2];

            switch (unit) {
                case 'd':
                case 'day':
                case 'days':
                    duration += value * DAYS_IN_MS;
                    break;

                case 'h':
                case 'hour':
                case 'hours':
                    duration += value * HOURS_IN_MS;
                    break;

                case 'm':
                case 'min':
                case 'minute':
                case 'minutes':
                    duration += value * MINUTES_IN_MS;
                    break;

                case 's':
                case 'sec':
                case 'second':
                case 'seconds':
                    duration += value * SECONDS_IN_MS;
                    break;

                case 'ms':
                case 'millisecond':
                case 'milliseconds':
                    duration += value;
                    break;

                // skip default case - not needed
            }
        }

        // if duration has any meaningful value than 0, only then run through additional options
        if (duration > 0) {

            if (roundMilliseconds) {
                // round down decimals of milliseconds
                duration = Math.round(duration);
            }

            // if the returnUnit is in different unit, than the default 'ms' (milliseconds)
            if (returnUnitAs !== 'ms') {
                returnUnitDivider = 1;

                switch (returnUnitAs) {
                    case 'd':
                    case 'day':
                    case 'days':
                        returnUnitDivider = DAYS_IN_MS;
                        break;

                    case 'h':
                    case 'hour':
                    case 'hours':
                        returnUnitDivider = HOURS_IN_MS;
                        break;

                    case 'm':
                    case 'min':
                    case 'minute':
                    case 'minutes':
                        returnUnitDivider = MINUTES_IN_MS;
                        break;

                    case 's':
                    case 'sec':
                    case 'second':
                    case 'seconds':
                        returnUnitDivider = SECONDS_IN_MS;
                        break;

                    // skip default case - not needed
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
