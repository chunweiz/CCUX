/*global sap*/

sap.ui.define(
    [
        'sap/ui/core/Control'
    ],

    function (Control) {
        'use strict';

        var CustomControl = Control.extend('test.tm.ze_ccux_ctrl.view.CustJourneyLifecycleTimeline', {
            metadata: {
                properties: {

                }
            },

            renderer: function (oRm, oCustomControl) {
                oRm.write('<div');
                oRm.writeControlData(oCustomControl);
                oRm.addClass('tmCustJLcTimeline');
                oRm.writeClasses();
                oRm.write('>');



                oRm.write('</div>');
            }
        });

        CustomControl.prototype.onExit = function () {
            this._oDataModel = null;
        };

        CustomControl.prototype.setDataModel = function (oDataModel) {
            this._oDataModel = oDataModel;
        };

        CustomControl.prototype.refresh = function () {
            this.rerender();
        };

        return CustomControl;
    }
);
