/*global sap*/

sap.ui.define(['jquery.sap.global', 'sap/ui/core/Control'],
	function (jQuery, Control) {
        "use strict";

        var TableColumn = Control.extend('ute.ui.commons.TableColumn', { metadata: {
            library: 'ute.ui.commons',
            properties: {
                /* Width of the column.*/
                width: {
                    type: 'sap.ui.core.CSSSize',
                    group: 'Dimension',
                    defaultValue: null
                },
                sortable: {
                    type: 'boolean',
                    group: 'Appearance',
                    defaultValue: false
                },
                sortDescend: {
                    type: 'boolean',
                    group: 'Appearance',
                    defaultValue: true
                }
            },
            defaultAggregation: 'cells',
            aggregations: {
                /*label of current column*/
                cells: {
                    type: 'sap.ui.core.Control',
                    multiple: true,
                    singularName: 'cell'
                }
            },
            events: {
                /*Event onPress*/
                press: {}
            }
        }});


        TableColumn.prototype.onclick = function (oEvent) {
            if (this.getSortable()) {
                //var test = oEvent.currentTarget;
                //var test1 = test.attributes[0].value;
                if (this.getSortDescend()) {
                    this.setSortDescend(false);
                    //jQuery('span.uteTb-column-sortingArrowDown').toggleClass('uteTb-column-sortingArrowDown', 'uteTb-column-sortingArrowUp');
                } else {
                    this.setSortDescend(true);
                }
                this.firePress({});
            }

            oEvent.preventDefault();
            oEvent.stopPropagation();
        };


        return TableColumn;

    }, true);
