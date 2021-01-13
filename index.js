var module = (function() {
    var _name = "calendar";

    return {
        add_event: function(date, event) {
            var id = random(8).join("");
        
            controller.catalog().submit("collection", _name, id, Object.assign(event, { "id":id, "date":date }));
            controller.catalog().categorize("collection", _name, id, [ date.substring(0, 6) ]);
        },

        update_event: function(id, date, event) {
            var value = controller.catalog().value("collection", _name, id);
        
            if (value["date"] !== date) {
                controller.catalog().categorize("collection", _name, id, [ date.substring(0, 6) ], [ value["date"].substring(0, 6) ]);
            }
        
            controller.catalog().submit("collection", _name, id, Object.assign(event, { "id":id, "date":date }));
        },

        remove_event: function(id) {
            controller.catalog().remove("collection", _name, id);
        },

        reset_events: function(id) {
            controller.catalog().remove("collection", _name);
        },

        get_events: function(year, month) {
            var category = year.toString() + ((month < 10) ? "0" : "") + month.toString();
            var count = controller.catalog().count("collection", _name, category);
            var values = controller.catalog().values("collection", _name, category, null, [ 0, count ]);
            var events = {};
        
            values.forEach(function(value) {
                if (!(value["date"] in events)) {
                    events[value["date"]] = [];
                }
                events[value["date"]].push(value);
            });
        
            return events;
        },

        set_detail: function(id, detail) {
            controller.catalog().submit("collection", _name + ".detail", id + ".DETAIL", Object.assign(detail, { "id":id + ".DETAIL" }));
        },

        get_detail: function(id) {
            return controller.catalog().value("collection", _name + ".detail", id + ".DETAIL");
        },

        set_calendar_name: function(name) {
            _name = name;
        },
    }
})();

__MODULE__ = module;
