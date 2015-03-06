sap.ui.define([],
function(jquery) {
	'use strict';

	var InfoLineRenderer = {};

	InfoLineRenderer.render = function(oRm, oControl) {
		oRm.write('<div');
        oRm.writeControlData(oControl);

        oRm.addClass('uteInfoLine');
        oRm.writeClasses();
        oRm.write('>');
        oRm.write('<ul>');
        oRm.write('<li>');

        oRm.write('<input type="checkbox" checked />');
        oRm.write('<i></i>');

        oRm.write('<div');
        oRm.addClass('uteInfoLineItemTitle');
        oRm.writeClasses();
        oRm.write('>');
        oRm.write('Title</div>'); //uteInfoLineItemTitle div

        oRm.write('<div');
        oRm.addClass('uteInfoLineItemContent');
        oRm.writeClasses();
        oRm.write('>');
        oRm.write('Lorem ipsum sit dol mit...</div>'); //uteInfoLineItemContent div

        oRm.write('</li>');
        oRm.write('</ul>');
        oRm.write('</div>'); //uteInfoLine div
	}

	return InfoLineRenderer;

}, true);

/*
<div class="uteInfoLine">
    <ul>
        <li>
            <input type="checkbox" checked>
            <i></i>
            <div class="uteInfoLineItemTitle">
                <span>Title</span>
            </div>
            <div class="uteInfoLineItemContent">
                Lorem ipsum sit dol mit...
            </div>
        </li>
    </ul>
</div>
*/