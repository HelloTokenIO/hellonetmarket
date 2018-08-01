const routes = require('next-routes')();

routes
    .add('/listings/new', '/listings/new')
    .add('/listings/:c', '/listings/details')
    .add('/listings/jobapplicants/:a', '/listings/jobapplicants/details')
    ;
module.exports = routes;

