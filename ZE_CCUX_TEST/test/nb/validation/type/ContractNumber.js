/*global sap*/
/*jslint vars: true, plusplus: true, devel: true, nomen: true, indent: 4, maxerr: 50 regexp: true */
/*global define */

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

        var CustomType = SimpleType.extend('tm.message.validation.type.ContractNumber', {
            constructor: function (oFormatOptions, oConstraints) {
                SimpleType.apply(this, arguments);
            }
        });

        CustomType.prototype.getName = function () {
            return 'tm.message.validation.type.ContractNumber';
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

            if (oValue === undefined || oValue === null) {
                return oValue;
            }

            if (isNaN(oValue)) {
                throw new ParseException('Invalid contract number');
            }

            return oValue.replace(/^(0+)/g, '');
        };

        // Model value meets constraint requirements
        CustomType.prototype.validateValue = function (oValue) {
            console.log('validateValue ... [' + oValue + ']');

            if ((oValue === undefined || oValue === null || oValue.trim() === '') && this.oConstraints.mandatory) {
                throw new ValidateException('Contract number cannot be empty');
            }

            if (oValue.length < 1 || oValue.length > 10) {
                throw new ValidateException('Invalid contract number');
            }

            return oValue;
        };

        // Model to Output
        CustomType.prototype.formatValue = function (oValue, sInternalType) {
            console.log('formatValue ... ' + oValue);

            if (oValue === undefined || oValue === null) {
                return oValue;
            }

            return oValue.replace(/^(0+)/g, '');
        };

        return CustomType;
    }
);
