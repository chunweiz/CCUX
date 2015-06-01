/*global sap*/
/*jslint vars: true, plusplus: true, devel: true, nomen: true, indent: 4, maxerr: 50 regexp: true */
/*global define */

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

        var CustomType = SimpleType.extend('nrg.util.type.ContractAccountNumber', {
            constructor: function (oFormatOptions, oConstraints) {
                SimpleType.prototype.apply(this, arguments);
            }
        });

        CustomType.prototype.getName = function () {
            return 'nrg.util.type.ContractAccountNumber';
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
                throw new ParseException('Invalid contract account number');
            }

            return oValue.replace(/^(0+)/g, '');
        };

        // Model value meets constraint requirements
        CustomType.prototype.validateValue = function (oValue) {
            console.log('validateValue ... [' + oValue + ']');

            if ((oValue === undefined || oValue === null || oValue.trim() === '') && this.oConstraints.mandatory) {
                throw new ValidateException('Contract account number cannot be empty');
            }

            if (oValue.length < 1 || oValue.length > 12) {
                throw new ValidateException('Invalid contract account number');
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
*/
