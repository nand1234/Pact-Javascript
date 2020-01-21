const pact = require("@pact-foundation/pact-node")
const path = require("path")
const opts = {
  pactFilesOrDirs: [
    path.resolve(
      __dirname,
      "../pacts/pmp-voucher-auth-vm6-86.json"
    ),
  ],
  pactBroker: "http://10.10.0.234:32584/",
  //pactBrokerUsername: "dXfltyFMgNOFZAxr8io9wJ37iUpY42M",
  //pactBrokerPassword: "O5AIZWxelWbLvqMd8PkAVycBJh2Psyg1",
  tags: ["prod", "test"],
  consumerVersion:
    "1.0." +
    (process.env.TRAVIS_BUILD_NUMBER
      ? process.env.TRAVIS_BUILD_NUMBER
      : Math.floor(new Date() / 1000)),
}

pact
  .publishPacts(opts)
  .then(() => {
    console.log("Pact contract publishing complete!")
    console.log(opts)
  })
  .catch(e => {
    console.log("Pact contract publishing failed: ", e)
  })