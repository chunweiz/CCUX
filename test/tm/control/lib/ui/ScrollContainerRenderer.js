/*globals sap*/

sap.ui.define(
    [
        'sap/ui/core/Renderer',
        'sap/m/ScrollContainerRenderer'
    ],

    function (CoreRenderer, ScrollContainerRenderer) {
        return CoreRenderer.extend(ScrollContainerRenderer);
    },

    true
);
