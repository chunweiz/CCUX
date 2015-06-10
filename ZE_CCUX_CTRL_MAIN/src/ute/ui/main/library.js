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
                'ute.ui.main.ToggleBarDesign',
                'ute.ui.main.CheckboxDesign',
                'ute.ui.main.InfolineDesign'
            ],

			controls: [
				'ute.ui.main.Button',
				'ute.ui.main.ToggleBar',
                'ute.ui.main.Label',
                'ute.ui.main.Checkbox',
                'ute.ui.main.Infoline',
                'ute.ui.main.Dropdown'
			],

			elements: [
                'ute.ui.main.ToggleBarItem'
            ],

            interfaces: []
        });

        ute.ui.main.ButtonDesign = {
            None: 'None',
            Default: 'Default',
            Highlight: 'Highlight',
            Invert: 'Invert'
        };

        ute.ui.main.CheckboxDesign = {
            None: 'None',
            Default: 'Default'
        };

        ute.ui.main.InfolineDesign = {
            None: 'None',
            Default: 'Default'
        };

        ute.ui.main.ToggleBarDesign = {
            None: 'None',
            Default: 'Default',
            Invert: 'Invert'
        };

        return ute.ui.main;
    },

    true
);
