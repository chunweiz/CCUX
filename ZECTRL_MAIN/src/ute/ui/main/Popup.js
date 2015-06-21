/*global sap, ute, window*/
/*jslint nomen:true*/

sap.ui.define(
    [
        'sap/ui/core/Control',
        'sap/ui/commons/Dialog'
    ],

    function (Control, Dialog) {
        'use strict';

        var CustomControl = Control.extend('ute.ui.main.Popup', {
            metadata: {
                library: 'ute.ui.main',

                properties: {
                    design: { type: 'ute.ui.main.PopupDesign', defaultValue: ute.ui.main.PopupDesign.Default },
                    title: { type: 'string', defaultValue: null }
                },

                aggregations: {
                    content: { type: 'sap.ui.core.Control', multiple: true, singularName: 'content' }
                },

                defaultAggregation: 'content',

                events: {
                    close: {}
                }
            }
        });

        CustomControl.prototype.init = function () {
            this._oDialog = new Dialog({
                applyContentPadding: false,
                modal: true,
                resizable: true
            });

            this._oDialog.addStyleClass('uteMPopup');
            this._oDialog.addStyleClass('uteMPopup-design-default');
            this._oDialog.attachClosed(jQuery.proxy(this._handleDialogClosed, this));
        };

        CustomControl.prototype.exit = function () {

        };

        CustomControl.prototype.open = function () {
            if (this._oDialog.isOpen()) {
                return this;
            }

            this._oDialog.removeContent(this);
            this._oDialog.addContent(this);
            this._oDialog.open();

            return this;
        };

        CustomControl.prototype.close = function () {
            this._oDialog.close();
            return this;
        };

        CustomControl.prototype._handleDialogClosed = function (oControlEvent) {
            this.fireClose();
        };

        CustomControl.prototype.setTitle = function (sValue) {
            this._oDialog.setTitle(sValue);
            this.setProperty('title', sValue);
            return this;
        };

        return CustomControl;
    },

    true
);
