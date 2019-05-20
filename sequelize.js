const config = require('./config')
const TeacherModel = require('./models/teacher')
const StudentModel = require('./models/student')
const RegistrationModel = require('./models/registration')

const Sequelize = require('sequelize')
const sequelize = new Sequelize(config.database, config.user, config.pwd, {
	host : config.host,
	dialect : config.dialect,
	pool : {
		max : 10,
		min : 0,
		acquire : 30000,
		idel : 10000
	}
})

// test
sequelize.authenticate()
	.then(() => console.log('DB Connected.'))
	.catch(err => console.log('Error: ' + err));

const Teacher = TeacherModel(sequelize, Sequelize)
const Student = StudentModel(sequelize, Sequelize)
const Registration = RegistrationModel(sequelize, Sequelize)

Student.belongsToMany(Teacher, {through: Registration, unique: false})
Teacher.belongsToMany(Student, {through: Registration, unique: false})

module.exports = {
	Teacher,
	Student,
	Registration
}