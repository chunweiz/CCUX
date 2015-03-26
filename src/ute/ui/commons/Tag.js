/*globals sap*/
/*jslint nomen:true*/

sap.ui.define(['sap/ui/core/Control'],
    function (Control) {
        'use strict';

        var Tag = Control.extend('ute.ui.commons.Tag', {
            metadata: {
                library: 'ute.ui.commons',
                properties: {
                    type: {
                        type: 'string',
                        defaultValue: 'div'
                    },
                    text: {
                        type: 'string',
                        defaultValue: ''
                    },
                    classes: {
                        type: 'string',
                        defaultValue: '[]'
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

        return Tag;

    }, true);
