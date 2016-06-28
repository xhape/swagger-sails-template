var swaggerTools  = require('swagger-tools');
var jsyaml = require('js-yaml');
var fs = require('fs');

// swaggerRouter configuration
var options = {
  swaggerUi: './api/swagger/swagger.json',
  controllers: './api/controllers',
  useStubs: process.env.NODE_ENV === 'development' // Conditionally turn on stubs (mock mode)
};

var swaggerUiOptions = {
  apiDocs: 'api-docs',
  swaggerUi: '/docs'
};

// The Swagger document (require it, build it programmatically, fetch it from a URL, ...)
var spec = fs.readFileSync('./api/swagger/swagger.yaml', 'utf8');
var swaggerDoc = jsyaml.safeLoad(spec);

module.exports = {
  init: function(app){
    // Initialize the Swagger middleware
    swaggerTools.initializeMiddleware(swaggerDoc, function (middleware) {
      // Interpret Swagger resources and attach metadata to request - must be first in swagger-tools middleware chain
      app.use(middleware.swaggerMetadata());

      // Route validated requests to appropriate controller
      app.use(middleware.swaggerRouter(options));

      // Serve the Swagger documents and Swagger UI
      app.use(middleware.swaggerUi(swaggerUiOptions));

      // Validate Swagger requests
      app.use(middleware.swaggerValidator());
    });
  }
};
