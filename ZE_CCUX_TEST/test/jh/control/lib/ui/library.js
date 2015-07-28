/*global sap, jh*/

sap.ui.define(
    [
        'sap/ui/commons/Dialog'
    ],

    function (Dialog) {
        'use strict';

        sap.ui.getCore().initLibrary({
            name: 'jh.control.lib.ui',
			version: '1.0.0',
			dependencies: [
                'sap.ui.core'
            ],

			types: [
                'jh.control.lib.ui.ButtonDesign',
                'jh.control.lib.ui.TooltipDesign'
            ],

			controls: [
                'jh.control.lib.ui.Button',
				'jh.control.lib.ui.Tooltip'
			],

			elements: [],

            interfaces: []
        });

        jh.control.lib.ui.ButtonDesign = {
            None: 'None',
            Default: 'Default',
            Highlight: 'Highlight',
            Invert: 'Invert'
        };

        jh.control.lib.ui.TooltipDesign = {
            None: 'None',
            Default: 'Default'
        };


        /*
        ** Create popup based on style guide
        */
        jh.control.lib.ui.Popup = {};
        jh.control.lib.ui.Popup.create = function (arg1, arg2) {
            var oDialog, sId, mParams;

            if (arguments.length === 1) {
                if (typeof arg1 === 'string') {
                    sId = arg1;
                } else if (typeof arg1 === 'object') {
                    mParams = arg1;
                }
            } else if (arguments.length >= 2) {
                sId = arg1;
                mParams = arg2;
            }

            if (sId) {
                oDialog = new Dialog(sId);
            } else {
                oDialog = new Dialog();
            }

            oDialog.addStyleClass('uteMPopup');
            oDialog.setModal(true);
            oDialog.setResizable(false);

            if (mParams) {
                if (mParams.design) {
                    if (mParams.design !== jh.control.lib.ui.PopupDesign.None) {
                        oDialog.addStyleClass('uteMPopup-design-' + mParams.design.toLowerCase());
                    }
                } else {
                    oDialog.addStyleClass('uteMPopup-design-default');
                }

                if (mParams.title) {
                    oDialog.setTitle(mParams.title);
                }

                if (mParams.content) {
                    oDialog.addContent(mParams.content);
                }

                if (mParams.close) {
                    oDialog.attachClosed(mParams.close);
                }
            }

            return oDialog;
        };

        return jh.control.lib.ui;
    },

    true
);
