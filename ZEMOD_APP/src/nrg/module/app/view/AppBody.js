/*global sap*/
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
                    'reset'
                ]
            }
        });

        AppBody.prototype.init = function () {

        };

        AppBody.prototype.reset = function () {

        };

        return AppBody;
    }
);
