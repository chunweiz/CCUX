/*global sap, ute*/

sap.ui.define(
    [],

    function () {
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
                'ute.ui.main.InfolineDesign'
            ],

			controls: [
				'ute.ui.main.Button',
				'ute.ui.main.TabBar',
				'ute.ui.main.TabBarItem',
                'ute.ui.main.TabPanel',
                'ute.ui.main.Label',
                'ute.ui.main.Checkbox',
                'ute.ui.main.RadioButton',
                'ute.ui.main.Infoline'
			],

			elements: [
                'ute.ui.main.TabPanelItem'
            ],

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

        return ute.ui.main;
    },

    true
);
