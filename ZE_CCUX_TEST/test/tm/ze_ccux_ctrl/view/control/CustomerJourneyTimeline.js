/*global sap*/

sap.ui.define(
    [
        'jquery.sap.global',
        'sap/ui/core/Control',
        'test/tm/ze_ccux_ctrl/view/control/CustomerJourneyTimelineRenderer'
    ],

    function (jQuery, Control, CustomRenderer) {
        'use strict';

        var CustomControl = Control.extend('test.tm.ze_ccux_ctrl.view.control.CustomerJourneyTimeline', {
            metadata: {
                aggregations: {
                    channel: {
                        type: 'test.tm.ze_ccux_ctrl.view.control.CustomerJourneyTimelineChannel',
                        multiple: true,
                        singularName: 'channel'
                    }
                },

                defaultAggregation: 'channel'
            },

            renderer: CustomRenderer
        });

        /*
            Try not to go overboard with javascript scrolling ... be careful of reflow
            https://gist.github.com/paulirish/5d52fb081b3570c81e3a
        */

        CustomControl.SCROLL_STEP = 360;
        CustomControl.SCROLL_DURATION = 500;

        CustomControl.prototype.onAfterRendering = function () {
            var oContainerEl = document.querySelector('.tmCJT-channelContainer');
            console.log(oContainerEl.clientWidth, oContainerEl.scrollWidth);
        };

        return CustomControl;
    }
);
