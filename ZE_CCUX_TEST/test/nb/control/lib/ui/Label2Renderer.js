/*global sap, tm*/
/*jslint nomen:true*/

sap.ui.define(
    [],

    function () {
        'use strict';

        var ControlRenderer = {},
            sTextClass,
            sColorClass,sResizeClass,sDesignClass,sPaddingClass;

        ControlRenderer.render = function (oRm, oControl) {
            oRm.write('<div');
            oRm.writeControlData(oControl);
            oRm.write('>');

            if (oControl.getIcon()) {
                this.writeImgHtml(oRm, oControl);
            }

            oRm.write('<div');
            oRm.addStyle('margin-top','-25px');
            oRm.writeStyles();
            oRm.write('>');
            oRm.write('<label');

            sPaddingClass = 'uteLabel-padding';
            sColorClass = 'uteLabel-color-' + oControl.getColor().toLowerCase();
            sResizeClass = 'uteLabel-resize-' + oControl.getResize().toLowerCase();
            sDesignClass = 'uteLabel-design-' + oControl.getDesign().toLowerCase();

            oRm.addClass(sPaddingClass);
            oRm.addClass(sColorClass);
            oRm.addClass(sResizeClass);
            oRm.addClass(sDesignClass);

            oRm.writeClasses();

            oRm.write('>');
            oRm.writeEscaped(oControl.getText());


            oRm.write('</label>');
            oRm.write('</div>');

            oRm.write('</div>');
        };

        ControlRenderer.writeImgHtml = function (oRm, oControl) {
            var sColorClass,sResizeClass,sDesignClass,oImage;

            sColorClass = 'uteLabel-color-' + oControl.getColor().toLowerCase();
            sResizeClass = 'uteLabel-resize-' + oControl.getResize().toLowerCase();
            sDesignClass = 'uteLabel-design-' + oControl.getDesign().toLowerCase();
            oImage = oControl._getImage(oControl.getIcon());
            oImage.addStyleClass(sColorClass);
            oImage.addStyleClass(sDesignClass);
            oImage.addStyleClass(sResizeClass);

            oRm.renderControl(oImage);
        };

        return ControlRenderer;
    },

    true
);
