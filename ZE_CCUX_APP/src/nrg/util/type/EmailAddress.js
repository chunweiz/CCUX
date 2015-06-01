/*global sap*/
/*jslint vars: true, plusplus: true, devel: true, nomen: true, indent: 4, maxerr: 50 regexp: true */

/*
sap.ui.define(
    [
        'jquery.sap.global',
        'sap/ui/model/SimpleType',
        'sap/ui/model/FormatException',
        'sap/ui/model/ParseException',
        'sap/ui/model/ValidateException'
    ],

    function ($, SimpleType, FormatException, ParseException, ValidateException) {
        'use strict';

        var CustomType = SimpleType.extend('nrg.util.type.EmailAddress', {
            constructor: function (oFormatOptions, oConstraints) {
                SimpleType.prototype.apply(this, arguments);
            }
        });

        CustomType.prototype.getName = function () {
            return 'nrg.util.type.EmailAddress';
        };

        CustomType.prototype.setFormatOptions = function (oFormatOptions) {
            this.oFormatOptions = oFormatOptions;
        };

        CustomType.prototype.setConstraints = function (oConstraints) {
            this.oConstraints = oConstraints;

            if ($.isEmptyObject(this.oConstraints)) {
                this.oConstraints = {
                    mandatory: false
                };
            }
        };

        // Expected model type
        CustomType.prototype.parseValue = function (oValue, sInternalType) {
            console.log('parseValue ... ' + oValue);


            if (oValue === undefined || oValue === null || oValue.trim() === '') {
                return oValue;
            }

            var emailRegex = /^[^.\s()\[\],;:@][^\s()\[\],;:@]+[^.\s()\[\],;:@]@[a-zA-Z0-9]+\..+/i;
            if (!(emailRegex.test(oValue))) {
                throw new ParseException('Invalid email');
            }

            return oValue.toLowerCase();
        };

        // Model value meets constraint requirements
        CustomType.prototype.validateValue = function (oValue) {
            console.log('validateValue ... [' + oValue + ']');

            if ((oValue === undefined || oValue === null || oValue.trim() === '') && this.oConstraints.mandatory) {
                throw new ValidateException('Email cannot be empty');
            }

            if (oValue.length < 1 || oValue.length > 241) {
                throw new ValidateException('Email Address length exceeds(allowed upto 241 char)');
            }

            return oValue;
        };

        // Model to Output
        CustomType.prototype.formatValue = function (oValue, sInternalType) {
            console.log('formatValue ... ' + oValue);


            return oValue;

        };
        return CustomType;
    }
);
*/
