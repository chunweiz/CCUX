/*global sap, ute, window*/
/*jslint nomen:true*/

sap.ui.define(
    [
        'jquery.sap.global',
        'sap/ui/core/Control',
        'sap/ui/core/Popup',
        'sap/ui/core/OpenState',
        'sap/ui/core/delegate/ScrollEnablement'
    ],

    function (jQuery, Control, CorePopup, OpenState, ScrollEnablement) {
        'use strict';

        var CustomControl = Control.extend('ute.ui.main.Popup', {
            metadata: {
                library: 'ute.ui.main',

                interfaces: [
                    'sap.ui.core.PopupInterface'
                ],

                properties: {
                    design: { type: 'ute.ui.main.PopupDesign', defaultValue: ute.ui.main.PopupDesign.Default }
                },

                aggregations: {
                    content: { type: 'sap.ui.core.Control', multiple: true, singularName: 'content' }
                },

                defaultAggregation: 'content',

                events: {
                    beforeOpen: {},
                    afterOpen: {},
                    beforeClose: {},
                    afterClose: {}
                }
            }
        });

        CustomControl.prototype.init = function () {
            this._oCorePopup = new CorePopup();


        };

        CustomControl.prototype.onBeforeRendering = function () {

        };

        CustomControl.prototype.onAfterRendering = function () {

        };

        CustomControl.prototype.exit = function () {

        };

        CustomControl.prototype.open = function () {
            if (this._oCorePopup.isOpen()) {
                return this;
            }

            this.fireBeforeOpen();

            this._oCorePopup.attachOpened(this._onCorePopupOpened, this);
            this._oCorePopup.setContent(this);
            this._oCorePopup.setPosition(CorePopup.Dock.CenterCenter, CorePopup.Dock.CenterCenter, window, '0 0', 'fit');
            this._oCorePopup.setModal(true);

            this._oCorePopup.open();
            return this;
        };

        CustomControl.prototype.close = function () {
            var eOpenState = this._oCorePopup.getOpenState();

            if (!(eOpenState === OpenState.CLOSED || eOpenState === OpenState.CLOSING)) {
                this.fireBeforeClose();
                this._oCorePopup.attachClosed(this._onCorePopupClosed, this);
                this._oCorePopup.close();
            }

            return this;
        };

        CustomControl.prototype.isOpen = function () {
            return this._oCorePopup && this._oCorePopup.isOpen();
        };

        CustomControl.prototype._onCorePopupOpened = function () {
            this._oCorePopup.detachOpened(this._onCorePopupOpened, this);
            this.fireAfterOpen();
        };

        CustomControl.prototype._onCorePopupClosed = function () {
            this._oCorePopup.detachClosed(this._onCorePopupClosed, this);
            this.fireAfterClose();
        };

        return CustomControl;
    },

    true
);
