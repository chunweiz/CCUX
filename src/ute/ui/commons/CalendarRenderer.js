/*global sap*/
/*jslint nomen: true */
/*jslint plusplus: true */

sap.ui.define([],
    function () {
        'use strict';

        var CalendarRenderer = {};
        CalendarRenderer.render = function (oRm, oCal) {
            var sId = oCal.getId(),
                oDate = oCal.getCurrentDate();
            oCal._iMode = 0; // it's rendered always as DayPicker
            oRm.write("<div");
            oRm.writeControlData(oCal);
            // Adding CSS classes to Calendar
			oRm.addClass("nrgCal");
			oRm.writeClasses();

            // Adding CSS styles to Calendar
            if (oCal.getWidth() && oCal.getWidth() !== '') {
                oRm.addStyle("width", oCal.getWidth());
            }
            if (oCal.getHeight() && oCal.getHeight() !== '') {
                oRm.addStyle("height", oCal.getHeight());
            }
            oRm.writeStyles();
            // This makes the calendar focusable and therefore
		    // the white empty areas can be clicked without closing the calendar
		    // by accident.
		    oRm.writeAttribute("tabindex", "-1");
            oRm.write(">");
            //Rendering Header and Days separately
            this.renderHeader(oRm, oCal, oDate);
            this.renderDayPicker(oRm, oCal, oDate);
            oRm.write("<div id=\"" + sId + "-dayPic\" class=\"nrgCal-dayPic\">");
            this.renderDays(oRm, oCal, oDate);
            oRm.write("</div>");
			oRm.write("</div>");

        };
        CalendarRenderer.renderHeader = function (oRm, oCal, oDate) {

            var oLocaleData = oCal.getLocaleData(),
                sId = oCal.getId(),
                iMonth = oDate.getUTCMonth(),
                iYear = oDate.getUTCFullYear(),
                aMonthNames = [];
            if (oCal._bLongMonth || !oCal._bNamesLengthChecked) {
                aMonthNames = oLocaleData.getMonthsStandAlone("wide");
            } else {
                aMonthNames = oLocaleData.getMonthsStandAlone("abbreviated");
            }
            oRm.write("<div");
            oRm.addClass("nrgCal-hd");
            oRm.writeClasses();
            oRm.write(">"); // div element
            oRm.write("<button id=\"" + sId + "-prev\" class=\"nrgCal-hd-btnPrev\" tabindex=\"-1\">");
            oRm.write("<span id=\"" + sId + "-prev\" class=\"UiIcon UiIcon-left\" >");
            oRm.write("</button>");
            oRm.write("<button");
            oRm.writeAttributeEscaped('id', sId + '-month');
            oRm.addClass("nrgCal-hd-btnMonth");
            oRm.writeAttribute('tabindex', "-1");
            oRm.writeClasses();
            oRm.write(">"); // button element
            oRm.write(aMonthNames[iMonth]);
            oRm.write("</button>");
            oRm.write("<button");
            oRm.writeAttributeEscaped('id', sId + '-year');
            oRm.addClass("nrgCal-hd-btnYear");
            oRm.writeAttribute('tabindex', "-1");
            oRm.writeClasses();
            oRm.write(">"); // button element
            oRm.write(iYear);
            oRm.write("</button>");
            oRm.write("<button id=\"" + sId + "-next\" class=\"nrgCal-hd-btnNext\" tabindex=\"-1\">");
            oRm.write("<span id=\"" + sId + "-prev\" class=\"UiIcon UiIcon-right\" >");
            oRm.write("</button>");
            oRm.write("</div>");

        };
        CalendarRenderer.renderDayPicker = function (oRm, oCal, oDate) {

            var oLocaleData = oCal.getLocaleData(),
                iFirstDayOfWeek = oLocaleData.getFirstDayOfWeek(),
                sId = oCal.getId(),
                aWeekDays = [],
                i;
            if (oCal._bLongWeekDays || !oCal._bNamesLengthChecked) {
                aWeekDays = oLocaleData.getDaysStandAlone("abbreviated");
            } else {
                aWeekDays = oLocaleData.getDaysStandAlone("narrow");
            }
            oRm.write("<div");
            oRm.addClass("nrgCal-dayPic-week");
            oRm.writeClasses();
            oRm.write(">"); // div element
            for (i = 0; i < 7; i++) {
                oRm.write("<div");
                oRm.addClass("nrgCal-dayPic-weekHead");
                oRm.writeClasses();
                oRm.write(">"); // div element
                oRm.write(aWeekDays[(i + iFirstDayOfWeek) % 7]);
                oRm.write("</div>");
            }
            oRm.write("</div>");
            // days
        };
        CalendarRenderer.renderDays = function (oRm, oCal, oDate) {
            if (!oDate) {
			    oDate = oCal.getCurrentDate();
		    }
            var oLocaleData = oCal.getLocaleData(),
                sId = oCal.getId(),
                iMonth = oDate.getUTCMonth(),
                iYear = oDate.getUTCFullYear(),
                sLocale = oCal.getLocale(),
                iFirstDayOfWeek = oLocaleData.getFirstDayOfWeek(),
                iWeekendStart = oLocaleData.getWeekendStart(),
                iWeekendEnd = oLocaleData.getWeekendEnd(),
                oFirstDay = new Date(oDate.getTime()),
                iWeekDay,
                iDaysOldMonth,
                oDay,
                sYyyymmdd = "",
                iNextMonth = (iMonth + 1) % 12,
                sIdConcat = "";
            oFirstDay.setUTCDate(1);
            iWeekDay = oFirstDay.getUTCDay();
            iDaysOldMonth = iWeekDay - iFirstDayOfWeek;
            if (iDaysOldMonth < 0) {
                iDaysOldMonth = 7 + iDaysOldMonth;
            }
            if (iDaysOldMonth > 0) {
                // determine first day for display
                oFirstDay.setUTCDate(1 - iDaysOldMonth);
            }
            oDay = new Date(oFirstDay.getTime());
            do {
                sYyyymmdd = oCal._oFormatYyyymmdd.format(oDay, true);
                iWeekDay = oDay.getUTCDay();
                oRm.write("<div");
                oRm.writeAttribute("id", sId + "-" + sYyyymmdd);
                oRm.addClass("nrgCal-dayPic-day");
                if (iMonth !== oDay.getUTCMonth()) {
                    oRm.addClass("nrgCal-dayPic-dayOtherMonth");
                }
                if ((iWeekDay >= iWeekendStart && iWeekDay <= iWeekendEnd) ||
                        (iWeekendEnd < iWeekendStart && (iWeekDay >= iWeekendStart || iWeekDay <= iWeekendEnd))) {
                    oRm.addClass("nrgCal-dayPic-dayWeekend");
                }
                oRm.writeAttribute("tabindex", "-1");
                oRm.writeClasses();
                oRm.write(">"); // div element
                oRm.write(oDay.getUTCDate());
                oRm.write("</div>");
                oDay.setUTCDate(oDay.getUTCDate() + 1);

            } while (oDay.getUTCMonth() !== iNextMonth || oDay.getUTCDay() !== iFirstDayOfWeek);
        };
        return CalendarRenderer;

    }, true);
