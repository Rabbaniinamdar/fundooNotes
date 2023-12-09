/* eslint-disable prettier/prettier */
/* eslint-disable quotes */
import { expect } from 'chai';
import request from 'supertest';
import mongoose from 'mongoose';

import app from '../../src/index';

describe('User APIs Test', () => {
  before((done) => {
    const clearCollections = () => {
      for (const collection in mongoose.connection.collections) {
        mongoose.connection.collections[collection].deleteOne(() => { });
      }
    };

    const mongooseConnect = async () => {
      await mongoose.connect(process.env.DATABASE_TEST);
      clearCollections();
    };

    if (mongoose.connection.readyState === 0) {
      mongooseConnect();
    } else {
      clearCollections();
    }

    done();
  });

  describe('POST /users', () => {
    it('should register a user', (done) => {
      const userDetails = {
        "firstname": "virat",
        "lastname": "virat",
        "email": "virat@gmail.com",
        "password": "virat123",
        "confirmpassword": "virat123"
      };

      console.log('Test started');
      request(app)
        .post('/api/v2/users/register')
        .send(userDetails)
        .end((err, res) => {
          console.log('Request completed');
          expect(res.statusCode).to.be.equal(201);
          done();
        });
    });
  });

  describe('POST /users', () => {
    it('should login a user', (done) => {
      const userDetails = {
        email: "kohili@gmail.com",
        password: "Virat123",
      };

      console.log('Test started');

      request(app)
        .post('/api/v2/users/login')
        .send(userDetails)
        .end((err, res) => {
          console.log('Request completed.', res.body.data);
          expect(res.statusCode).to.be.equal(200);
          done();
        });
    });
  });

  // describe('POST/note', () => {
  //   it('should create a note', (done) => {
  //     const userDetails = {
  //       title: "Note 1",
  //       decription: "Somthing Impotrtant has to do"
  //     };

  //     console.log('Test started');

  //     request(app)
  //       .post('/api/v2/note')
  //       .set('Authorization', `${token}`)
  //       .send(userDetails)
  //       .end((err, res) => {
  //         id = res.body.data._id;
  //         console.log('Request completed');
  //         expect(res.statusCode).to.be.equal(200);
  //         done();
  //       });
  //   });
  // });

  // describe('GET /note', () => {
  //   it('should get all note', (done) => {

  //     console.log('Test started');

  //     request(app)
  //       .get('/api/v2/note')
  //       .set('Authorization', `${token}`)
  //       .end((err, res) => {
  //         console.log('Request completed');
  //         expect(res.statusCode).to.be.equal(200);
  //         done();
  //       });
  //   });
  // });


  // describe('GET /note', () => {
  //   it('should get a note', (done) => {

  //     console.log('Test started');

  //     request(app)
  //       .get(`/api/v2/note/${id}`)
  //       .set('Authorization', `${token}`)
  //       .end((err, res) => {
  //         console.log('Request completed');
  //         expect(res.statusCode).to.be.equal(200);
  //         done();
  //       });
  //   });
  // });

  // describe('PUT /note', () => {
  //   it('should update note', (done) => {
  //     const updateUserDetails = {
  //       title: "Title changed",
  //       decription: "decription changed"
  //     };
  //     console.log('Test started');

  //     request(app)
  //       .put(`/api/v2/note/${id}`)
  //       .set('Authorization', ` ${token}`)
  //       .send(updateUserDetails)
  //       .end((err, res) => {
  //         console.log('Request completed');
  //         expect(res.statusCode).to.be.equal(200);
  //         done();
  //       });
  //   });
  // });

  // describe('DELETE /note', () => {
  //   it('should delete note', (done) => {

  //     console.log('Test started');

  //     request(app)
  //       .delete(`/api/v2/note/deleteNote/${id}`)
  //       .set('Authorization', `${token}`)
  //       .end((err, res) => {
  //         console.log('Request completed');
  //         expect(res.statusCode).to.be.equal(200);
  //         done();
  //       });
  //   });
  // });

  // describe('PUT /note', () => {
  //   it('should achive note', (done) => {

  //     console.log('Test started');

  //     request(app)
  //       .put(`/api/v2/note/archive/${id}`)
  //       .set('Authorization', `${token}`)
  //       .end((err, res) => {
  //         console.log('Request completed');
  //         expect(res.statusCode).to.be.equal(200);
  //         done();
  //       });
  //   });
  // });

  // describe('PUT /note', () => {
  //   it('should unarchive a note', (done) => {

  //     console.log('Test started');

  //     request(app)
  //       .put(`/api/v2/note/unarchive/${id}`)
  //       .set('Authorization', `${token}`)
  //       .end((err, res) => {
  //         console.log('Request completed');
  //         expect(res.statusCode).to.be.equal(200);
  //         done();
  //       });
  //   });
  // });

  // describe('DELETE /note', () => {
  //   it('should delete archive note', (done) => {

  //     console.log('Test started');

  //     request(app)
  //       .put(`/api/v2/note/deletearchive/${id}`)
  //       .set('Authorization', `${token}`)
  //       .end((err, res) => {
  //         console.log('Request completed');
  //         expect(res.statusCode).to.be.equal(200);
  //         done();
  //       });
  //   });
  // });

  after((done) => {
    mongoose.disconnect(done);
  });

});