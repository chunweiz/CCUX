/*global sap*/

sap.ui.define(
    [
        'jquery.sap.global',
        'sap/ui/core/Control',
        'test/tm/ze_ccux_ctrl/view/control/CustomerJourneyTimelineChannelRenderer'
    ],

    function (jQuery, Control, CustomRenderer) {
        'use strict';

        var CustomControl = Control.extend('test.tm.ze_ccux_ctrl.view.control.CustomerJourneyTimelineChannel', {
            metadata: {
                properties: {
                    channelIcon: { type: 'sap.ui.core.URI', defaultValue: 'sap-icon://letter' },
                    topLabel: { type: 'string', defaultValue: null },
                    rightDivider: { type: 'boolean', defaultValue: false },
                    selected: { type: 'boolean', defaultValue: false }
                },

                events: {
                    press: {},
                    doublePress: {}
                }
            },

            renderer: CustomRenderer
        });

        CustomControl.prototype._aChannelRegistry = [];

        CustomControl.prototype.init = function () {
            this._aChannelRegistry.push(this);
        };

        CustomControl.prototype.exit = function () {
            var iIndex = this._aChannelRegistry.indexOf(this);

            if (iIndex && iIndex !== -1) {
                this._aChannelRegistry.splice(iIndex, 1);
            }
        };

        CustomControl.prototype.onclick = function (oEvent) {
            this._onDoubleClick = false;

            // Wait for a while to check whether user intention is to double click.
            // If it is, do not fire single click.
            jQuery.sap.delayedCall(300, this, function () {
                if (!this._onDoubleClick) {
                    this.firePress();
                }
            });
        };

        CustomControl.prototype.ondblclick = function (oEvent) {
            this._onDoubleClick = true;
            this.setSelected(true);
            this.fireDoublePress();
        };

        CustomControl.prototype.setSelected = function (bSelected) {
            bSelected = !!bSelected;

            if (bSelected) {
                this.$().addClass('tmCJTChannel-selected');

                this._aChannelRegistry.forEach(function (oChannel) {
                    if (oChannel !== this) {
                        oChannel.setSelected(false);
                    }
                }, this);
            } else {
                if (this.getSelected()) {
                    this.$().removeClass('tmCJTChannel-selected');
                }
            }

            this.setProperty('selected', bSelected, true);
        };

        return CustomControl;
    }
);
