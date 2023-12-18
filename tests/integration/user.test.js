/* eslint-disable prettier/prettier */
/* eslint-disable quotes */
import { expect } from 'chai';
import request from 'supertest';
import mongoose from 'mongoose';

import app from '../../src/index';

describe('User APIs Test', () => {
  let token;
  let id;

  before(async () => {
    const clearCollections = async () => {
      for (const collection in mongoose.connection.collections) {
        await mongoose.connection.collections[collection].deleteMany({});
      }
    };

    const mongooseConnect = async () => {
      await mongoose.connect(process.env.DATABASE_TEST, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      await clearCollections();
    };

    if (mongoose.connection.readyState === 0) {
      await mongooseConnect();
    } else {
      await clearCollections();
    }
  });

  describe('POST /users', () => {
    it('should register a user', (done) => {
      const userDetails = {
        "firstname": "virat",
        "lastname": "virat",
        "email": "virat@gmail.com",
        "password": "virat123",
        "confirmpassword": "virat123",
      };

      request(app)
        .post('/api/v2/users/')
        .send(userDetails)
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(201);
          done();
        });
    });
  });

  describe('POST /users/login', () => {
    it('should login a user', (done) => {
      const userDetails = {
        email: "virat@gmail.com",
        password: "virat123",
      };

      request(app)
        .post('/api/v2/users/login')
        .send(userDetails)
        .end((err, res) => {
          token = res.body.data.token;
          expect(res.statusCode).to.be.equal(201);
          done();
        });
    });
  });

  describe('POST /note', () => {
    it('should create a note', (done) => {
      const userDetails = {
        title: "Note 1",
        description: "Something Important has to do",
        color: "red"
      };
      request(app)
        .post('/api/v2/note')
        .set('Authorization', `${token}`)
        .send(userDetails)
        .end((err, res) => {
          id = res.body.data._id;
          expect(res.statusCode).to.be.equal(201);
          done();
        });
    });
  });

  describe('GET /note', () => {
    it('should get all notes', (done) => {
      request(app)
        .get('/api/v2/note')
        .set('Authorization', `${token}`)
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(200);
          done();
        });
    });
  });

  describe('GET /note/:id', () => {
    it('should get a specific note', (done) => {
      request(app)
        .get(`/api/v2/note/${id}`)
        .set('Authorization', `${token}`)
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(200);
          done();
        });
    });
  });

  describe('PUT /note/:id', () => {
    it('should update a note', (done) => {
      const updateNoteDetails = {
        title: "Updated Title",
        description: "Updated Description",
      };

      request(app)
        .put(`/api/v2/note/${id}`)
        .set('Authorization', `${token}`)
        .send(updateNoteDetails)
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(200);
          done();
        });
    });
  });

  describe('DELETE /note/:id', () => {
    it('should delete a note', (done) => {
      request(app)
        .delete(`/api/v2/note/${id}`)
        .set('Authorization', `${token}`)
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(200);
          done();
        });
    });
  });

  describe('PUT /note/archive/:id', () => {
    it('should archive a note', (done) => {
      request(app)
        .put(`/api/v2/note/archive/${id}`)
        .set('Authorization', token)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          expect(res.statusCode).to.equal(200);
          done();
        });
    });
  });


  describe('GET /note/archive/', () => {
    it('should get all archive', (done) => {
      request(app)
        .get(`/api/v2/note/archive`)
        .set('Authorization', `${token}`)
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(200);
          done();
        });
    });
  });
  describe('PUT /note/unarchive/:id', () => {
    it('should unarchive a note', (done) => {
      request(app)
        .put(`/api/v2/note/unarchive/${id}`)
        .set('Authorization', token)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          expect(res.statusCode).to.equal(200);
          done();
        });
    });
  });

  after((done) => {
    mongoose.disconnect(done);
  });
});