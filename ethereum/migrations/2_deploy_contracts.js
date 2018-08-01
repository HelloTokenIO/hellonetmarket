
var ListingsRegistry = artifacts.require("ListingsRegistry")
var Listing = artifacts.require("Listing")
var JobApplicant = artifacts.require("JobApplicant")
var JobApplicantLibrary = artifacts.require("JobApplicationLibrary")

module.exports = function(deployer, network) {
  return deployer.then(() => {
    return deployContracts(deployer)
  })
}

async function deployContracts(deployer) {
  await deployer.deploy(JobApplicantLibrary);
  await deployer.link(JobApplicantLibrary, ListingsRegistry);
  await deployer.link(JobApplicantLibrary, Listing);

  await deployer.deploy(ListingsRegistry);
 
}
