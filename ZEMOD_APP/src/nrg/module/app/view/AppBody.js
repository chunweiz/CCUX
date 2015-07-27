/*global sap, ute*/
/*jslint nomen:true*/

sap.ui.define(
    [
        'sap/ui/base/EventProvider'
    ],

    function (EventProvider) {
        'use strict';

        var AppBody = EventProvider.extend('nrg.module.app.view.AppBody', {
            constructor: function (oController, oApp) {
                EventProvider.apply(this);

                this._oController = oController;
                this._oApp = oApp;
            },

            metadata: {
                publicMethods: [
                    'init',
                    'reset',
                    'setContentLayout',
                    'attachNavLeft',
                    'detachNavLeft',
                    'showNavLeft',
                    'attachNavRight',
                    'detachNavRight',
                    'showNavRight'
                ]
            }
        });

        AppBody.Event = {
            NavLeftPress: 'NavLeftPress',
            NavRightPress: 'NavRightPress'
        };

        AppBody.ContentLayoutType = ute.ui.app.BodyContentLayout;

        AppBody.prototype.init = function () {
            this._registerEvents();
        };

        AppBody.prototype.reset = function () {
            var oBodyContent = this._oController.getView().byId('appBodyContent');

            oBodyContent.setLayout(AppBody.ContentLayoutType.Default);

            this.showNavLeft(false);

            this.showNavRight(false);
        };

        AppBody.prototype.setContentLayout = function (sContentLayoutType) {
            var oBodyContent = this._oController.getView().byId('appBodyContent');

            if (oBodyContent && sContentLayoutType) {
                oBodyContent.setLayout(sContentLayoutType);
            }

            return this;
        };

        AppBody.prototype.showNavLeft = function (bShow) {
            var oNavLeftElem = this._oController.getView().byId('appBodyNavLeft');

            if (!!bShow) {
                oNavLeftElem.$().removeClass('nrgU-displayNone');
            } else {
                oNavLeftElem.$().addClass('nrgU-displayNone');
            }

            return this;
        };

        AppBody.prototype.showNavRight = function (bShow) {
            var oNavRightElem = this._oController.getView().byId('appBodyNavRight');

            if (!!bShow) {
                oNavRightElem.$().removeClass('nrgU-displayNone');
            } else {
                oNavRightElem.$().addClass('nrgU-displayNone');
            }

            return this;
        };

        AppBody.prototype._registerEvents = function () {
            var oView;

            oView = this._oController.getView();
            oView.byId('appBodyNavLeft').attachEvent('click', this._onNavLeftClick, this);
            oView.byId('appBodyNavRight').attachEvent('click', this._onNavRightClick, this);
        };

        AppBody.prototype._onNavLeftClick = function (oControlEvent) {
            this.fireEvent(AppBody.Event.NavLeftPress, {
                source: oControlEvent.getSource()
            });
        };

        AppBody.prototype._onNavRightClick = function (oControlEvent) {
            this.fireEvent(AppBody.Event.NavRightPress, {
                source: oControlEvent.getSource()
            });
        };

        return AppBody;
    }
);
