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

        var CustomType = SimpleType.extend('tm.message.validation.type.DrivingLicenseNumber', {
            constructor: function (oFormatOptions, oConstraints) {
                SimpleType.apply(this, arguments);
            }
        });

        CustomType.prototype.getName = function () {
            return 'tm.message.validation.type.DrivingLicenseNumber';
        };

        CustomType.prototype.setFormatOptions = function (oFormatOptions) {
            this.oFormatOptions = oFormatOptions;
        };

        CustomType.prototype.setConstraints = function (oConstraints) {
            this.oConstraints = oConstraints;

            if ($.isEmptyObject(this.oConstraints)) {
                this.oConstraints = {
                    mandatory: false,
                     minLength: 1,
                    maxLength: 20
                };
            }
        };

        // Expected model type
        CustomType.prototype.parseValue = function (oValue, sInternalType) {
            console.log('parseValue ... ' + oValue);
            console.log('internal type' + sInternalType);


            if (oValue === undefined || oValue === null || oValue.trim() === '') {
                return oValue;
            }

            //var dlRegex = /^(.*[0-9]){8}$/;
             // var dlRegex = /^.{1,13}$/;
          /*  if (!(dlRegex.test(oValue))) {
                throw new ParseException('Invalid Driving License');
            }*/

            return oValue.toLowerCase();
        };

        // Model value meets constraint requirements
        CustomType.prototype.validateValue = function (oValue) {
            console.log('validateValue ... [' + oValue + ']');

           if ((oValue === undefined || oValue === null || oValue.trim() === '') && this.oConstraints.mandatory) {
                throw new ValidateException('Driving License cannot be empty');
            }
           // if (oValue.length > 20) {
            if ( oValue.length > this.oConstraints.maxLength) {
                throw new ValidateException('DL length exceeds(allowed upto 20 char)');
            }

            return oValue;
        };

        // Model to Output
        CustomType.prototype.formatValue = function (oValue, sInternalType) {
            console.log('formatValue ... ' + oValue);
            var zero ='0',
             pattern = "[0-9a-zA-Z]",
            re = new RegExp(pattern, "g");
             oValue = oValue.replace(re,zero)
            return oValue;

        };

        return CustomType;
    }
);
