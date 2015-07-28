/*global sap*/

sap.ui.define(
    [
        'sap/ui/core/mvc/Controller',
        'sap/ui/core/routing/HashChanger'
    ],

    function (Controller, HashChanger) {
        'use strict';

        var CustomController = Controller.extend('test.jh.control.view.Tooltip');

        CustomController.prototype.onPressed = function (oControlEvent) {
            alert('onPressed');

            // console.log(this.getView().byId(oControlEvent.mParameters.id));
            // console.log(this.byId(oControlEvent.mParameters.id));
        };

        CustomController.prototype.onBeforeRendering = function () {
            alert('onBeforeRendering');
        };

        CustomController.prototype.onAfterRendering = function () {
            alert('onAfterRendering');
        };

        return CustomController;
    }
);
