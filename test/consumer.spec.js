"use strict";

const expect = require("chai").expect;
const path = require("path");
const { Pact } = require("@pact-foundation/pact");
const { getvoucherauth } = require("./consumer");

describe("test suite name", () => {
  let url = "http://localhost";
  const port = 8992;

  const provider = new Pact({
    port: port,
    log: path.resolve(process.cwd(), "logs", "mockserver-integration.log"),
    dir: path.resolve(process.cwd(), "pacts"),
    spec: 2,
    consumer: "consumer name",
    provider: "provide name",
    pactfileWriteMode: "merge"
  });

  const EXPECTED_BODY = {};
  // Setup the provider
  before(() => provider.setup());

  // Write Pact when all tests done
  after(() => provider.finalize());

  // verify with Pact, and reset expectations
  afterEach(() => provider.verify());

  describe("test name", () => {
    before(done => {
      const interaction = {
        state: "is not authenticated",
        uponReceiving:
          "a voucher equest with brnad, conutry, extended and voucher ID",
        withRequest: {
          method: "GET",
          path: "/api endpoint",
          query: {
            param: "value",
          },
          headers: {
            Accept: "application/json"
          }
        },
        willRespondWith: {
          status: 200,
          headers: {
            "Content-Type": "application/json"
          },
          body: EXPECTED_BODY
        }
      };
      provider.addInteraction(interaction).then(() => {
        done();
      });
    });

    it("returns the correct response", done => {
      const urlAndPort = {
        url: url,
        port: port
      };
      getvoucherauth(urlAndPort).then(response => {
        expect(response.data).to.eql(EXPECTED_BODY);
        done();
      }, done);
    });
  });
});
