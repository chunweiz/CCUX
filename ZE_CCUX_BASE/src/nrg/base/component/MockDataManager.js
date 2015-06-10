/*global sap*/
/*jslint nomen:true*/

sap.ui.define(
    [
        'sap/ui/base/Object'
    ],

    function (Object) {
        'use strict';

        var Manager = Object.extend('nrg.base.component.MockDataManager', {
            constructor: function (oComponent) {
                Object.apply(this);

                this._oComponent = oComponent;
            },

            metadata: {
                publicMethods: [
                    'startMockServers',
                    'stopMockServers',
                    'addMockModels'
                ]
            }
        });

        Manager.prototype.startMockServers = function () {
            var mModule;

            this._aMockServers = [];

            mModule = this._getModuleMetadata();
        };

        Manager.prototype.stopMockServers = function () {

        };

        Manager.prototype.adMockModels = function () {

        };

        Manager.prototype._getModuleMetadata = function () {
            var mConfig = this._oComponent.getMetadata().getConfig() || {};
            return mConfig.module || {};
        };

        return Manager;
    }
);
