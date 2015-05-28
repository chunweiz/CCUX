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

        var CustomType = SimpleType.extend('tm.message.validation.type.BusinessPartnerNumber', {
            constructor: function (oFormatOptions, oConstraints) {
                SimpleType.apply(this, arguments);
            }
        });

        CustomType.prototype.getName = function () {
            return 'tm.message.validation.type.BusinessPartnerNumber';
        };

        CustomType.prototype.setConstraints = function (oConstraints) {
            this.oConstraints = oConstraints;

            if ($.isEmptyObject(this.oConstraints)) {
                this.oConstraints = {
                    mandatory: false
                };
            }
        };

        CustomType.prototype.parseValue = function (oValue, sInternalType) {
            if (oValue === undefined || oValue === null) {
                return oValue;
            }

            if (isNaN(oValue)) {
                throw new ParseException('Invalid business partner number');
            }

            return oValue.replace(/^(0+)/g, '');
        };

        CustomType.prototype.validateValue = function (oValue) {
            if ((oValue === undefined || oValue === null || oValue.trim() === '') && this.oConstraints.mandatory) {
                throw new ValidateException('Business partner number cannot be empty');
            }

            if (oValue.trim() === '') {
                return;
            }

            if (oValue.length < 1 || oValue.length > 10) {
                throw new ValidateException('Invalid business partner number');
            }
        };

        CustomType.prototype.formatValue = function (oValue, sInternalType) {
            if (oValue === undefined || oValue === null) {
                return oValue;
            }

            if (isNaN(oValue)) {
                throw new ParseException('Invalid business partner number');
            }

            return oValue.replace(/^(0+)/g, '');
        };
    }
);
