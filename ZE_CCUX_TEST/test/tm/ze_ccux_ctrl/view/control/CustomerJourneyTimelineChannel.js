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
                    selected: { type: 'boolean', defaultValue: false },
                    selectionGroup: { type: 'string', defaultValue: null }
                },

                events: {
                    press: {},
                    doublePress: {}
                }
            },

            renderer: CustomRenderer
        });

        CustomControl.prototype._aGroupRegistry = {};

        CustomControl.prototype.exit = function () {
            var sSelectionGroup = this.getSelectionGroup();

            if (!sSelectionGroup || !this._aGroupRegistry[sSelectionGroup]) {
                return;
            }

            var iIndex = this._aGroupRegistry[sSelectionGroup].indexOf(this);
            if (iIndex && iIndex !== -1) {
                this._aGroupRegistry[sSelectionGroup].splice(iIndex, 1);
            }
        };

        CustomControl.prototype.setSelectionGroup = function (sSelectionGroup) {
            if (!sSelectionGroup) {
                return;
            }

            if (!this._aGroupRegistry[sSelectionGroup]) {
                this._aGroupRegistry[sSelectionGroup] = [];
            }

            this._aGroupRegistry[sSelectionGroup].push(this);
        };

        CustomControl.prototype.setSelected = function (bSelected) {
            bSelected = !!bSelected;

            console.log(this._aGroupRegistry);

            this.setProperty('selected', bSelected, true);
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

        return CustomControl;
    }
);
