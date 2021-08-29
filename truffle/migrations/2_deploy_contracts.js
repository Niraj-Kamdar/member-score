let MemberScore = artifacts.require("MemberScore");

module.exports = async function (deployer) {
    // deployment steps
    await deployer.deploy(MemberScore);
};
