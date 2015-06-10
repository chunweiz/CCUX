/*global sap*/
/*jslint nomen:true*/

sap.ui.define(
    [
        'jquery.sap.global'
,        'sap/ui/core/UIComponent'
    ],

    function (jQuery, Component) {
        'use strict';

        var CustomComponent = Component.extend('nrg.component.ic.Component', {
            metadata: {
                manifest: 'json'
            }
        });

        CustomComponent.prototype.init = function () {
            Component.prototype.init.apply(this);
            this._initRouter();
        };

        CustomComponent.prototype._initRouter = function () {
            var oRoutes = this.getMetadata().getRoutes(),
                oRouter = this.getRouter(),
                sName;

            //Add a callback to each routes
            for (sName in oRoutes) {
                if (oRoutes.hasOwnProperty(sName)) {
                    oRoutes[sName].callback = this._routeCallback;
                }
            }

            oRouter.initialize();
        };

        return CustomComponent;
    }
);
