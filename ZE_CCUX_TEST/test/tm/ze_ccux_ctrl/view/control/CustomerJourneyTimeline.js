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
            todo - zig zag line
            http://codepen.io/pouretrebelle/pen/hypGk

            Try not to go overboard with javascript scrolling ... be careful of reflow
            https://gist.github.com/paulirish/5d52fb081b3570c81e3a
        */

        CustomControl.SCROLL_STEP = 360;
        CustomControl.SCROLL_DURATION = 500;

        CustomControl.prototype.onBeforeRendering = function () {
            this.$('navBack').unbind('click', this._onNavBackClick);
            this.$('navFwd').unbind('click', this._onNavForwardClick);
        };

        CustomControl.prototype.onAfterRendering = function () {
            this.$('navBack').bind('click', this._onNavBackClick.bind(this));
            this.$('navFwd').bind('click', this._onNavForwardClick.bind(this));

            var oTimelineDomRef = this.getDomRef('container');
            console.log(oTimelineDomRef.scrollWidth);

            console.log(this.getDomRef().scrollWidth);

            this._scroll(oTimelineDomRef.scrollWidth + CustomControl.SCROLL_STEP, 10);
        };

        CustomControl.prototype.exit = function () {
            this.$('navBack').unbind('click', this._onNavBackClick);
            this.$('navFwd').unbind('click', this._onNavForwardClick);
        };

        CustomControl.prototype._onNavBackClick = function (oEvent) {
            this._scroll(-CustomControl.SCROLL_STEP, CustomControl.SCROLL_DURATION);
        };

        CustomControl.prototype._onNavForwardClick = function (oEvent) {
            this._scroll(CustomControl.SCROLL_STEP, CustomControl.SCROLL_DURATION);
        };

        CustomControl.prototype._scroll = function (iDelta, iDuration) {
            var oDomRef = this.getDomRef('container');
    		var iScrollLeft = oDomRef.scrollLeft;
    		var iScrollTarget = iScrollLeft + iDelta;

    		jQuery(oDomRef).stop(true, true).animate({
                scrollLeft: iScrollTarget
            }, iDuration);
        };

        CustomControl.prototype._checkOverflow = function (oTimelineDomRef, o$BackArrow, o$ForwardArrow) {
            var bScrollBack = false;
            var bScrollForward = false;

            var iScrollLeft = oTimelineDomRef.scrollLeft;
            var iRealWidth = oTimelineDomRef.scrollWidth;
			var iAvailableWidth = oTimelineDomRef.clientWidth;

            console.log(iRealWidth);
            console.log(iAvailableWidth);

            if (Math.abs(iRealWidth - iAvailableWidth) === 1) {
				iRealWidth = iAvailableWidth;
			}

            if (iScrollLeft > 0) {
                bScrollBack = true;
            }

            if ((iRealWidth > iAvailableWidth) && (iScrollLeft + iAvailableWidth < iRealWidth)) {
                bScrollForward = true;
            }

            if (!bScrollBack) {
                o$BackArrow.hide();
            }

            if (!bScrollForward) {
                o$ForwardArrow.hide();
            }
        };

        return CustomControl;
    }
);
