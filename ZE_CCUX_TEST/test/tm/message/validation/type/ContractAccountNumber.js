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
        };

        CustomType.prototype.setConstraints = function (oConstraints) {
            this.oConstraints = oConstraints;

            if ($.isEmptyObject(this.oConstraints)) {
                this.oConstraints = {
                    padding: false,
                    optional: false
                };
            }

            this._oNumberFormat = NumberFormat.getIntegerInstance({
                minIntegerDigits: 1,
                maxIntegerDigits: 12
            });
        };

        // Expected model type
        CustomType.prototype.parseValue = function (oValue, sInternalType) {
            console.log('parseValue ... ' + oValue);

            var iResult;

            iResult = this._oNumberFormat.parse(oValue);

            if (isNaN(iResult)) {
                throw new ParseException('Invalid contract account number');
            }
        };

        // Model value meets constraint requirements
        CustomType.prototype.validateValue = function (oValue) {
            console.log('validateValue ... ' + oValue);

            if ((oValue === undefined || oValue === null) && !this.oConstraints.optional) {
                throw new ValidateException('Contract account number cannot be empty');
            }
        };

        // Model to Output
        CustomType.prototype.formatValue = function (oValue, sInternalType) {
            console.log('formatValue ... ' + oValue);

            return oValue;
        };

        return CustomType;
    }
);
