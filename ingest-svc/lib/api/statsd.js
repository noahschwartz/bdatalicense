var StatsD = require('node-statsd');

var config = require('../../etc/config.json');

var my =
{
  statsdClient: new StatsD({ host: config.statsd.host, port: config.statsd.port, prefix: 'ingest-svc.' })
};

var exports =
{
  decrement: function ()
  {
    my.statsdClient.decrement.apply(my.statsdClient, arguments);
  },

  gauge: function ()
  {
    my.statsdClient.gauge.apply(my.statsdClient, arguments);
  },

  histogram: function ()
  {
    my.statsdClient.histogram.apply(my.statsdClient, arguments);
  },

  increment: function ()
  {
    my.statsdClient.increment.apply(my.statsdClient, arguments);
  },

  set: function ()
  {
    my.statsdClient.set.apply(my.statsdClient, arguments);
  },

  timing: function ()
  {
    my.statsdClient.timing.apply(my.statsdClient, arguments);
  },

  unique: function ()
  {
    my.statsdClient.unique.apply(my.statsdClient, arguments);
  }
};

module.exports = exports;
