/*global sap*/
/*jslint nomen:true*/

sap.ui.define(
    [
        'sap/ui/base/EventProvider'
    ],

    function (EventProvider) {
        'use strict';

        var AppHeader = EventProvider.extend('nrg.module.app.view.AppHeader', {
            constructor: function (oController, oApp) {
                EventProvider.apply(this);

                this._oController = oController;
                this._oApp = oApp;
            },

            metadata: {
                publicMethods: [
                    'init'
                ]
            }
        });

        AppHeader.prototype.init = function () {
            this._registerHMItemEvents();
        };

        AppHeader.prototype._registerHMItemEvents = function () {
            var oView = this._oController.getView();

            oView.byId('appHMItemMenu').attachEvent('press', this._onMenuPress, this);
            oView.byId('appHMItemIndex').attachEvent('press', this._onIndexPress, this);
            oView.byId('appHMItemTransaction').attachEvent('press', this._onTransactionPress, this);
            oView.byId('appHMItemEsidTool').attachEvent('press', this._onEsidToolPress, this);
            oView.byId('appHMItemPalPlus').attachEvent('press', this._onPalPlusPress, this);
            oView.byId('appHMItemMessages').attachEvent('press', this._onMessagesPress, this);
            oView.byId('appHMItemRefresh').attachEvent('press', this._onRefreshPress, this);
            oView.byId('appHMItemClearAcc').attachEvent('press', this._onClearAccPress, this);
        };

        AppHeader.prototype._onMenuPress = function (oControlEvent) {

        };

        AppHeader.prototype._onIndexPress = function (oControlEvent) {

        };

        AppHeader.prototype._onTransactionPress = function (oControlEvent) {

        };

        AppHeader.prototype._onEsidToolPress = function (oControlEvent) {

        };

        AppHeader.prototype._onPalPlusPress = function (oControlEvent) {

        };

        AppHeader.prototype._onMessagesPress = function (oControlEvent) {

        };

        AppHeader.prototype._onRefreshPress = function (oControlEvent) {
            var oWebUiManager = this._oController.getOwerComponent().getWebUiManager();
        };

        AppHeader.prototype._onClearAccPress = function (oControlEvent) {
            var oWebUiManager = this._oController.getOwerComponent().getWebUiManager();
        };

        return AppHeader;
    }
);
