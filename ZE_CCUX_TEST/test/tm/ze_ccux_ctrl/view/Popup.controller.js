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
            ute.ui.main.Popup.Confirm({
                title: 'This is the title for confirm',
                message: 'this is a message for confirm',
                callback: this._popupCallback
            });

            // this._oPopup = ute.ui.main.Popup.create({
            //     content: new Button({ text: 'Close the dialog', press: jQuery.proxy(this._onPressed, this) }),
            //     close: this._handleDialogClosed,
            //     title: 'This is the title for Popup'
            // });
            // this._oPopup.open();
        };

        CustomController.prototype._popupCallback = function (sAction) {
            switch(sAction) {
                case ute.ui.main.Popup.Action.Yes:
                    alert('user pressed Yes');

                    ute.ui.main.Popup.Alert({
                        title: 'This is the title for alert',
                        message: 'this is a message for alert',
                    });

                    break;
                case ute.ui.main.Popup.Action.No:
                    alert('user pressed No');
                    break;
                case ute.ui.main.Popup.Action.Ok:
                    alert('user pressed Ok');
                    break;
            }
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
