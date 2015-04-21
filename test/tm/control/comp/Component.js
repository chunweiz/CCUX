/*globals sap, jQuery, tm*/
/*jslint nomen:true*/

(function () {
    'use strict';
    
    jQuery.sap.declare('tm.control.comp.Component');
    
    sap.ui.core.UIComponent.extend('tm.control.comp.Component', {
        metadata: {
            dependencies: {
                libs: ['tm.control.lib.ui', 'sap.ui.commons']
            },
            
            rootView: {
                viewName: 'tm.control.comp.view.App',
				type: sap.ui.core.mvc.ViewType.XML
            }
        }
    });
    
}());