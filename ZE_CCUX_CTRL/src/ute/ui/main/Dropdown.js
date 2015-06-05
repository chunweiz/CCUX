/*global sap*/
/*jslint nomen:true*/

sap.ui.define(
    [
        'sap/ui/core/Control',
        'sap/ui/core/Popup'
    ],

    function (Control, Popup) {
        'use strict';

        var CustomControl = Control.extend('ute.ui.main.Dropdown', {
            metadata: {
                library: 'ute.ui.main',

                properties: {

                },

                events: {
                    select: {
                        parameters: {
                            key: { type: 'string' }
                        }
                    }
                }
            }
        });

        CustomControl.prototype.init = function () {
            this._oPopup = new Popup();
        };

        return CustomControl;
    },

    true
);
