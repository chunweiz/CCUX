/*global sap*/

sap.ui.define(
    [
        'sap/ui/core/mvc/Controller',
        'test/tm/ze_ccux_ctrl/view/CustJourneyLifeCycleTimeline',
        'sap/ui/model/json/JSONModel'
    ],

    function (Controller, CustomTimeline, JSONModel) {
        'use strict';

        var CustomController = Controller.extend('test.tm.ze_ccux_ctrl.view.CustJourneyLifecycle');

        CustomController.prototype.onBeforeRendering = function () {
            this.getView().byId('content').removeAllAggregation('content');

            

            this.getView().byId('content').addContent(oCustomChart);
        };

        return CustomController;
    }
);
