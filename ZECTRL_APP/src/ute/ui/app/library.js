/*global sap, ute*/

sap.ui.define(
    [],

    function () {
        'use strict';

        sap.ui.getCore().initLibrary({
            name: 'ute.ui.app',
            version: '1.0.0',
			dependencies: [
                'sap.ui.core'
            ],

            types: [
                'ute.ui.app.BodyContentLayout',
                'ute.ui.app.SummaryPageDesign',
                'ute.ui.app.ToolPageDesign',
                'ute.ui.app.GeneralPageDesign',
                'ute.ui.app.TagType'
            ],

            controls: [
                'ute.ui.app.App',
                'ute.ui.app.Header',
                'ute.ui.app.HeaderMenu',
                'ute.ui.app.HeaderMenuItem',
                'ute.ui.app.HeaderSubmenu',
                'ute.ui.app.Footer',
                'ute.ui.app.FooterSubmenu',
                'ute.ui.app.Body',
                'ute.ui.app.BodyContent',
                'ute.ui.app.SummaryPage',
                'ute.ui.app.ToolPage',
                'ute.ui.app.GeneralPage',
                'ute.ui.app.Text',
                'ute.ui.app.EventArea',
                'ute.ui.app.Tag',
                'ute.ui.app.IndexWorkCenter',
                'ute.ui.app.IndexGroupLink',
                'ute.ui.app.IndexLink'
            ],

            elements: [],

            interfaces: []
        });

        ute.ui.app.BodyContentLayout = {
            Default: 'Default',
            FullWidthTool: 'FullWidthTool'
        };

        ute.ui.app.SummaryPageDesign = {
            Default: 'Default'
        };

        ute.ui.app.ToolPageDesign = {
            Default: 'Default'
        };

        ute.ui.app.GeneralPageDesign = {
            Default: 'Default'
        };

        ute.ui.app.TagType = {
            Block: 'Block',
            Inline: 'Inline'
        };

        return ute.ui.app;
    },

    true
);
