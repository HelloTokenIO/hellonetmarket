const routes = require('next-routes')();

routes
    .add('/listings/new', '/listings/new')
    .add('/listings/:c', '/listings/show');
module.exports = routes;

