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

        CustomControl.SCROLL_STEP = 360;
        CustomControl.SCROLL_DURATION = 500;

        CustomControl.prototype.onAfterRendering = function () {
            this.$('navBack').bind('click', this._onNavBackClick.bind(this));
            this.$('navForward').bind('click', this._onNavForwardClick.bind(this));

            jQuery.sap.delayedCall(0, this, function () {
                this._scroll(this.getDomRef('channelContainer').scrollWidth, 50);

                jQuery.sap.delayedCall(50, this, function () {
                    this._checkOverflow();
                });
            });
        };

        CustomControl.prototype._onNavBackClick = function (oRm, oCustomControl) {
            this._scroll(-CustomControl.SCROLL_STEP, CustomControl.SCROLL_DURATION);

            jQuery.sap.delayedCall(CustomControl.SCROLL_DURATION, this, function () {
                this._checkOverflow();
            });
        };

        CustomControl.prototype._onNavForwardClick = function (oRm, oCustomControl) {
            this._scroll(CustomControl.SCROLL_STEP, CustomControl.SCROLL_DURATION);

            jQuery.sap.delayedCall(CustomControl.SCROLL_DURATION, this, function () {
                this._checkOverflow();
            });
        };

        CustomControl.prototype._scroll = function (iDelta, iDuration) {
            var oDomRef = this.getDomRef('channelContainer');
    		var iScrollLeft = oDomRef.scrollLeft;
    		var iScrollTarget = iScrollLeft + iDelta;

    		jQuery(oDomRef).stop(true, true).animate({
                scrollLeft: iScrollTarget
            }, iDuration);
        };

        CustomControl.prototype._checkOverflow = function () {
            var oChannelContainerDomRef = this.getDomRef('channelContainer');
            var oNavBack = this.$('navBack');
            var oNavForward = this.$('navForward');

            var iScrollLeft = oChannelContainerDomRef.scrollLeft;
			var iScrollWidth = oChannelContainerDomRef.scrollWidth;
			var iClientWidth = oChannelContainerDomRef.clientWidth;

            console.log('iScrollLeft', iScrollLeft, 'iScrollWidth', iScrollWidth, 'iClientWidth', iClientWidth);

            var bScrollBack = false;
			var bScrollForward = false;

            if (Math.abs(iScrollWidth - iClientWidth) === 1) {
				iScrollWidth = iClientWidth;
			}

            if (iScrollLeft > 0) {
                bScrollBack = true;
            }

            if ((iScrollWidth > iClientWidth) && (iScrollLeft + iClientWidth) < iScrollWidth) {
                bScrollForward = true;
            }

            if (bScrollBack) {
                oNavBack.removeClass('tmCJT-navBack-hide');
            } else {
                oNavBack.addClass('tmCJT-navBack-hide');
            }

            if (bScrollForward) {
                oNavForward.removeClass('tmCJT-navForward-hide');
            } else {
                oNavForward.addClass('tmCJT-navForward-hide');
            }
        };

        return CustomControl;
    }
);
