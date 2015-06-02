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

        var CustomType = SimpleType.extend('nrg.util.type.CellPhoneNumber', {
            constructor: function (oFormatOptions, oConstraints) {
                SimpleType.prototype.apply(this, arguments);
            }
        });

        CustomType.prototype.getName = function () {
            return 'nrg.util.type.CellPhoneNumber';
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

            if (oValue === undefined || oValue === null) {
                return oValue;
            }

            if (!oValue.match(/[\d\-]/i)) {
                throw new ParseException('Invalid Cell phone number');
            }

            return oValue;
        };

        // Model value meets constraint requirements
        CustomType.prototype.validateValue = function (oValue) {

            if ((oValue === undefined || oValue === null || oValue.trim() === '') && this.oConstraints.mandatory) {
                throw new ValidateException('Cell phone number cannot be empty');
            }
            if (oValue.length < 1 || oValue.length > 30) {
                throw new ValidateException('Cell phone number length exceeds(allowed upto 30 char)');
            }

            return oValue;
        };

        // Model to Output
        CustomType.prototype.formatValue = function (oValue, sInternalType) {

            if (oValue === undefined || oValue === null || oValue.trim() === '') {
                return oValue;
            }

            oValue = oValue.replace(/-/g, '');
            oValue = oValue.replace(' ', '');

            if (oValue.indexOf("+1") > -1) {
                return (oValue.substr(0, 2) + ' ' + oValue.substr(2, 3) + '-' + oValue.substr(5, 3) + '-' + oValue.substr(8, 4) + ' ' + oValue.substr(12));
            } else {
                return (oValue.substr(0, 3) + '-' + oValue.substr(3, 3) + '-' + oValue.substr(6, 4) + ' ' + oValue.substr(10));
            }
        };

        return CustomType;
    }
);
