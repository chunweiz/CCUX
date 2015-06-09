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
                'nb.ui.main.InfolineDesign'
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

        return nb.ui.main;
    },

    true
);
