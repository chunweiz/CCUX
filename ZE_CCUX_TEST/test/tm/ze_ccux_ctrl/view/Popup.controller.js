/*global sap*/

sap.ui.define(
    [
        'sap/ui/core/mvc/Controller',
        'ute/ui/main/Button'
    ],

    function (Controller, Button) {
        'use strict';

        var CustomController = Controller.extend('test.tm.ze_ccux_ctrl.view.Popup');

        CustomController.prototype.onInit = function () {
            this._oPopup = ute.ui.main.Popup.create({
                content: new Button({ text: 'Close the dialog', press: jQuery.proxy(this._onPressed, this) }),
                close: this._handleDialogClosed,
                title: 'This is the title for Popup'
            });

            this._oPopup.open();
        };

        CustomController.prototype._onPressed = function (oControlEvent) {
            this._oPopup.close();
        };

        CustomController.prototype._handleDialogClosed = function (oControlEvent) {
            alert('dialog is closed');
        };

        CustomController.prototype.onBeforeRendering = function () {

        };

        CustomController.prototype.onAfterRendering = function () {

        };

        return CustomController;
    }
);
