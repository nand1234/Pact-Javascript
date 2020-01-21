const { Verifier } = require("@pact-foundation/pact")
const chai = require("chai")
const chaiAsPromised = require("chai-as-promised")
chai.use(chaiAsPromised)
const path = require("path")

// Verify that the provider meets all consumer expectations
const username = 'value'
const password = 'value'
const usernamePasswordBuffer = Buffer.from(username + ':' + password);
const base64data = usernamePasswordBuffer.toString('base64');
describe("Pact Verification", () => {
  it("validates the expectations of API Service", () => {
    let opts = {
      provider: "provide name as per name mentioned in the consumer.spec.js",
      logLevel: "DEBUG",
      providerBaseUrl: "provide endpoint",

      requestFilter: (req, res, next) => {
        console.log(
          "Middleware invoked before provider API - injecting Authorization token"
        )
        req.headers["MY_SPECIAL_HEADER"] = "my special value"

        // e.g. ADD Bearer token
        req.headers["authorization"] = `Basic ${base64data}`
        next()
      },

      // as per name mentioned in the consumer.spec.js as state in the interaction
      // stateHandlers: {
      //   "is not authenticated": () => {
      //     base64data = "1234"
      //     return Promise.resolve(`401 auth error`)
      //   }
      // },
      //   "Has some animals": () => {
      //     token = "1234"
      //     //importData()
      //     return Promise.resolve(`Animals added to the db`)
      //   },
      //   "Has an animal with ID 1": () => {
      //     token = "1234"
      //     //importData()
      //     return Promise.resolve(`Animals added to the db`)
      //   },
      //   "is not authenticated": () => {
      //     token = ""
      //     Promise.resolve(`Invalid bearer token generated`)
      //   },
      // },

      // Fetch pacts from broker
      pactBrokerUrl: "Pact broken URL",

      // Fetch from broker with given tags
      consumerVersionTag: ["prod"],

      // Tag provider with given tags
      providerVersionTag: ["prod"],

      // Specific Remote pacts (doesn't need to be a broker)
      // pactUrls: ['https://test.pact.dius.com.au/pacts/provider/Animal%20Profile%20Service/consumer/Matching%20Service/latest'],
      // Local pacts
      // pactUrls: [
      //   path.resolve(
      //     process.cwd(),
      //     "./pacts/matching_service-animal_profile_service.json"
      //   ),
      // ],

      //pactBrokerUsername: "dXfltyFMgNOFZAxr8io9wJ37iUpY42M",
      //pactBrokerPassword: "O5AIZWxelWbLvqMd8PkAVycBJh2Psyg1",
      publishVerificationResult: true,
      providerVersion: "1.0.0",
    }

    return new Verifier(opts).verifyProvider().then(output => {
      console.log("Pact Verification Complete!")
      console.log(output)
    })
  })
})