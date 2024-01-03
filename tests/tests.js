const request = require("supertest");
const { expect } = require("chai");
const app = require("../server"); // Import your Express app
const connectdb = require('../db_connection')

describe("Notes Routes", () => {
  var note_id
  var token
  var id
// Test case for adding a user
it("should add a user", (done) => {
  request(app)
    .post("/api/auth/signup")
    .send({
      "email": "test@gmail.com",
      "password": "123465789",
    })
    .expect(200)
    .end((err, res) => {
      if (err) return done(err);
      expect(res.body).to.be.an("object");
     
      done();
    });
});
// Test case for login a user
it("should login a user", (done) => {
  request(app)
    .post("/api/auth/login")
    .send({
      "email": 'test@gmail.com',
      "password": "123465789",
    })
    .expect(200)
    .end((err, res) => {
      if (err) return done(err);
      expect(res.body).to.be.an("object");
      id = res.body.user._id
      token = res.body.user.token
      token = res.headers['set-cookie'][0];
      done();
    });
});

  // Test case for adding a note
  it("should add a note", (done) => {
    request(app)
      .post("/api/notes")
      .set('Cookie', token)
      .send({
        'note':'TESTSTSTSTSTSTS'
      })
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body).to.be.an("object");
        
        done();
      });
  });

  // Test case for getting a list of notes
  it("should return a list of notes", (done) => {
    request(app)
      .get("/api/notes")
      .set('Cookie', token)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body).to.be.an("object");
        expect(res.body.status).to.equal(true);
        note_id = res.body.notes[0]._id
        done();
      });
  });



// test case to get single note details
  it("should return a single notes details", (done) => {
    request(app)
      .get(`/api/notes/${note_id}`)
      .set('Cookie', token)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body).to.be.an("object");
        expect(res.body.status).to.equal(true);
        done();
      });
  });


  // Test case for sharing note
it("should share a note", (done) => {
  request(app)
    .post(`/api/notes/${note_id}/share`)
    .set('Cookie', token)
    .send({
      "shared_to": id
    })
    .expect(200)
    .end((err, res) => {
      if (err) return done(err);
      expect(res.body).to.be.an("object");
      done();
    });
});

  // Test case to update a note
  it("should update a note", (done) => {
    request(app)
      .patch(`/api/notes/${note_id}`)
      .send({
        "note": "updated",
       
      })
      .expect(200)
      .set('Cookie', token)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body).to.be.an("object");
        done();
      });
  });


  // Test case to search
  it("should return a single notes details", (done) => {
    request(app)
      .get(`/api/search?q=updated`)
      .set('Cookie', token)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body).to.be.an("object");
        expect(res.body.status).to.equal(true);
        done();
      });
  });
  // Test case to delete a notes
  it("should delete a note", (done) => {
    request(app)
      .delete(`/api/notes/${note_id}`)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body).to.be.an("object");
        done();
      });
  });

  after((done) => {
    done();
  });
});
