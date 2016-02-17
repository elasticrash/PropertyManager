/**
 * Created by tougo on 16/2/16.
 */
var supertest = require("supertest");
var server = supertest.agent("http://localhost:3000");

describe('property list', function() {
    it('should respond to property list', function () {
        server
            .get("/api/property/list")
            .expect("Content-type",/json/)
            .expect(200) // THis is HTTP response
            .end(function(err,res){
                // HTTP status should be 200
                res.status.should.equal(200);
                // Error key should be false.
                res.body.error.should.equal(false);
                done();
            });
    });

});

describe('tenant list', function() {
    it('should respond to tenant list', function () {
        server
            .get("/api/tenant/list")
            .expect("Content-type",/json/)
            .expect(200) // THis is HTTP response
            .end(function(err,res){
                // HTTP status should be 200
                res.status.should.equal(200);
                // Error key should be false.
                res.body.error.should.equal(false);
                done();
            });
    });

});

describe('month list', function() {
    it('should respond to month list', function () {
        server
            .get("/api/month/list")
            .expect("Content-type",/json/)
            .expect(200) // THis is HTTP response
            .end(function(err,res){
                // HTTP status should be 200
                res.status.should.equal(200);
                // Error key should be false.
                res.body.error.should.equal(false);
                done();
            });
    });
});

describe('payment list', function() {
    it('should respond to payment list', function () {
        server
            .get("/api/payment/list")
            .expect("Content-type",/json/)
            .expect(200) // THis is HTTP response
            .end(function(err,res){
                // HTTP status should be 200
                res.status.should.equal(200);
                // Error key should be false.
                res.body.error.should.equal(false);
                done();
            });
    });
});