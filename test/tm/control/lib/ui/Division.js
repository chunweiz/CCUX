/*globals sap*/
/*jslint nomen:true*/

sap.ui.define(['sap/ui/core/Control'],
    function (Control) {
        'use strict';

        var Division = Control.extend('tm.control.lib.ui.Division', {
            metadata: {
                library: 'tm.control.lib.ui',
                properties: {
                    height: {
                        type: 'sap.ui.core.CSSSize',
                        defaultValue: '100%'
                    },
                    width: {
                        type: 'sap.ui.core.CSSSize',
                        defaultValue: '100%'
                    },
                    inline: {
                        type: 'boolean',
                        defaultValue: false
                    }
                },
                aggregations: {
                    content: {
                        type: 'sap.ui.core.Control',
                        multiple : true,
                        singularName : 'content'
                    }
                },
                defaultAggregation : 'content'
            }
        });

        return Division;

    }, true);