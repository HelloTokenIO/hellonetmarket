const routes = require('next-routes')();

routes
    .add('/listings/index', '/listings/index')
    .add('/listings/index/:pageNumber', '/listings/index')
    .add('/listings/new', '/listings/new')
    .add('/listings/:c', '/listings/details')
    .add('/listings/jobapplicants/:a', '/listings/jobapplicants/details')

    .add('/company/dashboard/:c', '/company/dashboard')

    .add('/agent/dashboard/:c', '/agent/dashboard')

    .add('/auditor/dashboard/:c', '/auditor/dashboard')
    ;
module.exports = routes;

