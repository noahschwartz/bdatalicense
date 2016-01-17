var _ = require('lodash');
var async = require('async');
var bunyan = require('bunyan');
var hapi = require('hapi');

var config = require('./etc/config');
var loggerPublic = bunyan.createLogger({ name: "bdatalicense-public", level: "info", src: true });
var loggerPrivate = bunyan.createLogger({ name: "bdatalicense-private", level: "info", src: true });

async.waterfall(
  [
    function createPublicServer (waterfallCallback)
    {
      var server = new hapi.Server();
      server.connection({ port: config.server.publicPort });

      require('./lib/routes/security').setupPublicRoutes(server);
      require('./lib/routes/ping').setupPublicRoutes(server);

      var hapiLoggerConfig = 
      {
        register: require('hapi-bunyan'),
        options: { logger: loggerPublic }
      };

      server.ext('onPreHandler', function (request, reply)
      {
        request.log.info({ id: request.id }, '%s %s started', request.method.toUpperCase(), request.path);

        reply.continue();
      });

      server.ext('onPostHandler', function (request, reply)
      {
        request.log.info({ id: request.id, tookMs: new Date() - request.info.received }, '%s %s finished', request.method.toUpperCase(), request.path);

        reply.continue();
      });

      server.register(hapiLoggerConfig, function (error)
      {
        waterfallCallback(error, server);
      });
    },

    function startPublicServer (server, waterfallCallback)
    {
      server.start(function (error)
      {
        if (error)
        {
          return waterfallCallback(error);
        }

        loggerPublic.info('Public server running %s', server.info.uri);
        waterfallCallback(null);
      });
    },

    function createPrivateServer (waterfallCallback)
    {
      var server = new hapi.Server();
      server.connection({ port: config.server.privatePort });

      require('./lib/routes/security').setupPrivateRoutes(server);

      var hapiLoggerConfig = 
      {
        register: require('hapi-bunyan'),
        options: { logger: loggerPrivate }
      };

      server.ext('onPreHandler', function (request, reply)
      {
        request.log.info({ id: request.id }, '%s %s started', request.method.toUpperCase(), request.path);

        reply.continue();
      });

      server.ext('onPostHandler', function (request, reply)
      {
        request.log.info({ id: request.id, tookMs: new Date() - request.info.received }, '%s %s finished', request.method.toUpperCase(), request.path);

        reply.continue();
      });

      server.register(hapiLoggerConfig, function (error)
      {
        waterfallCallback(error, server);
      });
    },

    function startPrivateServer (server, waterfallCallback)
    {
      server.start(function (error)
      {
        if (error)
        {
          return waterfallCallback(error);
        }

        loggerPrivate.info('Private server running %s', server.info.uri);
        waterfallCallback(null);
      });
    }
  ],

  function (error)
  {
    if (error)
    {
      loggerPublic.error(error);
      process.exit(-1);
    }
  }
);
