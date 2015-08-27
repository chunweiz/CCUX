/*global sap*/

sap.ui.define(
    [
        'sap/ui/core/Element',

        'sap/ui/thirdparty/d3'
    ],

    function (Element) {
        'use strict';

        var CustomElement = Element.extend('ute.ui.viz.HighBillUsageData', {
            metadata: {
                library: 'ute.ui.viz'
            }
        });

        CustomElement.prototype.getData = function () {
            var parseDate = d3.time.format('%d-%b-%y').parse;

            var data = [
    			{ date: parseDate('30-Apr-12'), close: 53.98 },
    			{ date: parseDate('27-Apr-12'), close: 67.00 },
    			{ date: parseDate('26-Apr-12'), close: 89.70 },
    			{ date: parseDate('25-Apr-12'), close: 99.00 },
    			{ date: parseDate('24-Apr-12'), close: 130.28 },
    			{ date: parseDate('23-Apr-12'), close: 166.70 },
    			{ date: parseDate('20-Apr-12'), close: 234.98 },
    			{ date: parseDate('19-Apr-12'), close: 345.44 },
    			{ date: parseDate('18-Apr-12'), close: 443.34 },
    			{ date: parseDate('17-Apr-12'), close: 543.70 },
    			{ date: parseDate('16-Apr-12'), close: 580.13 },
    			{ date: parseDate('13-Apr-12'), close: 605.23 },
    			{ date: parseDate('12-Apr-12'), close: 622.77 },
    			{ date: parseDate('11-Apr-12'), close: 626.20 },
    			{ date: parseDate('10-Apr-12'), close: 628.44 },
    			{ date: parseDate('9-Apr-12'), close: 636.23 },
    			{ date: parseDate('5-Apr-12'), close: 633.68 },
    			{ date: parseDate('4-Apr-12'), close: 624.31 },
    			{ date: parseDate('3-Apr-12'), close: 629.32 },
    			{ date: parseDate('2-Apr-12'), close: 618.63 },
    			{ date: parseDate('30-Mar-12'), close: 599.55 },
    			{ date: parseDate('29-Mar-12'), close: 609.86 },
    			{ date: parseDate('28-Mar-12'), close: 617.62 },
    			{ date: parseDate('27-Mar-12'), close: 614.48 },
    			{ date: parseDate('26-Mar-12'), close: 606.98 }
    		];

            return data;
        };

        return CustomElement;
    },

    true
);
