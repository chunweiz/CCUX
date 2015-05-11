/*globals sap */
/*jslint nomen: true */
// Provides control ute.ui.commons.Calendar.
sap.ui.define(['jquery.sap.global', './library', 'sap/ui/core/Control', 'sap/ui/core/LocaleData', 'sap/ui/core/format/DateFormat'],
	function (jQuery, library, Control, LocaleData, DateFormat) {
	    'use strict';

        var Calendar = Control.extend('ute.ui.commons.Calendar', /** @lends sap.ui.commons.Button.prototype */ { metadata : {
            library : 'ute.ui.commons',
            properties : {
                /*Calendar text*/
                text : {type : 'string', group : 'Appearance', defaultValue : ''},

                /*Calendar Width*/
                width : {type : 'sap.ui.core.CSSSize', group : 'Dimension', defaultValue : '340px'},

                /*Calendar height*/
                height : {type : 'sap.ui.core.CSSSize', group : 'Dimension', defaultValue : '220px'}
            },
            events : {

            }
        }});
	    (function () {
            /*
             * Initializes values
             *
             */
            Calendar.prototype.init = function () {
                this._oFormatYyyymmdd = DateFormat.getInstance({pattern: 'MMddyyyy'});
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
            Calendar.prototype._getFocusedDate = function () {

                if (!this._oFocusedDate) {
                    var that = this;
                    this.getCurrentDate();
                }

                return this._oFocusedDate;

            };

            Calendar.prototype._setFocusedDate = function (oDate) {

                this._oFocusedDate = new Date(oDate);

            };
            /*
             * Renders months.
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

            /*
             * onClick Functionality
             *
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
                    switch (this._iMode) {
                    case 0: // day picker
                        oFocusedDate.setUTCMonth(oFocusedDate.getUTCMonth() + 1, 1);
                        _renderMonth(that);
                        break;
                    }
                } else if (jQuery.sap.containsOrEquals(this.getDomRef('prev'), oEvent.target) && !this.$('prev').attr('disabled')) {
                    switch (this._iMode) {
                    case 0: // day picker
                        oFocusedDate.setUTCDate(1);
                        oFocusedDate.setUTCDate(oFocusedDate.getUTCDate() - 1);
                        _renderMonth(that);
                        break;
                    }
                } else {
                    $Target = jQuery(oEvent.target);
                    if ($Target.hasClass('uteCal-dayPic-day')) {
                        oFocusedDate = this._getFocusedDate();
                        oOldFocusedDate = oFocusedDate;
                        oFocusedDate = this._oFormatYyyymmdd.parse($Target.attr('data-nrg-day'), true);
                        this._setFocusedDate(oFocusedDate);
                        if (oFocusedDate.getTime() !== oOldFocusedDate.getTime()) {
                            that = this;
                            if ($Target.hasClass('uteCal-dayPic-dayOtherMonth')) {
                                // in other month -> change month
                                _renderMonth(that);
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


        }());
        return Calendar;

    }, /* bExport= */ true);
