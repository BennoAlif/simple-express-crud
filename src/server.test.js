const request = require('supertest');
const app = require('./server');

let elementId;

describe('Test example', () => {
  test('should GET all todos', (done) => {
    request(app)
      .get('/todos/')
      .expect('Content-Type', /json/)
      .expect(200)
      .expect((res) => {
        res.body.data.length = 3;
        res.body.data[0].task = 'Belajar';
      })
      .end((err, res) => {
        if (err) return done(err);
        return done();
      });
  });

  test('should POST a todo', (done) => {
    request(app)
      .post('/todos/')
      .expect('Content-Type', /json/)
      .send({
        task: 'Mandi',
      })
      .expect(200)
      .expect((res) => {
        res.body.data.length = 4;
        res.body.data[0].task = 'Belajar';
        res.body.data[3].task = 'Mandi';
      })
      .end((err, res) => {
        if (err) return done(err);
        elementId = res.body.data[3].id;
        return done();
      });
  });

  test('should PUT a todo', (done) => {
    request(app)
      .put(`/todos/${elementId}`)
      .expect('Content-Type', /json/)
      .send({
        task: 'Baca',
      })
      .expect(200)
      .expect((res) => {
        res.body.data.length = 4;
        res.body.data[0].task = 'Belajar';
        res.body.data[3].id = elementId;
        res.body.data[3].task = 'Baca';
      })
      .end((err, res) => {
        if (err) throw done(err);
        return done();
      });
  });

  test('should DELETE a todo', (done) => {
    request(app)
      .delete(`/todos/${elementId}`)
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, res) => {
        if (err) throw done(err);
        return done();
      });
  });
});
