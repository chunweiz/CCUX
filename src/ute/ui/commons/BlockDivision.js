/*globals sap*/
/*jslint nomen:true*/

sap.ui.define(['sap/ui/core/Control'],
    function (Control) {
        'use strict';

        var BlockDivision = Control.extend('ute.ui.commons.BlockDivision', {
            metadata: {
                library: 'ute.ui.commons',
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
                        multiple: true
                    }
                },
                defaultAggregation : 'content'
            }
        });

        return BlockDivision;

    }, true);
