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
                    maxFractionDigits: 2
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

        return CustomType;
    }
);
