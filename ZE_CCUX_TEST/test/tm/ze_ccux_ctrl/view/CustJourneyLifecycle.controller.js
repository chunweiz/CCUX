/*global sap*/

sap.ui.define(
    [
        'jquery.sap.global',
        'sap/ui/core/mvc/Controller',
        'sap/ui/model/json/JSONModel'
    ],

    function (jQuery, Controller, JSONModel) {
        'use strict';

        var CustomController = Controller.extend('test.tm.ze_ccux_ctrl.view.CustJourneyLifecycle');

        CustomController.prototype.onInit = function () {
            var sUrl = jQuery.sap.getModulePath('test.tm.ze_ccux_ctrl.view.control.CustomerJourneyTimeline', '.css');
            jQuery.sap.includeStyleSheet(sUrl);
        };

        CustomController.prototype.onBeforeRendering = function () {

            this.getView().setModel(new JSONModel({
                data: [
                    { channelType: 'Website' },
                    { channelType: 'Mobile' },
                    { channelType: 'IVR' },
                    { channelType: 'Webchat' },
                    { channelType: 'Phone' },
                    { channelType: 'Survey' },
                    { channelType: 'Correspondence' }
                ]
            }), 'timeline');

        };

        return CustomController;
    }
);
