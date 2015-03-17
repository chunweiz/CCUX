/*globals sap, jQuery, tm*/

(function () {
    'use strict';
    
    jQuery.sap.declare('tm.nav.Component');
    jQuery.sap.require('tm.nav.Router');
    
    sap.ui.core.UIComponent.extend('tm.nav.Component', {
        metadata: {
            dependencies: {
                libs: ['sap.m', 'ute.ui.commons']
            },
            
            routing: {
                config: {
                    routerClass: tm.nav.Router,
                    viewType: sap.ui.core.mvc.ViewType.HTML,
                    viewPath : 'tm.nav.view'
                },
                
                routes: {
                    main001: {
                        pattern: '',
                        view: 'TopLeftDefault',
                        targetControl: 'TopLeftNav',
                        targetAggregation: 'content',
                        clearTarget: true
                    },
                    main002: {
                        pattern: '',
                        view: 'BottomLeftDefault',
                        targetControl: 'BottomLeftNav',
                        targetAggregation: 'content',
                        clearTarget: true
                    },
                    main003: {
                        pattern: '',
                        view: 'MainContentDefault',
                        targetControl: 'MainContentNav',
                        targetAggregation: 'content',
                        clearTarget: true
                    },
                    main004: {
                        pattern: '/bp/{bpNum}/ca/{caNum}',
                        view: 'TopLeft',
                        targetControl: 'TopLeftNav',
                        targetAggregation: 'content',
                        clearTarget: true
                    },
                    main005: {
                        pattern: '/bp/{bpNum}/ca/{caNum}',
                        view: 'BottomLeft',
                        targetControl: 'BottomLeftNav',
                        targetAggregation: 'content',
                        clearTarget: true
                    },
                    main006: {
                        pattern: '/bp/{bpNum}/ca/{caNum}',
                        view: 'MainContent',
                        targetControl: 'MainContentNav',
                        targetAggregation: 'content',
                        clearTarget: true
                    }
                }
            }
        }
    });
    
    tm.nav.Component.prototype.init = function () {
        sap.ui.core.UIComponent.prototype.init.apply(this);
        
        var oRouter = this.getRouter();
        oRouter.setGreedy(true);
        oRouter.initialize();
    };
    
    tm.nav.Component.prototype.destroy = function () {
        sap.ui.core.UIComponent.prototype.destory.apply(this, arguments);
    };
    
    tm.nav.Component.prototype.createContent = function () {
        this.oView = sap.ui.view({
            viewName: 'tm.nav.view.App',
            type: sap.ui.core.mvc.ViewType.HTML
        });
        
        return this.oView;
    };
    
}());

































































