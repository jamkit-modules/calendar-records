CalendarHelper = (function() {
    return {};
})();

CalendarHelper.format_date = function(date, format) {
    return format.replace(/(yyyy|yy|MM|dd|hh|mm|ss)/gi, function($1) {
        switch ($1) {
            case "yyyy": return date.getFullYear();
            case "yy": return CalendarHelper.__zf(date.getFullYear() % 1000, 2);
            case "MM": return CalendarHelper.__zf(date.getMonth() + 1, 2);
            case "dd": return CalendarHelper.__zf(date.getDate(), 2);
            case "HH": return CalendarHelper.__zf(date.getHours(), 2);
            case "hh": return CalendarHelper.__zf((h = date.getHours() % 12) ? h : 12, 2);
            case "mm": return CalendarHelper.__zf(date.getMinutes(), 2);
            case "ss": return CalendarHelper.__zf(date.getSeconds(), 2);
            default: return $1;
        }
    });
}

CalendarHelper.__zf = function(number, length) {
    return "0".repeat(length - number.toString().length) + number.toString();
}

__MODULE__ = CalendarHelper;
