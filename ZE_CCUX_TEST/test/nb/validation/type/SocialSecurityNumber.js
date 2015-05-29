/*global sap*/
/*jslint nomen:true*/

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

        var CustomType = SimpleType.extend('tm.message.validation.type.SocialSecurityNumber', {
            constructor: function (oFormatOptions, oConstraints) {
                SimpleType.apply(this, arguments);
            }
        });

        CustomType.prototype.getName = function () {
            return 'tm.message.validation.type.SocialSecurityNumber';
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

            var ssnRegex = /^\d{3}-?\d{2}-?\d{4}$/;
            if (!(ssnRegex.test(oValue))) {
                throw new ParseException('Invalid SSN');
            }

            return oValue.toLowerCase();
        };

        // Model value meets constraint requirements
        CustomType.prototype.validateValue = function (oValue) {
            console.log('validateValue ... [' + oValue + ']');

            if ((oValue === undefined || oValue === null || oValue.trim() === '') && this.oConstraints.mandatory) {
                throw new ValidateException('SSN cannot be empty');
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
