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

        var CustomType = SimpleType.extend('nrg.util.type.SocialSecurityNumber', {
            constructor: function (oFormatOptions, oConstraints) {
                SimpleType.prototype.apply(this, arguments);
            }
        });

        CustomType.prototype.getName = function () {
            return 'nrg.util.type.SocialSecurityNumber';
        };

        CustomType.prototype.formatValue = function (oValue, sInternalType) {
            throw new FormatException('');
        };

        CustomType.prototype.parseValue = function (oValue, sInternalType) {
            throw new ParseException('');
        };

        CustomType.prototype.validateValue = function (oValue) {
            throw new ValidateException('');
        };

        return CustomType;
    }
);
