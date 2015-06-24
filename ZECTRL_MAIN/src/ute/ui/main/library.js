/*global sap, ute*/

sap.ui.define(
    [
        'sap/ui/commons/Dialog'
    ],

    function (Dialog) {
        'use strict';

        sap.ui.getCore().initLibrary({
            name: 'ute.ui.main',
			version: '1.0.0',
			dependencies: [
                'sap.ui.core'
            ],

			types: [
                'ute.ui.main.ButtonDesign',
                'ute.ui.main.TabBarDesign',
                'ute.ui.main.TabBarItemDesign',
                'ute.ui.main.TabPanelDesign',
                'ute.ui.main.TabPanelItemDesign',
                'ute.ui.main.CheckboxDesign',
                'ute.ui.main.RadioButtonDesign',
                'ute.ui.main.InfolineDesign',
                'ute.ui.main.PopupDesign',
                'ute.ui.main.DropdownDesign',
                'ute.ui.main.DropdownItemDesign'
            ],

			controls: [
				'ute.ui.main.Button',
				'ute.ui.main.TabBar',
				'ute.ui.main.TabBarItem',
                'ute.ui.main.TabPanel',
                'ute.ui.main.TabPanelItem',
                'ute.ui.main.Label',
                'ute.ui.main.Checkbox',
                'ute.ui.main.RadioButton',
                'ute.ui.main.Infoline',
                'ute.ui.main.Dropdown',
                'ute.ui.main.DropdownItem'
			],

			elements: [],

            interfaces: []
        });

        ute.ui.main.ButtonDesign = {
            None: 'None',
            Default: 'Default',
            Highlight: 'Highlight',
            Invert: 'Invert'
        };

        ute.ui.main.TabBarDesign = {
            None: 'None',
            Default: 'Default',
            Invert: 'Invert'
        };

        ute.ui.main.TabBarItemDesign = ute.ui.main.TabBarDesign;

        ute.ui.main.TabPanelDesign = {
            None: 'None',
            Default: 'Default'
        };

        ute.ui.main.TabPanelItemDesign = ute.ui.main.TabPanelDesign;

        ute.ui.main.CheckboxDesign = {
            None: 'None',
            Default: 'Default'
        };

        ute.ui.main.RadioButtonDesign = {
            None: 'None',
            Default: 'Default'
        };

        ute.ui.main.InfolineDesign = {
            None: 'None',
            Default: 'Default'
        };

        ute.ui.main.PopupDesign = {
            None: 'None',
            Default: 'Default'
        };

        ute.ui.main.DropdownDesign = {
            None: 'None',
            Default: 'Default',
            Plain: 'Plain'
        };

        ute.ui.main.DropdownItemDesign = ute.ui.main.DropdownDesign;

        /*
        ** Create popup based on style guide
        */
        ute.ui.main.Popup = {};
        ute.ui.main.Popup.create = function (arg1, arg2) {
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
                    if (mParams.design !== ute.ui.main.PopupDesign.None) {
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

        return ute.ui.main;
    },

    true
);
