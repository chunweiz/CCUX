/*global sap*/

sap.ui.define(
    [
        'sap/ui/core/mvc/Controller',
        'sap/ui/commons/Dialog',
        'ute/ui/main/Popup',
        'ute/ui/main/Button'
    ],

    function (Controller, Dialog, Popup, Button) {
        'use strict';

        var CustomController = Controller.extend('test.tm.ze_ccux_ctrl.view.Popup');

        CustomController.prototype.onInit = function () {
            this._oPopup = new Popup({
                content: new Button({ text: 'yyiyiyiyiy', press: jQuery.proxy(this._onPressed, this) }),
                close: this._handleDialogClosed,
                title: 'This is the title for Popup'
            });
            this._oPopup.open();
        };

        CustomController.prototype._onPressed = function (oControlEvent) {
            alert('pressed');
            this._oPopup.close();
        };

        CustomController.prototype._handleDialogClosed = function (oControlEvent) {
            alert('dialog closed');
        };

        CustomController.prototype.onBeforeRendering = function () {

        };

        CustomController.prototype.onAfterRendering = function () {

        };

        return CustomController;
    }
);
