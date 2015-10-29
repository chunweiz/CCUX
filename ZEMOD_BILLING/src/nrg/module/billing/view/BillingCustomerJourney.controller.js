/*globals sap*/
/*jslint nomen:true*/

sap.ui.define(
    [
        'sap/ui/core/mvc/Controller',
        'sap/ui/model/json/JSONModel'
    ],

    function (CoreController, JSONModel) {
        'use strict';

        var Controller = CoreController.extend('nrg.module.billing.view.BillingCustomerJourney');

        //TODO: Implementation required
        Controller.prototype.onAfterRendering = function () {
             this.getOwnerComponent().getCcuxApp().setLayout('FullWidthTool');
        };
        Controller.prototype.onBeforeRendering = function () {

            this.getView().byId('chart').setDataModel(new JSONModel({
                data: [
                    { channel: 'Website', frequency: 3 },
                    { channel: 'Mobile', frequency: 3 },
                    { channel: 'IVR', frequency: 1 },
                    { channel: 'Webchat', frequency: 5 },
                    { channel: 'Phone', frequency: 2 },
                    { channel: 'Survey', frequency: 6 }
                ]
            }));
            this.getView().setModel(new JSONModel({
                data: [
                    { recordIndex: '0', channelIcon: 'sap-icon://nrg-icon/website', topLabel: '08/31/2014' },
                    { recordIndex: '1', channelIcon: 'sap-icon://ipad' },
                    { recordIndex: '2', channelIcon: 'sap-icon://nrg-icon/not-verified', topLabel: '09/21/2014', rightDivider: true },
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

        Controller.prototype._onTotalPress = function (oEvent) {
            //console.log(oEvent);
        };

        Controller.prototype._onSlicePress = function (oEvent) {
            //console.log(oEvent.getParameters());
        };

        return Controller;
    }
);
