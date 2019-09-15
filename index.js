CalendarRecords = (function() {
    return {
        "name":"calendar"
    };
})();

CalendarRecords.helper = include("./helper.js");

CalendarRecords.add_event = function(date, event) {
    var id = random(8).join("");

    controller.catalog().submit("collection", this.name, id, Object.assign(event, { "id":id, "date":date }));
    controller.catalog().categorize("collection", this.name, id, [ date.substring(0, 6) ]);
}

CalendarRecords.update_event = function(id, date, event) {
    var value = controller.catalog().value("collection", this.name, id);

    if (value["date"] !== date) {
        controller.catalog().categorize("collection", this.name, id, [ date.substring(0, 6) ], [ value["date"].substring(0, 6) ]);
    }

    controller.catalog().submit("collection", this.name, id, Object.assign(event, { "id":id, "date":date }));
}

CalendarRecords.remove_event = function(id) {
    controller.catalog().remove("collection", this.name, id);
}

CalendarRecords.reset_events = function(id) {
    controller.catalog().remove("collection", this.name);
}

CalendarRecords.get_events = function(year, month) {
    var category = year.toString() + ((month < 10) ? "0" : "") + month.toString();
    var count = controller.catalog().count("collection", this.name, category);
    var values = controller.catalog().values("collection", this.name, category, null, [ 0, count ]);
    var events = {};

    values.forEach(function(value) {
        if (!(value["date"] in events)) {
            events[value["date"]] = [];
        }
        events[value["date"]].push(value);
    });

    return events;
}

CalendarRecords.set_detail = function(id, detail) {
    controller.catalog().submit("collection", this.name + ".detail", id + ".DETAIL", Object.assign(detail, { "id":id + ".DETAIL" }));
}

CalendarRecords.get_detail = function(id) {
    return controller.catalog().value("collection", this.name + ".detail", id + ".DETAIL");
}

CalendarRecords.set_calendar_name = function(name) {
    this.name = name;
}

__MODULE__ = CalendarRecords;
