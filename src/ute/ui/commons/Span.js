/*globals sap*/
/*jslint nomen:true*/

sap.ui.define(['sap/ui/core/Control'],
    function (Control) {
        'use strict';

        var Span = Control.extend('ute.ui.commons.Span', {
            metadata: {
                library: 'ute.ui.commons',
                properties: {
                    text: {
                        type: 'string',
                        defaultValue: ''
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

        return Span;

    }, true);
