/*global sap*/
/*jslint nomen:true*/

sap.ui.define(
    [
        'jquery.sap.global',
        'sap/ui/model/type/Float',
        'sap/ui/model/FormatException',
        'sap/ui/model/ParseException',
        'sap/ui/model/ValidateException'
    ],

    function ($, FloatType, FormatException, ParseException, ValidateException) {
        'use strict';

        var CustomType = FloatType.extend('tm.message.validation.type.Price', {
            constructor: function (oFormatOptions, oConstraints) {
                FloatType.apply(this, arguments);
            }
        });

        CustomType.prototype.getName = function () {
            return 'tm.message.validation.type.Price';
        };

        CustomType.prototype.setFormatOptions = function (oFormatOptions) {
            var defaultFormatOptions;

            if ($.isEmptyObject(oFormatOptions)) {
                defaultFormatOptions = {
                    minFractionDigits: 2,
                    maxFractionDigits: 2,
                    currencySymbol: '$',
                    currencyAlignment: 'LHS'
                };
            } else {
                defaultFormatOptions = oFormatOptions;
            }

            FloatType.prototype.setFormatOptions.call(this, defaultFormatOptions);
        };

        CustomType.prototype.setConstraints = function (oConstraints) {
            var defaultConstraints;

            if ($.isEmptyObject(oConstraints)) {
                defaultConstraints = {
                    mandatory: false
                };
            } else {
                defaultConstraints = oConstraints;
            }

            FloatType.prototype.setConstraints.call(this, defaultConstraints);
        };

         // Model to Output
        CustomType.prototype.formatValue = function (oValue, sInternalType) {

            oValue = oValue.toString();
            oValue = oValue.replace(this.oFormatOptions.currencySymbol,'');

            if (this.oFormatOptions.currencyAlignment === 'LHS') {
            oValue = this.oFormatOptions.currencySymbol + oValue;
            } else {
                oValue = oValue + this.oFormatOptions.currencySymbol;
            }

            return oValue;
        };

        return CustomType;
    }
);
