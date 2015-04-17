/*globals sap, ute*/

sap.ui.define(['jquery.sap.global', 'sap/ui/base/DataType', 'sap/ui/core/library'],
	function (jQuery, DataType, Library) {
		'use strict';

		sap.ui.getCore().initLibrary({
			name: 'ute.ui.commons',
			version: '1.0.0.0',
			dependencies: ['sap.ui.core'],
			types: [
                'ute.ui.commons.BadgeType',
                'ute.ui.commons.CSSDisplay',
                'ute.ui.commons.CSSPosition'
            ],
			interfaces: [],
			controls: [
				'ute.ui.commons.InfoLine',
                'ute.ui.commons.Dialog',
                'ute.ui.commons.Badge',
                'ute.ui.commons.Button',
                'ute.ui.commons.ToggleButton',
                'ute.ui.commons.Tag',
                'ute.ui.commons.Input',
                'ute.ui.commons.CheckBox',
                'ute.ui.commons.RadioButton'
			],
			elements: []
		});
    
        ute.ui.commons.BadgeType = {
            Alert: 'Alert',
            Attention: 'Attention',
            Regular: 'Regular'
            
        };
    
        ute.ui.commons.CSSDisplay = DataType.createType('ute.ui.commons.CSSDisplay', {
            isValid : function (sValue) {
                return (/^(inline|block|flex|inline\-block|inline\-flex|inline\-table|list\-item|run\-in|table|table\-caption|table\-column\-group|table\-header\-group|table\-footer\-group|table\-row\-group|table\-cell|table\-column|table\-row|none|initial|inherit)$/).test(sValue);
            }
        }, DataType.getType('string'));
    
        ute.ui.commons.CSSPosition = DataType.createType('ute.ui.commons.CSSPosition', {
            isValid : function (sValue) {
                return (/^(static|absolute|fixed|relative|initial|inherit)$/).test(sValue);
            }
        }, DataType.getType('string'));

		return ute.ui.commons;
		
	}, false);
