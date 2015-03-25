/*globals sap, jQuery, tm*/
/*jslint nomen:true*/

(function () {
    'use strict';
    
    jQuery.sap.declare('tm.control.comp4.Component');
    
    sap.ui.core.UIComponent.extend('tm.control.comp4.Component', {
        metadata: {
            dependencies: {
                libs: ['tm.control.lib.ui', 'sap.ui.commons']
            },
            
            rootView: {
                viewName: 'tm.control.comp4.view.App',
				type: sap.ui.core.mvc.ViewType.JS
            },
            
            routing: {
                config: {
                    viewType: sap.ui.core.mvc.ViewType.XML,
                    viewPath : 'tm.control.comp4.view'
                },
                
                routes: {
                    main: {
                        pattern: '',
                        view: 'Content',
                        targetControl: 'idDivision',
                        targetAggregation: 'content',
                        clearTarget: true
                    }
                }
            }
        }
    });
    
    tm.control.comp4.Component.prototype.init = function () {
        sap.ui.core.UIComponent.prototype.init.apply(this);
        
        var oRouter = this.getRouter();
        oRouter.initialize();
    };
    
    tm.control.comp4.Component.destroy = function () {
        sap.ui.core.UIComponent.prototype.destory.apply(this, arguments);
    };
    
}());