/*global sap*/

sap.ui.define(['jquery.sap.global', 'sap/ui/core/Control'],
	function (jQuery, Control) {
        "use strict";

        var TableColumn = Control.extend('ute.ui.commons.TableColumn', { metadata: {
            library: 'ute.ui.commons',
            properties: {
                /* Width of the column.*/
                width: {type: 'sap.ui.core.CSSSize', group: 'Dimension', defaultValue: null}
            },
            defaultAggregation: 'cells',
            aggregations: {
                /*label of current column*/
                cells: {
                    type: 'sap.ui.core.Control',
                    multiple: true,
                    singularName: 'cell'
                }
            }
        }});



        return TableColumn;

    }, true);
