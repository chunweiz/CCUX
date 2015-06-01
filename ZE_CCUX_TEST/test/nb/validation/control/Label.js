/*global sap, tm*/
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

        var Control = CoreControl.extend('tm.message.control.Label', {
            metadata: {
                library: 'tm.message.control',

                properties: {
                    design: {
                        type: 'tm.message.control.LabelDesign',
                        defaultValue: tm.message.control.LabelDesign.None
                    },
                    icon: {
                        type: 'sap.ui.core.URI',
                        defaultValue: null
                    },
                    text: {
                        type: 'string',
                        defaultValue: ''
                    }
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
