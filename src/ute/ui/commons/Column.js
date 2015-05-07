/*global sap*/

sap.ui.define(['jquery.sap.global', 'sap/ui/core/Element', 'sap/ui/core/RenderManager', 'sap/ui/model/Filter', 'sap/ui/model/Sorter', 'sap/ui/model/Type', 'sap/ui/model/type/String', './library'],
	function (jQuery, Element, RenderManager, Filter, Sorter, Type, String, library) {
        "use strict";

        var Column = Element.extend('ute.ui.commons.Column', { metadata: {
            library: 'ute.ui.commons.table',
            properties: {
                /* Width of the column.*/
                width: {type: 'sap.ui.core.CSSSize', group: 'Dimension', defaultValue: null},


            },
            defaultAggregation: 'label',
            aggregations: {
                /*label of current column*/
                label: {type: 'sap.ui.core.Control', multiple: false},

                /*The data template to put in the column*/
                template: {type: 'sap.io.core.Control', multiple: false}
            }
        }});



        return Column;

    }, true);
