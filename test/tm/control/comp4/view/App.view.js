/*globals sap, tm*/

(function () {
    'use strict';
    
    sap.ui.jsview('tm.control.comp4.view.App', {
        createContent: function () {
            return new tm.control.lib.ui.Division('idDivision');
        }
    });
}());