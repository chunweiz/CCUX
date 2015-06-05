/*global sap, ute*/
/*jslint nomen:true*/

sap.ui.define(
    [
        'sap/ui/core/Control'
    ],

    function (Control) {
        'use strict';

        var CustomControl = Control.extend('ute.ui.main.Infoline', {
            metadata: {
                library: 'ute.ui.main',

                properties: {
                    design: { type: 'ute.ui.main.InfolineDesign', defaultValue: ute.ui.main.InfolineDesign.Default }
                },

                aggregations: {
                    header: { type: 'sap.ui.core.Control', multiple: true, singularName: 'header' },
                    content: { type: 'sap.ui.core.Control', multiple: true, singularName: 'content' }
                },

                defaultAggregation: 'content',

                events: {
                    expand: {
                        parameters: {
                            expanded: { type: 'boolean' }
                        }
                    }
                }
            }
        });

        CustomControl.prototype._addHeaderContent = function (oRm) {
            oRm.write('<section');
            oRm.addClass('uteMIl-hdrContent');
            oRm.writeClasses();
            oRm.write('>');

            this.getHeader().forEach(function (oHeader) {
                oRm.renderControl(oHeader);
            }.bind(this));

            oRm.write('</section>');
        };

        CustomControl.prototype._addHeaderExpander = function (oRm) {

        };

        CustomControl.prototype._addBody = function (oRm) {
            var aContent;

            aContent = this.getContent();
            aContent.forEach(function (oContent) {
                oRm.renderControl(oContent);
            }.bind(this));
        };

        return CustomControl;
    },

    true
);
