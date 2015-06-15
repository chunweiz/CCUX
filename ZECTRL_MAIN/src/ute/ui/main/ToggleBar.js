/*global sap, ute*/
/*jslint nomen:true*/

sap.ui.define(
    [
        'sap/ui/core/Control',
        'sap/ui/core/EnabledPropagator'
    ],

    function (Control, EnabledPropagator) {
        'use strict';

        var CustomControl = Control.extend('ute.ui.main.ToggleBar', {
            metadata: {
                library: 'ute.ui.main',

                properties: {
                    design: { type: 'ute.ui.main.ToggleBarDesign', defaultValue: ute.ui.main.ToggleBarDesign.Default },
                    selectedKey: { type: 'string', defaultValue: null }
                },

                aggregations: {
                    content: { type: 'ute.ui.main.ToggleBarItem', multiple: true, singularName: 'content' }
                },

                defaultAggregation: 'content',

                events: {
                    press: {
                        parameters: {
                            selectedKey: { type: 'string' }
                        }
                    }
                }
            }
        });

        EnabledPropagator.call(CustomControl.prototype);

        CustomControl.prototype._handleToggleBarItemPressed = function (oControlEvent) {

        };

        return CustomControl;
    },

    true
);
