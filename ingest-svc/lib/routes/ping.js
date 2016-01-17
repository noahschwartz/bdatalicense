var exports =
{
  setupPublicRoutes: function (server)
  {//{{{
    server.route(
      {
        method: 'GET',
        path: '/_ping',
        handler: function (request, reply)
        {
          return reply();
        }
      }
    );
  }//}}}
};

module.exports = exports;
