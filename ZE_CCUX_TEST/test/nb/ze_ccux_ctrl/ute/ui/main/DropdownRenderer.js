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
            oRm.addClass('uteMDd');

            if (oCustomControl.getDesign() !== nb.ui.main.DropdownDesign.None) {
                oRm.addClass('uteMDd-design-' + oCustomControl.getDesign().toLowerCase());
            }
            oRm.writeClasses();
            oRm.write('>');

            console.log('Dropdown render: ' + oCustomControl.getExpanded());
            this._addHeader(oRm, oCustomControl);
            this._addContent(oRm, oCustomControl);
            oRm.write('</div>');
        };

         CustomRenderer._addHeader = function (oRm, oCustomControl) {
            oRm.write('<header');
            oRm.addClass('uteMDd-hdr');
            oRm.writeClasses();
            oRm.write('>');

            this._addHeaderContent(oRm, oCustomControl);
            this._addHeaderExpander(oRm, oCustomControl);

            oRm.write('</header>');
        };

        CustomRenderer._addHeaderContent = function (oRm, oCustomControl) {
            var aHdrContent;

            oRm.write('<article');
            oRm.addClass('uteMDd-hdrContent');
            oRm.writeClasses();
            oRm.write('>');

            aHdrContent = oCustomControl.getHeaderContent();
            if (aHdrContent) {
                aHdrContent.forEach(function (oHdrContent) {
                    oRm.renderControl(oHdrContent);
                });
            }

            oRm.write('</article>');
        };

          CustomRenderer._addHeaderExpander = function (oRm, oCustomControl) {
            var oHdrExpander;

            oRm.write('<aside');
            oRm.addClass('uteMDd-hdrExpander');
            oRm.writeClasses();
            oRm.write('>');

            oHdrExpander = oCustomControl.getAggregation('_headerExpander');
            oHdrExpander.addStyleClass('uteMDd-hdrExpanderDesign-' + oCustomControl.getDesign().toLowerCase());

            oRm.renderControl(oHdrExpander);

            oRm.write('</aside>');
        };

        CustomRenderer._addContent = function (oRm, oCustomControl) {
            var aContent;

            oRm.write('<section');
            oRm.addClass('uteMDd-body');

            if (!oCustomControl.getExpanded()) {
                oRm.addClass('uteMDd-body-hidden');
            }

            oRm.writeClasses();
            oRm.write('>');

            aContent = oCustomControl.getContent();
            if (aContent) {
                aContent.forEach(function (oContent) {
                    oRm.renderControl(oContent);
                });
            }

            oRm.write('</section>');
        };


        return CustomRenderer;

    },

    true
);
