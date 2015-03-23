/*globals sap, nrg, jQuery*/
/*jslint nomen: true*/

(function () {
    'use strict';
    
    jQuery.sap.declare('nrg.comp.retention.Component');
    jQuery.sap.require('nrg.util.nav.GreedyRouter');
    
    sap.ui.core.UIComponent.extend('nrg.comp.retention.Component', {
        metadata: {
            name : 'Reliant Interaction Center for Retention Agent',
            version : '1.0.0.0',
            includes: ['../../css/nrg.css'],
            dependencies: {
                libs: ['sap.m', 'sap.ui.layout', 'ute.ui.commons']
            },
            
            config: {
                service: {
                    oData: {
                        crm: 'www.google.com',
                        ecc: 'www.utegration.com'
                    }
                }
            },
            
            rootView: {
                viewName: 'nrg.view.App',
				type: sap.ui.core.mvc.ViewType.XML
            },
            
            routing: {
                config: {
                    routerClass: nrg.util.nav.GreedyRouter,
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
    
    nrg.comp.retention.Component.prototype.init = function () {
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
    
    nrg.comp.retention.Component.prototype.destroy = function () {
        sap.ui.core.UIComponent.prototype.destory.apply(this, arguments);
    };

    nrg.comp.retention.Component.prototype._routeCallback = function (route, args, config, targetControl, view) {
        
    };
    
}());