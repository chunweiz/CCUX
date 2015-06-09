/*global sap*/
/*jslint nomen:true*/

sap.ui.define(
    [
        'sap/ui/core/Control',
        'sap/ui/core/Popup'
    ],

    function (Control, Popup) {
        'use strict';

        var CustomControl = Control.extend('nb.ui.main.Dropdown', {
            metadata: {
                library: 'nb.ui.main',

                properties: {
                    design: { type: 'nb.ui.main.InfolineDesign', defaultValue: nb.ui.main.InfolineDesign.Default },
                    expanded: { type: 'boolean', defaultValue: false }
                },
                 aggregations: {
                    headerContent: { type: 'sap.ui.core.Control', multiple: true, singularName: 'headerContent' },
                    content: { type: 'sap.ui.core.Control', multiple: true, singularName: 'content' },
                    _headerExpander: { type: 'sap.ui.core.Control', multiple: false, visibility: 'hidden' }
                },


                events: {
                    select: {
                        parameters: {
                            key: { type: 'string' }
                        }
                    }
                }
            }
        });

        CustomControl.prototype.init = function () {
            this._oPopup = new Popup();
        };

        return CustomControl;
    },

    true
);
