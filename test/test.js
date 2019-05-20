const chai = require('chai')
const expect = chai.expect;
const chaiHttp = require('chai-http')
const app = require('../server')

chai.use(chaiHttp)
chai.should();

describe('Register', () => {
	describe('POST /api/register', () => {
		it('Returns a 204 response', () => {
			return chai.request(app)
			.post('/api/register')
			.send({
			    "teacher": "teacherken@gmail.com",
			    "students": [
			        "student_only_under_teacher_ken@gmail.com"
			    ]
			})
			.then(response => {
				expect(response).to.have.status(204);
				//done();
			})
		})
	})
})

describe('Register', () => {
	describe('POST /api/register', () => {
		it('Returns a 400 response', () => {
			return chai.request(app)
			.post('/api/register')
			.send({
			    "teacher": "teacherken@gmail.com",
			    "students": [
			        "student_doesnt_exist@gmail.com"
			    ]
			})
			.then(response => {
				expect(response).to.have.status(400);
				//done();
			})
		})
	})
})