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

        var Control = CoreControl.extend('nb.control.lib.ui.Label', {
            metadata: {
                library: 'nb.control.lib.ui',

                properties: {

                    icon: {
                        type: 'sap.ui.core.URI',
                        defaultValue: null
                    },
                    design: {
                        type: 'nb.control.lib.ui.LabelDesign2',
                        defaultValue: nb.control.lib.ui.LabelDesign.AppHeader
                    },
                    notificationDesign: {
                        type: 'nb.control.lib.ui.LabelNotificationDesign',
                        defaultValue: nb.control.lib.ui.LabelNotificationDesign.Grey
                    },
                    campaignDesign: {
                        type: 'nb.control.lib.ui.LabelCampaignDesign',
                        defaultValue: nb.control.lib.ui.LabelCampaignDesign.Grey
                    },
                    text: {
                        type: 'string',
                        defaultValue: ''
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
