/*globals sap, nrg, jQuery*/
/*jslint nomen: true*/

(function () {
    'use strict';
    
    jQuery.sap.declare('nrg.comp.ic.Component');
    jQuery.sap.require('nrg.nav.GreedyRouter');
    
    sap.ui.core.UIComponent.extend('nrg.comp.ic.Component', {
        metadata: {
            dependencies: {
                libs: ['sap.m', 'sap.ui.layout', 'ute.ui.commons']
            },
            
            rootView: {
                viewName: 'nrg.view.App',
				type: sap.ui.core.mvc.ViewType.XML
            },
            
            routing: {
                config: {
                    routerClass: nrg.nav.GreedyRouter,
                    viewType: sap.ui.core.mvc.ViewType.XML,
                    viewPath : 'nrg.view'
                },
                
                routes: {
                    main001: {
                        pattern: '',
                        view: 'TopLeftDefault',
                        targetControl: 'TopLeftNav',
                        targetAggregation: 'content',
                        clearTarget: true
                    }
                }
            }
        }
    });
    
    nrg.comp.ic.Component.prototype.init = function () {
        sap.ui.core.UIComponent.prototype.init.apply(this);
        
        var oRoutes = this.getMetadata().getRoutes(),
            oRouter = this.getRouter(),
            sName;
        
        //Add a callback to each routes
        for (sName in oRoutes) {
            if (oRoutes.hasOwnProperty(sName)) {
                oRoutes[sName].callback = this._routeCallback;
            }
        }
        
        oRouter.setGreedy(true);
        oRouter.initialize();
    };
    
    nrg.comp.ic.Component.prototype.destroy = function () {
        sap.ui.core.UIComponent.prototype.destory.apply(this, arguments);
    };

    nrg.comp.ic.Component.prototype._routeCallback = function (route, args, config, targetControl, view) {
        
    };
    
}());