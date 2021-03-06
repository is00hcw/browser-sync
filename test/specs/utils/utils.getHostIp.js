"use strict";

var utils    = require("../../../lib/utils");

var devIp    = require("dev-ip");

var assert   = require("chai").assert;
var sinon    = require("sinon");

describe("Utils: getting the Host IP", function () {

    var regex;
    var ipStub;
    before(function () {
        ipStub = sinon.stub(devIp, "getIp").returns("192.168.0.4");
    });
    beforeEach(function () {
        regex = /\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}/;
    });
    afterEach(function () {
        ipStub.reset();
    });
    after(function () {
        ipStub.restore();
    });

    it("does not throw if no are options provided", function () {
        assert.doesNotThrow(function () {
            utils.getHostIp({});
        });
    });
    it("should use the IP address if provided in the options", function () {
        var hostIp = utils.getHostIp({
            host: "192.0.0.1"
        });
        assert.equal(hostIp, "192.0.0.1");
    });
    it("should return false detect:false", function () {
        var hostIp = utils.getHostIp({
            detect: false
        });
        assert.equal(hostIp, false);
    });
    it("should return false when no network available", function () {
        ipStub.returns(false);
        var hostIp = utils.getHostIp({});
        assert.equal(hostIp, false);
    });
    it("should return the ip if given as string", function () {
        var host = "127.0.0.2";
        var actual = utils.getHostIp({host: host});
        assert.equal(actual, host);
    });
    it("should return the first ip if given array", function () {
        var stubs = ["127.0.0.2", "21.23.4.6"];
        ipStub.returns(stubs);

        var actual = utils.getHostIp({});
        assert.equal(actual, stubs[0]);
    });
});
