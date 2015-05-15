/*globals sap, nb*/

sap.ui.define(
    [
        'sap/ui/base/DataType'
    ],

    function (DataType) {
                                'use strict';

                                sap.ui.getCore().initLibrary({
                                                name: 'nb.control.lib.ui',
                                                version: '1.0.0',
                                                dependencies: ['sap.ui.core'],
/*
            types: [
                'nb.control.lib.ui.BadgeDesign'
            ],*/

                                                controls: [
                                                                'nb.control.lib.ui.Dropdown',
                'nb.control.lib.ui.DropdownListItem'
                                                ],

            interfaces: [],
                                                elements: []
                                });

        nb.control.lib.ui.DropdownArrowColor = {
            Blue: 'Blue',
            Grey: 'Grey'
        };
        nb.control.lib.ui.DropdownArrowType = {
            Solid: 'Solid',
            Hollow: 'Hollow'
        };
        nb.control.lib.ui.DropdownBorder = {
            All: 'All',
            None: 'None',
            Bottom: 'Bottom'
        };
        nb.control.lib.ui.DropdownBackground = {
            White: 'White',
            Transparent: 'Transparent',
            Inactive: 'Inactive'
        };

                                return nb.control.lib.ui;
                }
);
