/*global sap*/

sap.ui.define(
    [
        'sap/ui/core/Element'
    ],

    function (Element) {
        'use strict';

        var CustomElement = Element.extend('test.tm.ze_ccux_ctrl.view.control.CustomerJourneyTimelineChannel', {
            metadata: {
                properties: {
                    channelType: {
                        type: 'test.tm.ze_ccux_ctrl.view.control.CustomerJourneyTimelineChannel.ChannelType',
                        defaultValue: 'Correspondence'
                    },
                    topLabel: { type: 'string', defaultValue: null },
                    rightDivider: { type: 'boolean', defaultValue: false },
                    selected: { type: 'boolean', defaultValue: false }
                },

                events: {
                    press: {},
                    doublePress: {}
                }
            }
        });

        CustomElement.ChannelType = {
            Website: 'Website',
            Mobile: 'Mobile',
            IVR: 'IVR',
            Webchat: 'Webchat',
            Phone: 'Phone',
            Survey: 'Survey',
            Correspondence: 'Correspondence'
        };

        CustomElement.prototype.getChannelIcon = function () {
            switch(this.getChannelType()) {
                case CustomElement.ChannelType.Website: return 'sap-icon://nrg-icon/website';
                case CustomElement.ChannelType.Mobile: return 'sap-icon://ipad';
                case CustomElement.ChannelType.IVR: return 'sap-icon://nrg-icon/not-verified';
                case CustomElement.ChannelType.Webchat: return 'sap-icon://nrg-icon/webchat';
                case CustomElement.ChannelType.Phone: return 'sap-icon://nrg-icon/agent';
                case CustomElement.ChannelType.Survey: return 'sap-icon://nrg-icon/survey';
                default: return 'sap-icon://letter';
            }
        };

        return CustomElement;
    }
);
