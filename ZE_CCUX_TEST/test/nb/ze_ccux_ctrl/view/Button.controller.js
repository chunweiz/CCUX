/*global sap*/

sap.ui.define(
    [
        'sap/ui/core/mvc/Controller',
        'sap/ui/core/routing/HashChanger'
    ],

    function (Controller, HashChanger) {
        'use strict';

        var CustomController = Controller.extend('test.nb.ze_ccux_ctrl.view.Button');

        CustomController.prototype.onPressed = function (oControlEvent) {
            var oHashChanger = HashChanger.getInstance();
            var oHash = oHashChanger.getHash();
            console.log(oHashChanger.getHash());
        };

        return CustomController;
    }
);
