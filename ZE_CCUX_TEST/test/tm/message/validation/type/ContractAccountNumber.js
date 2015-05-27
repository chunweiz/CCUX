/*global sap*/
/*jslint nomen:true*/

sap.ui.define(
    [
        'jquery.sap.global',
        'sap/ui/model/SimpleType',
        'sap/ui/model/FormatException',
        'sap/ui/model/ParseException',
        'sap/ui/model/ValidateException',
        'sap/ui/core/format/NumberFormat'
    ],

    function ($, SimpleType, FormatException, ParseException, ValidateException, NumberFormat) {
        'use strict';

        var CustomType = SimpleType.extend('tm.message.validation.type.ContractAccountNumber', {
            constructor: function (oFormatOptions, oConstraints) {
                SimpleType.apply(this, arguments);
            }
        });

        CustomType.prototype.getName = function () {
            return 'tm.message.validation.type.ContractAccountNumber';
        };

        CustomType.prototype.setFormatOptions = function (oFormatOptions) {
            this.oFormatOptions = oFormatOptions;

            if ($.isEmptyObject(this.oFormatOptions)) {
                this.oFormatOptions = {
                    padding: false,
                    optional: false
                };
            }

            this._oNumberFormat = NumberFormat.getIntegerInstance({
                minIntegerDigits: 1,
                maxIntegerDigits: 12
            });

        };

        CustomType.prototype.parseValue = function (oValue, sInternalType) {

        };

        CustomType.prototype.validateValue = function (oValue) {

        };

        CustomType.prototype.formatValue = function (oValue, sInternalType) {

        };

        return CustomType;
    }
);
