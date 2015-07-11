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
                'ute.ui.app.SummaryPageDesign',
                'ute.ui.app.ToolPageDesign',
                'ute.ui.app.GeneralPageDesign'
            ],

            controls: [
                'ute.ui.app.App',
                'ute.ui.app.Header',
                'ute.ui.app.Footer',
                'ute.ui.app.Body',
                'ute.ui.app.SummaryPage',
                'ute.ui.app.ToolPage',
                'ute.ui.app.GeneralPage'
            ],

            elements: [],

            interfaces: []
        });

        ute.ui.SummaryPageDesign = {
            Default: 'Default'
        };

        ute.ui.ToolPageDesign = {
            Default: 'Default'
        };

        ute.ui.GeneralPageDesign = {
            Default: 'Default'
        };

        return ute.ui.app;
    },

    true
);
