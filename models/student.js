module.exports = (sequelize, type) => {

	const Student = sequelize.define('student', {
		id: {
			type: type.INTEGER,
			autoIncrement: true,
			primaryKey: true
		},
		email: type.STRING,
		status: type.STRING
	}, {
    	timestamps: false
	});



	return Student;
}