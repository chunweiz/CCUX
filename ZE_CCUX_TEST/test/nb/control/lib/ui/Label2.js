/*global sap, nb*/
/*jslint nomen:true*/

sap.ui.define(
    [
        'sap/ui/core/Control',
        'sap/ui/core/EnabledPropagator',
        'sap/ui/core/IconPool',
        'sap/m/Image'
    ],

    function (CoreControl, CoreEnabledPropagator, CoreIconPool) {
        'use strict';

        var Control = CoreControl.extend('nb.control.lib.ui.Label2', {
            metadata: {
                library: 'nb.control.lib.ui',

                properties: {

                    icon: {
                        type: 'sap.ui.core.URI',
                        defaultValue: null
                    },
                    text: {
                        type: 'string',
                        defaultValue: ''
                    },
                    design: {
                        type: 'nb.control.lib.ui.LabelDesign',
                        defaultValue: nb.control.lib.ui.LabelDesign.Regular
                    },
                    color: {
                        type: 'nb.control.lib.ui.LabelColor',
                        defaultValue: nb.control.lib.ui.LabelColor.None
                    },
                    resize: {
                        type: 'nb.control.lib.ui.LabelResize',
                        defaultValue: nb.control.lib.ui.LabelResize.Small
                    },
                    textAlign: {
                        type: 'nb.control.lib.ui.LabelTtextAlign',
                        defaultValue: nb.control.lib.ui.LabelResize.Small
                    },

                }
            }
        });

        CoreEnabledPropagator.call(Control.prototype);

        Control.prototype.exit = function () {
            if (this._oImage) {
                this._oImage.destroy();
            }
        };

        Control.prototype._getImage = function (sSrc) {
            if (this._oImage && (this._oImage.getSrc() !== sSrc)) {
                this._oImage.destroy();
                this._oImage = undefined;
            }

            this._oImage = CoreIconPool.createControlByURI(sSrc, sap.m.Image);

            return this._oImage;
        };

        return Control;
    },

    true
);
