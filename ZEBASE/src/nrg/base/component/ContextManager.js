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
                    'getContext',
                    'resetContext'
                ]
            }
        });

        Manager.prototype.init = function () {

        };

        Manager.prototype.getContext = function () {
            var oContextModel = this._oComponent.getModel('_comp-context');

            if (!oContextModel || !(oContextModel instanceof JSONModel)) {
                oContextModel = new JSONModel({
                    bpNum: null,
                    caNum: null,
                    coNum: null
                });
                this._oComponent.setModel(oContextModel, '_comp-context');
            }

            return oContextModel;
        };

        Manager.prototype.resetContext = function () {
            var oModel = this.getContext();

            oModel.setData({
                bpNum: null,
                caNum: null,
                coNum: null
            });

            return this;
        };

        Manager.prototype.destroy = function () {
            EventProvider.prototype.destroy.apply(this, arguments);
        };

        return Manager;
    }
);
