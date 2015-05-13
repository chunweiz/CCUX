/*globals sap, sc */
/*jslint nomen: true */
// Provides control ute.ui.commons.Calendar.
sap.ui.define(['jquery.sap.global', './library', 'sap/ui/core/Control', 'sap/ui/core/LocaleData', 'sap/ui/core/format/DateFormat'],
	function (jQuery, library, Control, LocaleData, DateFormat) {
	    'use strict';

        var Calendar = Control.extend('sc.control.lib.ui.Calendar', /** @lends sap.ui.commons.Button.prototype */ { metadata : {
            library : 'sc.control.lib.ui',
            properties : {
                /*Calendar Width*/
                width : {type : 'sap.ui.core.CSSSize', group : 'Dimension', defaultValue : '340px'},

                /*Calendar height*/
                height : {type : 'sap.ui.core.CSSSize', group : 'Dimension', defaultValue : '250px'},

                /*Calendar selected Date*/
                selectedDate : {type : "string", defaultValue : ''}
            },
            events : {

            }
        }});
	    (function () {
            /*
             * Initializes Calendar Values
             * 1) Assuming Default Date format is MM/dd/yyyy for NRG.
             *
             */
            Calendar.prototype.init = function () {
                this._oFormatYyyymmdd = DateFormat.getInstance({pattern: 'MM/dd/yyyy'});
            };

            /*
             * gets localeData for used locale
             * if no locale is given use rendered one
             */
            Calendar.prototype.getLocaleData = function () {

                var sLocale, oLocale;
                if (!this._oLocaleData) {
                    sLocale = this.getLocale();
                    oLocale = new sap.ui.core.Locale(sLocale);
                    this._oLocaleData = LocaleData.getInstance(oLocale);
                }

                return this._oLocaleData;

            };
            /**
             * Creates a Date in UTC timezone from local timezone
             * @param {Date} oDate in local timezone
             * @return {Date} in UTC timezone
             * @private
             */
            function _createUTCDate(oDate) {
                if (oDate) {
                    var oUTCDate = new Date(Date.UTC(oDate.getFullYear(), oDate.getMonth(), oDate.getDate()));
                    if (oDate.getFullYear() < 1000) {
                        oUTCDate.setUTCFullYear(oDate.getFullYear());
                    }
                    return oUTCDate;
                }

            }
            /*
             * Creates Current Date
             *
             */
            Calendar.prototype.getCurrentDate = function () {
                this._oFocusedDate = _createUTCDate(new Date());
                return _createUTCDate(this._oFocusedDate);
            };
            /*
             * The following method will gives current focussed date for the session.
             *
             */
            Calendar.prototype._getFocusedDate = function () {

                if (!this._oFocusedDate) {
                    var that = this;
                    this.getCurrentDate();
                }

                return this._oFocusedDate;

            };
            /*
             * The following method is to set focus the date for the session.
             *
             */
            Calendar.prototype._setFocusedDate = function (oDate) {

                this._oFocusedDate = new Date(oDate);

            };
            /*
             * _renderMonth will render the previous and next months when the user selected to toggle.
             *
             */
            function _renderMonth(oThis) {

                oThis._sRenderMonth = undefined; // initialize delayed call

                var oDate = oThis._getFocusedDate(),
                    $Container = oThis.$('dayPic'),
                    oRm,
                    aMonthNames = [];

                if ($Container.length > 0) {
                    oRm = sap.ui.getCore().createRenderManager();
                    oThis.getRenderer().renderDays(oRm, oThis, oDate);
                    oRm.flush($Container[0]);
                    oRm.destroy();
                }

                // change month and year
                if (oThis._bLongMonth || !oThis._bNamesLengthChecked) {
                    aMonthNames = oThis.getLocaleData().getMonthsStandAlone('wide');
                } else {
                    aMonthNames = oThis.getLocaleData().getMonthsStandAlone('abbreviated');
                }
                oThis.$('month').text(aMonthNames[oDate.getUTCMonth()]);
                oThis.$('year').text(oDate.getUTCFullYear());

            }
            function _selectDay(oThis, oDate) {

                var aSelectedDates = oThis.getSelectedDate(),
                    aDomRefs = oThis.$("dayPic").children(".uteCal-dayPic-day"),
                    $DomRef,
                    sYyyymmdd,
                    i = 0,
                    temp;
                // single day selection or start a new interval
                sYyyymmdd = oThis._oFormatYyyymmdd.format(oDate, true);
                for (i = 0; i < aDomRefs.length; i = i + 1) {
                    $DomRef = jQuery(aDomRefs[i]);
                    temp = $DomRef.attr("data-nrg-day");
                    if (!$DomRef.hasClass("uteCal-dayPic-dayOtherMonth") && $DomRef.attr("data-nrg-day") === sYyyymmdd) {
                        $DomRef.addClass("uteCal-dayPic-daySelected");
                    } else if ($DomRef.hasClass("uteCal-dayPic-daySelected")) {
                        $DomRef.removeClass("uteCal-dayPic-daySelected");
                    }
                }
                oThis.setProperty("selectedDate", sYyyymmdd, true);
            }
            /*  onClick event will have three functionality.
             *  1) when user is toggling between months.
             *  2) when user selected previous month and next month date so that function will render respective month.
             *  3) User selected a particular date in the calendar, which will populate in to textfield.
             */
            Calendar.prototype.onclick = function (oEvent) {

                if (oEvent.isMarked('delayedMouseEvent')) {
                    return;
                }
                var that = this,
                    oFocusedDate = this._getFocusedDate(),
                    $Target,
                    oOldFocusedDate;

                if (jQuery.sap.containsOrEquals(this.getDomRef('next'), oEvent.target) && !this.$('next').attr('disabled')) {
                    oFocusedDate.setUTCMonth(oFocusedDate.getUTCMonth() + 1, 1);
                    _renderMonth(that);
                } else if (jQuery.sap.containsOrEquals(this.getDomRef('prev'), oEvent.target) && !this.$('prev').attr('disabled')) {
                    oFocusedDate.setUTCDate(1);
                    oFocusedDate.setUTCDate(oFocusedDate.getUTCDate() - 1);
                    _renderMonth(that);
                } else {
                    $Target = jQuery(oEvent.target);
                    if ($Target.hasClass('uteCal-dayPic-day')) {
                        oFocusedDate = this._getFocusedDate();
                        oOldFocusedDate = oFocusedDate;
                        oFocusedDate = this._oFormatYyyymmdd.parse($Target.attr('data-nrg-day'), false);
                        this._setFocusedDate(oFocusedDate);
                        if (oFocusedDate.getTime() !== oOldFocusedDate.getTime()) {
                            if ($Target.hasClass('uteCal-dayPic-dayOtherMonth')) {
                                // in other month -> change month
                                _renderMonth(that);
                                oEvent.stopPropagation();
					            oEvent.preventDefault();
                            } else {

                                _selectDay(that, that._getFocusedDate());
                                this.fireEvent("select");
                                //to prevent bubbling into input field if in DatePicker
					            oEvent.stopPropagation();
					            oEvent.preventDefault();
                            }
                        }
                    }

                }

            };
           /**
             * gets the used locale for the DatePicker
             * only for internal use
             * @return {string} sLocale
             * @private
             */
            Calendar.prototype.getLocale = function () {

                if (!this._sLocale) {
                    this._sLocale = sap.ui.getCore().getConfiguration().getFormatSettings().getFormatLocale().toString();
                }

                return this._sLocale;
            };
            /*
             * Checks if a date is selected and what kind of selected
             * @return {int} iSelected 0: not selected; 1: single day selected
             * @private
             */
            Calendar.prototype._checkDateSelected = function (oDate) {

                if (!(oDate instanceof Date)) {
                    throw new Error("Date must be a JavaScript date object; " + this);
                }
                var iSelected = 0,
                    aSelectedDate = this.getSelectedDate(),
                    oDateTimeStamp = oDate.getTime(),
                    oTmpDateTimeStamp,
                    oTmpDate;
                aSelectedDate = this._oFormatYyyymmdd.parse(aSelectedDate, false);
                oTmpDate = _createUTCDate(aSelectedDate);
                if (oTmpDate) {
                    oTmpDateTimeStamp = oTmpDate.getTime();
                }
                if (oTmpDateTimeStamp === oDateTimeStamp) {
                    iSelected = 1; // single day selected
                }
                return iSelected;
            };

        }());
        return Calendar;

    }, /* bExport= */ true);
