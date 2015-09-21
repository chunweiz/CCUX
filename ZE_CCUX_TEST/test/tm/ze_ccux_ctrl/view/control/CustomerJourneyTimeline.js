/*global sap*/

sap.ui.define(
    [
        'sap/ui/core/Control',
        'test/tm/ze_ccux_ctrl/view/control/CustomerJourneyTimelineRenderer'
    ],

    function (Control, CustomRenderer) {
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

        CustomControl.SCROLL_STEP = 250;

        CustomControl.prototype.onBeforeRendering = function () {
            this.$('navBack').unbind('click', this._onNavBackClick);
            this.$('navFwd').unbind('click', this._onNavForwardClick);
        };

        CustomControl.prototype.onAfterRendering = function () {
            this.$('navBack').bind('click', this._onNavBackClick.bind(this));
            this.$('navFwd').bind('click', this._onNavForwardClick.bind(this));
        };

        CustomControl.prototype.exit = function () {
            this.$('navBack').unbind('click', this._onNavBackClick);
            this.$('navFwd').unbind('click', this._onNavForwardClick);
        };

        CustomControl.prototype._onNavBackClick = function (oEvent) {
            this._scroll(-CustomControl.SCROLL_STEP, 500);
        };

        CustomControl.prototype._onNavForwardClick = function (oEvent) {
            this._scroll(CustomControl.SCROLL_STEP, 500);
        };

        /* css zigzag border - http://codepen.io/pouretrebelle/pen/hypGk */

        CustomControl.prototype._checkOverflow = function (oTimelineDomRef, oBackArrow, oForwardArrow) {
            var bScrollBack = false;
            var bScrollForward = false;

            var iScrollLeft = oTimelineDomRef.scrollLeft;
            var iRealWidth = oTimelineDomRef.scrollWidth;
			var iAvailableWidth = oTimelineDomRef.clientWidth; // Viewport

            if (Math.abs(iRealWidth - iAvailableWidth) === 1) {
				iRealWidth = iAvailableWidth;
			}

            if (iScrollLeft > 0) {
                bScrollBack = true;
            }

            if ((iRealWidth > iAvailableWidth) && (iScrollLeft + availableWidth < realWidth)) {
                bScrollForward = true;
            }

            if (bScrollBack) {
                // Enable oBackArrow
            }

            if (bScrollForward) {
                // Enable oForwardArrow;
            }

        };

        CustomControl.prototype._scroll = function (iDelta, iDuration) {
            var oDomRef = this.getDomRef('container');
    		var iScrollLeft = oDomRef.scrollLeft;
    		var iScrollTarget = iScrollLeft + iDelta;

    		jQuery(oDomRef).stop(true, true).animate({
                scrollLeft: iScrollTarget
            }, iDuration);
        };

        return CustomControl;
    }
);
