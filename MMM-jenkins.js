'use strict';

Module.register("MMM-jenkins", {

    result: {},
    defaults: {
        title: 'Jenkins queue',
        url: '',
        updateInterval: 300000
    },

    start: function() {
        this.getStats();
        this.scheduleUpdate();
    },

    isEmpty: function(obj) {
        for(var key in obj) {
            if(obj.hasOwnProperty(key)) {
                return false;
            }
        }

        return true;
    },

    getDom: function() {
        var wrapper = document.createElement("ticker");
        wrapper.className = 'dimmed small';

        var data = this.result;
        var statElement =  document.createElement("header");
        var title = this.config.title;
        statElement.innerHTML = title;
        wrapper.appendChild(statElement);

        if (data && !this.isEmpty(data)) {
            var tableElement = document.createElement("table");

            for (var key in data) {
                if (data.hasOwnProperty(key)) {
                    tableElement.appendChild(this.addValue(key, data[key]));
                }
            }

            wrapper.appendChild(tableElement);

        } else {
            var error = document.createElement("span");
            error.innerHTML = "Error fetching stats.";
            wrapper.appendChild(error);
        }

        return wrapper;
    },

    addValue: function(name, value) {
        var row = document.createElement("tr");
        row.innerHTML = name + ": " + JSON.stringify(value);
        return row;
    },

    scheduleUpdate: function(delay) {
        var nextLoad = this.config.updateInterval;
        if (typeof delay !== "undefined" && delay >= 0) {
            nextLoad = delay;
        }

        var self = this;
        setInterval(function() {
            self.getStats();
        }, nextLoad);
    },

    getStats: function () {
        this.sendSocketNotification('GET_STATS', this.config.url);
    },

    socketNotificationReceived: function(notification, payload) {
        if (notification === "STATS_RESULT") {
            this.result = payload;
            var fade = 500;
            console.log("fade: " + fade);
            this.updateDom(fade);
        }
    },

});
