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

        var CustomType = SimpleType.extend('nrg.util.type.DrivingLicenseNumber', {
            constructor: function (oFormatOptions, oConstraints) {
                SimpleType.prototype.apply(this, arguments);
            }
        });

        CustomType.prototype.getName = function () {
            return 'nrg.util.type.DrivingLicenseNumber';
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

            if (oValue === undefined || oValue === null || oValue.trim() === '') {
                return oValue;
            }

            return oValue;
        };

        // Model value meets constraint requirements
        CustomType.prototype.validateValue = function (oValue) {

            if ((oValue === undefined || oValue === null || oValue.trim() === '') && this.oConstraints.mandatory) {
                throw new ValidateException('Driving License cannot be empty');
            }
            if (oValue.length < 1 || oValue.length > 20) {
                throw new ValidateException('DL length exceeds(allowed upto 20 char)');
            }

            return oValue;
        };

        // Model to Output
        CustomType.prototype.formatValue = function (oValue, sInternalType) {

            /*No formatting added to mask the original DL as the masking should be done at server level itself to  protect from hacking*/

            return oValue;

        };

        return CustomType;
    }
);

