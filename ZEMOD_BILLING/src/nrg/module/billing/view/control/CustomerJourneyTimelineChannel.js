/*global sap*/
/*jslint nomen:true*/
sap.ui.define(
    [
        'jquery.sap.global',
        'sap/ui/core/Control',
        'nrg/module/billing/view/control/CustomerJourneyTimelineChannelRenderer'
    ],

    function (jQuery, Control, CustomRenderer) {
        'use strict';

        var CustomControl = Control.extend('nrg.module.billing.view.control.CustomerJourneyTimelineChannel', {
            metadata: {
                properties: {
                    channelIcon: { type: 'sap.ui.core.URI', defaultValue: 'sap-icon://letter' },
                    topLabel: { type: 'string', defaultValue: null },
                    rightDivider: { type: 'boolean', defaultValue: false },
                    selected: { type: 'boolean', defaultValue: false },
                    description: { type: 'string', defaultValue: "" }
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

            this.$('icon').unbind('click', this._onChannelClick);
            this.$('icon').unbind('dblclick', this._onChannelDoubleClick);
        };

        CustomControl.prototype.onBeforeRendering = function () {
            this.$('icon').unbind('click', this._onChannelClick);
            this.$('icon').unbind('dblclick', this._onChannelDoubleClick);
        };

        CustomControl.prototype.onAfterRendering = function () {
            this.$('icon').bind('click', this._onChannelClick.bind(this));
            this.$('icon').bind('dblclick', this._onChannelDoubleClick.bind(this));
        };

        CustomControl.prototype._onChannelClick = function (oEvent) {
            this._bDoubleClick = false;

            // Wait for a while to determine whether the user intention is to double click.
            // If it is, do not fire single click. Might want to calibrate the delay
            jQuery.sap.delayedCall(300, this, function () {
                if (!this._bDoubleClick) {
                    this.firePress();
                }
            });
        };

        CustomControl.prototype._onChannelDoubleClick = function (oEvent) {
            this._bDoubleClick = true;
            this.setSelected(!this.getSelected());
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
                this.$().removeClass('tmCJTChannel-selected');
            }

            this.setProperty('selected', bSelected, true);
        };

        return CustomControl;
    }
);
