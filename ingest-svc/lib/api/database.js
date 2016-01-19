var _ = require('lodash');
var async = require('async');
var bunyan = require('bunyan');
var hapi = require('hapi');

var PUMP_INTERVAL = 1 * 1000;
var FIELDS_TO_PUMP = [ ];

var my =
{
  pumpToKafka: function (logger)
  {
    async.waterfall(
      [
        function (waterfallCallback)
        {
          my.securityUniverse(waterfallCallback);
        },

        function (securityUniverse, waterfallCallback)
        {
          // for each security go to calcrt for whatever fields we need
          
          waterfallCallback(null, null);
        },

        function (securitiesAndValues, waterfallCallback)
        {
          // send the result to kafka
        
          waterfallCallback(null);
        }
      ],

      function (error)
      {
        if (error)
        {
          logger.error(error);
        }
      }
    );
  },

  securityUniverse: function (callback)
  {
    callback(null, []);
  }
};

var exports =
{
  callCalcrt: function (id135, fields, callback)
  {
    return callback(new Error("callCalcrt not implemented"));
  },

  startPumping: function (logger)
  {
    setInterval(my.pumpToKafka, PUMP_INTERVAL, logger);
  }
};

module.exports = exports;
