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
			types: [
                'nb.control.lib.ui.BadgeDesign',
                'nb.control.lib.ui.CSSDisplay',
                'nb.control.lib.ui.CSSPosition',
                'nb.control.lib.ui.HorizontalDividerDesign',
                'nb.control.lib.ui.HorizontalDividerHeight',
                'nb.control.lib.ui.HorizontalDividerSize',
                'nb.control.lib.ui.ButtonType',
                'nb.control.lib.ui.ToggleButtonType',
                'nb.control.lib.ui.DropdownArrowColor',
                'nb.control.lib.ui.DropdownArrowType ',
                'nb.control.lib.ui.DropdownBorder',
                'nb.control.lib.ui.DropdownBackground',
                'nb.control.lib.ui.TextViewDesign',
                'nb.control.lib.ui.TextViewColor'

            ],

			controls: [
				'nb.control.lib.ui.InfoLine',
                'nb.control.lib.ui.Dialog',
                'nb.control.lib.ui.Badge',
                'nb.control.lib.ui.Button',
                'nb.control.lib.ui.ToggleButton',
                'nb.control.lib.ui.Tag',
                'nb.control.lib.ui.Textfield',
                'nb.control.lib.ui.TextView',
                'nb.control.lib.ui.CheckBox',
                'nb.control.lib.ui.RadioButton',
                'nb.control.lib.ui.RedCrossSign',
				'nb.control.lib.ui.HorizontalDivider',
                'nb.control.lib.ui.Dropdown',
                'nb.control.lib.ui.DropdownListItem',
                'nb.control.lib.ui.Table',
                'nb.control.lib.ui.TableColumn',
                'nb.control.lib.ui.TableRow',
                'nb.control.lib.ui.ScrollContainer'


			],

			elements: [],
            interfaces: []
		});

        nb.control.lib.ui.TableType = {
            InvoiceTable: 'InvoiceTable',
            DppTable: 'DppTable',
            DppDeniedTable: 'DppDeniedTable',
            CampaignTable: 'CampaignTable'
        };

        nb.control.lib.ui.ButtonType = {
            GeneralAction: 'GeneralAction',
            GeneralCancel: 'GeneralCancel',
            GeneralInfo: 'GeneralInfo',
            SpecialNav: 'SpecialNav',
            SpecialCalculator: 'SpecialCalculator'
        };

        nb.control.lib.ui.ToggleButtonType = {
            ToggleCampaign: 'ToggleCampaign',
            ToggleDashboard: 'ToggleDashboard'
        };

        ute.ui.commons.TextfieldType = {
            Regular: 'Regular',
            Underlined: 'Underlined'
        };

        nb.control.lib.ui.BadgeDesign = {
            Alert: 'Alert',
            Attention: 'Attention',
            Regular: 'Regular'

        };

	    nb.control.lib.ui.HorizontalDividerDesign = {
		    Solid: 'Solid',
            Dotted: 'Dotted'
	    };

	    nb.control.lib.ui.HorizontalDividerHeight = {
            None: 'None',
		    Small: 'Small',
		    Medium: 'Medium',
		    Large: 'Large'
	    };

        nb.control.lib.ui.HorizontalDividerSize = {
		    Small: 'Small',
		    Medium: 'Medium',
		    Large: 'Large'
	    };
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

   /*Designs for TextView.*/

	   nb.control.lib.ui.TextViewDesign = {

        Small: "Small",
        Base : "Base",
        Large: "Large"

	   };
    /**
	 * Semantic Colors of a text.
	 */
	nb.control.lib.ui.TextViewColor = {

		Default : "Default"
		/*Positive : "Positive",
		Negative : "Negative",
		Critical : "Critical"*/

	};

        nb.control.lib.ui.CSSDisplay = DataType.createType('nb.control.lib.ui.CSSDisplay', {
            isValid : function (sValue) {
                return (/^(inline|block|flex|inline\-block|inline\-flex|inline\-table|list\-item|run\-in|table|table\-caption|table\-column\-group|table\-header\-group|table\-footer\-group|table\-row\-group|table\-cell|table\-column|table\-row|none|initial|inherit)$/).test(sValue);
            }
        }, DataType.getType('string'));

        nb.control.lib.ui.CSSPosition = DataType.createType('nb.control.lib.ui.CSSPosition', {
            isValid : function (sValue) {
                return (/^(static|absolute|fixed|relative|initial|inherit)$/).test(sValue);
            }
        }, DataType.getType('string'));


                                return nb.control.lib.ui;
                }
);
