/*global sap, ute*/

sap.ui.define(
    [],

    function () {
        'use strict';

        sap.ui.getCore().initLibrary({
            name: 'nb.ui.main',
			version: '1.0.0',
			dependencies: [
                'sap.ui.core'
            ],

			types: [
                'nb.ui.main.ButtonDesign',
                'nb.ui.main.ToggleBarDesign',
                'nb.ui.main.CheckboxDesign',
                'nb.ui.main.InfolineDesign',
                'nb.ui.main.DropdownDesign'
            ],

			controls: [
				'nb.ui.main.Button',
				'nb.ui.main.ToggleBar',
                'nb.ui.main.Label',
                'nb.ui.main.Checkbox',
                'nb.ui.main.Infoline',
                'nb.ui.main.Dropdown'
			],

			elements: [
                'nb.ui.main.ToggleBarItem'
            ],

            interfaces: []
        });

        nb.ui.main.ButtonDesign = {
            None: 'None',
            Default: 'Default',
            Highlight: 'Highlight',
            Invert: 'Invert'
        };

        nb.ui.main.CheckboxDesign = {
            None: 'None',
            Default: 'Default'
        };

        nb.ui.main.InfolineDesign = {
            None: 'None',
            Default: 'Default'
        };

        nb.ui.main.ToggleBarDesign = {
            None: 'None',
            Default: 'Default',
            Invert: 'Invert'
        };

         nb.ui.main.DropdownDesign = {
            None: 'None',
            Default: 'Default'
        };

        return nb.ui.main;
    },

    true
);
