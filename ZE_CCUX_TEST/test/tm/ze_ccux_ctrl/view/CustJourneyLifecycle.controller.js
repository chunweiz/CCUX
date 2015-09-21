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
                    { channelIcon: 'sap-icon://nrg-icon/website', topLabel: '09/21/2014' },
                    { channelIcon: 'sap-icon://ipad' },
                    { channelIcon: 'sap-icon://nrg-icon/not-verified' },
                    { channelIcon: 'sap-icon://nrg-icon/webchat' },
                    { channelIcon: 'sap-icon://nrg-icon/agent' },
                    { channelIcon: 'sap-icon://nrg-icon/survey' },
                    { channelIcon: 'sap-icon://letter' },
                    { channelIcon: 'sap-icon://nrg-icon/website' },
                    { channelIcon: 'sap-icon://ipad' },
                    { channelIcon: 'sap-icon://nrg-icon/not-verified' },
                    { channelIcon: 'sap-icon://nrg-icon/webchat' },
                    { channelIcon: 'sap-icon://nrg-icon/agent' },
                    { channelIcon: 'sap-icon://nrg-icon/survey' },
                    { channelIcon: 'sap-icon://letter' },
                    { channelIcon: 'sap-icon://nrg-icon/website' },
                    { channelIcon: 'sap-icon://ipad' },
                    { channelIcon: 'sap-icon://nrg-icon/not-verified' },
                    { channelIcon: 'sap-icon://nrg-icon/webchat' },
                    { channelIcon: 'sap-icon://nrg-icon/agent' },
                    { channelIcon: 'sap-icon://nrg-icon/survey' },
                    { channelIcon: 'sap-icon://letter', topLabel: '09/21/2015' }
                ]
            }), 'timeline');

            // case CustomControl.ChannelType.Website: return 'sap-icon://nrg-icon/website';
            // case CustomControl.ChannelType.Mobile: return 'sap-icon://ipad';
            // case CustomControl.ChannelType.IVR: return 'sap-icon://nrg-icon/not-verified';
            // case CustomControl.ChannelType.Webchat: return 'sap-icon://nrg-icon/webchat';
            // case CustomControl.ChannelType.Phone: return 'sap-icon://nrg-icon/agent';
            // case CustomControl.ChannelType.Survey: return 'sap-icon://nrg-icon/survey';
            // default: return 'sap-icon://letter';

        };

        return CustomController;
    }
);
