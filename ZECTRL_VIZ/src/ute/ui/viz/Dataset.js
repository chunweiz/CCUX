/*global sap*/

sap.ui.define(
    [
        'sap/ui/core/Element'
    ],

    function (Element) {
        'use strict';

        var CustomElement = Element.extend('ute.ui.viz.Dataset', {
            metadata: {
                library: 'ute.ui.viz',

                aggregations: {
                    dimension: { type: 'sap.ui.core.Element', multiple: true, singularName: 'dimension' }
                }
            }
        });

        return CustomElement;
    },

    true
);
