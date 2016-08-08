/*global sap*/

sap.ui.define(
    [
        'sap/ui/core/mvc/Controller'
    ],

    function (Controller) {
        'use strict';

        var CustomController = Controller.extend('vc.view.Button');

        CustomController.prototype.onPressed = function (oControlEvent) {
            alert('button is pressed !!!');
        };

        return CustomController;
    }
);
