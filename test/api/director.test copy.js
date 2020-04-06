const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();
const server = require('../../app');

chai.use(chaiHttp);

let token, directorId;

describe('/api/directors test', () => {
    before((done) => {
        chai.request(server)
            .post('/authenticate')
            .send({ username: 'ebayrak', password: 'abcd1234'})
            .end((err, res) => {
                token = res.body.token;
                done();
            });
    });

    describe('/GET directors', () => {
        it('It should GET all the directors', (done) => {
            chai.request(server)
                .get('/api/directors')
                .set('x-access-token', token)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    done();
                });
        });
    });

    describe('/POST director', () => {
        it('It should POST a director', (done) => {
            const director = {
                firstName: 'Emre1',
                lastName: 'Bayrak1',
                bio: 'I was born in Istanbul. I came to UK in 2017.I was born in Istanbul. I came to UK in 2017.I was born in Istanbul. I came to UK in 2017.',
            };

            chai.request(server)
                .post('/api/directors')
                .send(director)
                .set('x-access-token', token)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('firstName').eql(director.firstName);
                    res.body.should.have.property('lastName').eql(director.lastName);
                    res.body.should.have.property('bio').eql(director.bio);
                    directorId = res.body._id;
                    done();
                });
        });
    });

    describe('/GET/:director_id director', () => {
        it('It should GET a director by the given ID', (done) => {
            chai.request(server)
                .get('/api/directors/'+ directorId)
                .set('x-access-token', token)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    res.body[0].should.have.property('firstName');
                    res.body[0].should.have.property('lastName');
                    res.body[0].should.have.property('movies');
                    res.body[0].movies.should.be.a('array');
                    res.body[0].should.have.property('_id').eql(directorId);
                    done();
                });
        });
    });
/*
    describe('/PUT/:movie_id movie', () => {
        it('It should UPDATE a movie by the given ID', (done) => {
            const movie = {
                title: '93creative',
                director_id: '5e8a4feb529515248ce688b1',
                category: 'Crime',
                country: 'Cyprus',
                year: 1989,
                imdb_score: 5
            };

            chai.request(server)
                .put('/api/movies/'+ movieId)
                .send(movie)
                .set('x-access-token', token)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('title').eql(movie.title);
                    res.body.should.have.property('director_id').eql(movie.director_id);
                    res.body.should.have.property('category').eql(movie.category);
                    res.body.should.have.property('country').eql(movie.country);
                    res.body.should.have.property('year').eql(movie.year);
                    res.body.should.have.property('imdb_score').eql(movie.imdb_score);
                    done();
                });
        });
    });

    describe('/DELETE/:movie_id movie', () => {
        it('It should DELETE a movie by the given ID', (done) => {
            chai.request(server)
                .delete('/api/movies/'+ movieId)
                .set('x-access-token', token)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('status').eql(1);
                    done();
                });
        });
    });
    */
});