var _ = require('lodash');
var async = require('async');
var joi = require('joi');

var database = require('../api/database');

var my =
{
  SCHEMA_GET_FIELD_FOR_SECURITY: joi.object().keys(
    {//{{{
      id135: joi.string().required(),
      field: joi.string().required()
    }//}}}
  ),

  fieldForSecurity: function (request, reply)
  {//{{{
    var id135 = request.query.id135;
    var field = request.query.field;

    database.callCalcrt(id135, [ field ], function (error, values)
    {
      if (error)
      {
        return reply(error);
      }

      reply({ id135: id135, field: field, value: values[field] });
    });
  }//}}}
};

var exports =
{
  setupPrivateRoutes: function (server)
  {//{{{
  },//}}}

  setupPublicRoutes: function (server)
  {//{{{
    server.route(
      {
        method: 'GET',
        path: '/securities/{id135}/fields/{field}',
        handler: my.fieldForSecurity,
        config: { validate: { params: my.SCHEMA_GET_FIELD_FOR_SECURITY } }
      }
    );
  }//}}}
};

module.exports = exports;
