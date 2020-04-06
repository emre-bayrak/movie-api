const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();
const server = require('../../app');

chai.use(chaiHttp);

let token, directorId;

describe('/api/directors test', () => {
    before((done) => {
        this.timeout(500);
        setTimeout(done, 300);
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

    describe('/PUT/:director_id director', () => {
        it('It should UPDATE a director by the given ID', (done) => {
            const director = {
                firstName: 'Emreler',
                lastName: 'Bayraklar',
                bio: '11111I was born in Istanbul. I came to UK in 2017.I was born in Istanbul. I came to UK in 2017.I was born in Istanbul. I came to UK in 2017.'
            };

            chai.request(server)
                .put('/api/directors/'+ directorId)
                .send(director)
                .set('x-access-token', token)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('firstName').eql(director.firstName);
                    res.body.should.have.property('lastName').eql(director.lastName);
                    res.body.should.have.property('bio').eql(director.bio);
                    done();
                });
        });
    });

    describe('/DELETE/:director_id director', () => {
        it('It should DELETE a director by the given ID', (done) => {
            chai.request(server)
                .delete('/api/directors/'+ directorId)
                .set('x-access-token', token)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('status').eql(1);
                    done();
                });
        });
    });

});