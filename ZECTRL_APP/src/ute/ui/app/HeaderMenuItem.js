/*global sap*/
/*jslint nomen:true*/

sap.ui.define(
    [
        'jquery.sap.global',
        'sap/ui/core/Control',
        'sap/ui/core/mvc/View',
        'sap/m/Dialog'
    ],

    function (jQuery, Control, View, Dialog) {
        'use strict';

        var CustomControl = Control.extend('ute.ui.app.HeaderMenuItem', {
            metadata: {
                library: 'ute.ui.app',

                properties: {
                    expanded: { type: 'boolean', defaultValue: false },
                    enabled: { type: 'boolean', defaultValue: true }
                },

                aggregations: {
                    header: { type: 'sap.ui.core.Control', multiple: true, singularName: 'header' },
                    content: { type: 'sap.ui.core.Control', multiple: true, singularName: 'content' }
                },

                defaultAggregation: 'content',

                events: {
                    press: {}
                }
            }
        });

        CustomControl.prototype._aHdrMenuItem = [];

        CustomControl.prototype.setEnabled = function (bEnabled) {
            bEnabled = !!bEnabled;

            if (bEnabled) {
                this.data('disabled', null);
            } else {
                this.data('disabled', 'disabled', true);
                this.setExpanded(false);
            }

            this.setProperty('enabled', bEnabled, true);
            return this;
        };

        CustomControl.prototype.setExpanded = function (bExpanded) {
            var $content;

            bExpanded = !!bExpanded;
            $content = this.$('content');

            if ($content) {
                if (bExpanded) {
                    $content.removeClass('uteU-hidden');

                    // Make sure only current one is expanded
                    this._aHdrMenuItem.forEach(function (oItem) {
                        if (oItem instanceof CustomControl && oItem !== this && oItem.getExpanded()) {
                            oItem.setExpanded(false);
                        }
                    }.bind(this));

                } else {
                    $content.addClass('uteU-hidden');
                }
            }

            this.setProperty('expanded', bExpanded, true);
            return this;
        };

        CustomControl.prototype.onclick = function (oEvent) {
            var oParentView;

            oParentView = this._getParentView(oEvent.srcControl);
            if (oParentView) {
                if (!this._oDialog) {
                    this._oDialog = new Dialog();
                    oParentView.addDependent(this._oDialog);
                }

                this.setExpanded(true);
            }
        };

        CustomControl.prototype._getParentView = function (oControl) {
            var oParent;

            oParent = oControl.getParent();
            while (oParent) {
                if (oParent instanceof View) {
                    return oParent;
                }

                oParent = oParent.getParent();
            }

            return oParent;
        };

        CustomControl.prototype._registerMe = function () {
            this._aHdrMenuItem.push(this);
        };

        CustomControl.prototype._deregisterMe = function () {
            var iHdrMenuItemIndex = this._aHdrMenuItem.indexOf(this);

            if (iHdrMenuItemIndex && iHdrMenuItemIndex !== -1) {
                this._aHdrMenuItem.splice(iHdrMenuItemIndex, 1);
            }
        };

        CustomControl.prototype.onInit = function () {
            this._registerMe();
        };

        CustomControl.prototype.onAfterRendering = function () {
//            this._bindHeaderEvent();
        };

        CustomControl.prototype.onBeforeRendering = function () {
//            this._unbindHeaderEvent();
        };

        CustomControl.prototype.onExit = function () {
//            this._unbindHeaderEvent();
            this._deregisterMe();
        };

        return CustomControl;
    },

    true
);
