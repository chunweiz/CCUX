/*global sap*/

sap.ui.define(
    [
        'sap/ui/core/routing/Router'
    ],

    function (Router) {
        'use strict';

        var CustomRouter = Router.extend('nrg.base.component.Router', {
            constructor: function (oRoutes, oConfig, oOwner, oTargetsConfig) {
                this._oComponent = oOwner;

                Router.apply(this, arguments);
            }
        });

        CustomRouter.prototype.navTo = function (sName, oParameters, bReplace) {
            var oCcuxApp, fnConfirmCallback;

            oCcuxApp = this._oComponent.getCcuxApp();

            if (oCcuxApp && oCcuxApp.isInEdit()) {
                fnConfirmCallback = function (sAction) {
                    if (sAction === ute.ui.main.Popup.Action.Yes) {
                        oCcuxApp.setInEdit(false);
                        Router.prototype.navTo.call(this, sName, oParameters, bReplace);
                    }
                };

                ute.ui.main.Popup.Confirm({
                    title: 'Possible Data Loss',
                    message: 'There might be unsaved changes. Do you really want to navigate away?',
                    callback: fnConfirmCallback
                });

            } else {
                Router.prototype.navTo.apply(this, arguments);
            }
        };


        return CustomRouter;
    },

    true
);
