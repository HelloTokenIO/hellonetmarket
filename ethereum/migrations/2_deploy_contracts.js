
var ListingsRegistry = artifacts.require("ListingsRegistry")
var Listing = artifacts.require("Listing")
var JobApplicant = artifacts.require("JobApplicant")
var JobApplicantLibrary = artifacts.require("JobApplicationLibrary")
var AuditCriteriaManager = artifacts.require("AuditCriteriaManager")
var Company = artifacts.require("Company")
var MasterAuditCondition = artifacts.require("MasterAuditCondition");


module.exports = function(deployer, network) {
  return deployer.then(() => {
    return deployContracts(deployer)
  })
}

async function deployContracts(deployer) {
  await deployer.deploy(JobApplicantLibrary);
  await deployer.link(JobApplicantLibrary, ListingsRegistry);
  await deployer.link(JobApplicantLibrary, Listing);
  await deployer.deploy(Company);
  await deployer.deploy(ListingsRegistry);
  await deployer.deploy(AuditCriteriaManager);
  await deployer.deploy(MasterAuditCondition);
}
