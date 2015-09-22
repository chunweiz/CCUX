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
                    { recordIndex: '0', channelIcon: 'sap-icon://nrg-icon/website', topLabel: '09/21/2014' },
                    { recordIndex: '1', channelIcon: 'sap-icon://ipad' },
                    { recordIndex: '2', channelIcon: 'sap-icon://nrg-icon/not-verified' },
                    { recordIndex: '3', channelIcon: 'sap-icon://nrg-icon/webchat' },
                    { recordIndex: '4', channelIcon: 'sap-icon://nrg-icon/agent' },
                    { recordIndex: '5', channelIcon: 'sap-icon://nrg-icon/survey' },
                    { recordIndex: '6', channelIcon: 'sap-icon://letter' },
                    { recordIndex: '7', channelIcon: 'sap-icon://nrg-icon/website' },
                    { recordIndex: '8', channelIcon: 'sap-icon://ipad' },
                    { recordIndex: '9', channelIcon: 'sap-icon://nrg-icon/not-verified' },
                    { recordIndex: '10', channelIcon: 'sap-icon://nrg-icon/webchat' },
                    { recordIndex: '11', channelIcon: 'sap-icon://nrg-icon/agent' },
                    { recordIndex: '12', channelIcon: 'sap-icon://nrg-icon/survey' },
                    { recordIndex: '13', channelIcon: 'sap-icon://letter' },
                    { recordIndex: '14', channelIcon: 'sap-icon://nrg-icon/website', selected: true },
                    { recordIndex: '15', channelIcon: 'sap-icon://ipad' },
                    { recordIndex: '16', channelIcon: 'sap-icon://nrg-icon/not-verified' },
                    { recordIndex: '17', channelIcon: 'sap-icon://nrg-icon/webchat' },
                    { recordIndex: '18', channelIcon: 'sap-icon://nrg-icon/agent' },
                    { recordIndex: '19', channelIcon: 'sap-icon://nrg-icon/survey' },
                    { recordIndex: '20', channelIcon: 'sap-icon://letter', topLabel: '09/21/2015' }
                ]
            }), 'timeline');

        };

        CustomController.prototype._onPress = function (oEvent) {
            console.log('onPress', oEvent);
        };

        CustomController.prototype._onDoublePress = function (oEvent) {
            console.log('onDoublePress', oEvent);
            oEvent.getSource().setSelected(true);
        };

        return CustomController;
    }
);
