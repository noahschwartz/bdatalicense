var _ = require('lodash');
var async = require('async');
var joi = require('joi');

var my =
{
  SCHEMA_GET_FIELD_FOR_SECURITY: joi.object().keys(
    {//{{{
      id135: joi.string().required(),
      fieldName: joi.string().required()
    }//}}}
  ),

  fieldForSecurity: function (request, reply)
  {//{{{
    reply(200);
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
        path: '/security/{id135}/field/{fieldName}',
        handler: my.fieldForSecurity,
        config: { validate: { params: my.SCHEMA_GET_FIELD_FOR_SECURITY } }
      }
    );
  }//}}}
};

module.exports = exports;
