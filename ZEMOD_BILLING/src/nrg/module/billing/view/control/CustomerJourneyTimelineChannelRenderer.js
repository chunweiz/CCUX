/*global sap*/
/*jslint nomen:true*/
sap.ui.define(
    [],

    function () {
        'use strict';

        var CustomRenderer = {};

        CustomRenderer.render = function (oRm, oCustomControl) {
            oRm.write('<div');
            oRm.writeControlData(oCustomControl);
            oRm.addClass('tmCJTChannel');

            if (oCustomControl.getSelected()) {
                oRm.addClass('tmCJTChannel-selected');
            }

            oRm.writeClasses();
            oRm.write('>');

            this._renderLeftLine(oRm, oCustomControl);
            this._renderEmblem(oRm, oCustomControl);
            this._renderRightLine(oRm, oCustomControl);

            if (oCustomControl.getRightDivider()) {
                this._renderRightDivider(oRm, oCustomControl);
            }

            oRm.write('</div>');
        };

        CustomRenderer._renderEmblem = function (oRm, oCustomControl) {
            oRm.write('<div');
            oRm.addClass('tmCJTChannel-emblem');
            oRm.writeClasses();
            oRm.write('>');

            this._renderTopLabel(oRm, oCustomControl);
            this._renderIcon(oRm, oCustomControl);

            oRm.write('</div>');
        };

        CustomRenderer._renderTopLabel = function (oRm, oCustomControl) {
            oRm.write('<div');
            oRm.addClass('tmCJTChannel-topLabel');
            oRm.writeClasses();
            oRm.write('>');

            if (oCustomControl.getTopLabel()) {
                oRm.writeEscaped(oCustomControl.getTopLabel());
            }

            oRm.write('</div>');
        };

        CustomRenderer._renderIcon = function (oRm, oCustomControl) {
            oRm.write('<div');
            oRm.writeAttribute('id', oCustomControl.getId() + '-icon');
            oRm.addClass('tmCJTChannel-icon');
            oRm.writeClasses();
            oRm.write('>');

            oRm.writeIcon(oCustomControl.getChannelIcon());

            oRm.write('</div>');
        };

        CustomRenderer._renderLeftLine = function (oRm, oCustomControl) {
            oRm.write('<div');
            oRm.addClass('tmCJTChannel-line');
            oRm.addClass('tmCJTChannel-line-left');
            oRm.writeClasses();
            oRm.write('>');
            oRm.write('</div>');
        };

        CustomRenderer._renderRightLine = function (oRm, oCustomControl) {
            oRm.write('<div');
            oRm.addClass('tmCJTChannel-line');
            oRm.addClass('tmCJTChannel-line-right');
            oRm.writeClasses();
            oRm.write('>');
            oRm.write('</div>');
        };

        CustomRenderer._renderRightDivider = function (oRm, oCustomControl) {
            oRm.write('<div');
            oRm.addClass('tmCJTChannel-divider');
            oRm.writeClasses();
            oRm.write('>');

            /* TODO: Render a zig zag icon? */

            oRm.write('</div>');
        };

        return CustomRenderer;
    }
);
