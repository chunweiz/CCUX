/*global sap, ute*/
/*jslint nomen: true*/

sap.ui.define(
    [

    ],

    function () {
        'use strict';

        var CustomControl = {};

        CustomControl.Action = {
            Yes: 'Yes',
            No: 'No',
            Ok: 'Ok',
            Cancel: 'Cancel'
        };

        (function () {
            var oDialog = ute.ui.main.Popup.create({
                title: 'title',
                text: '',
                close: fnOnClose
            });

            CustomControl.Alert = function (mConfig) {

            };

            CustomControl.Confirm = function (mConfig) {

            };
        }());

        return CustomControl;
    },

    true
);
