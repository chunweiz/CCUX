/*global sap*/
/*jslint nomen:true*/

sap.ui.define(
    [
        'sap/ui/base/EventProvider',
        'sap/ui/model/json/JSONModel'
    ],

    function (EventProvider, JSONModel) {
        'use strict';

        var Manager = EventProvider.extend('nrg.base.component.ContextManager', {
            constructor: function (oComponent) {
                EventProvider.apply(this);
                this._oComponent = oComponent;
            },

            metadata: {
                publicMethods: [
                    'init',
                    'getContext'
                ]
            }
        });

        Manager.prototype.init = function () {

        };

        Manager.prototype.getContext = function () {
            var oContextModel = this._oComponent.getModel('_comp-context');

            if (!oContextModel || !(oContextModel instanceof JSONModel)) {
                oContextModel = new JSONModel({
                    dashboard: {}
                });
                this._oComponent.setModel(oContextModel, '_comp-context');
            }

            return oContextModel;
        };

        Manager.prototype.destroy = function () {
            EventProvider.prototype.destroy.apply(this, arguments);
        };

        return Manager;
    }
);
