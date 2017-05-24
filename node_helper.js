var NodeHelper = require('node_helper');
var request = require('request');

module.exports = NodeHelper.create({
  start: function () {
    console.log('mmm-jenkins helper started...');
  },

  getStats: function (url) {
      var self = this;

      request({ url: url + '/queue/api/json', method: 'GET' }, function (error, response, body) {
          if (!error && response.statusCode == 200) {
            var result = JSON.parse(body);
            var response = { "Queue Length" : result.items.length }
            self.sendSocketNotification('STATS_RESULT', response);
          }
      });
  },

  //Subclass socketNotificationReceived received.
  socketNotificationReceived: function(notification, payload) {
    if (notification === 'GET_STATS') {
      this.getStats(payload);
    }
  }

});
