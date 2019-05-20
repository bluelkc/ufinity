module.exports = (sequelize, type) => {

	const Teacher = sequelize.define('teacher', {
		id: {
			type: type.INTEGER,
			autoIncrement: true,
			primaryKey: true
		},
		email: type.STRING
	}, {
    	timestamps: false
	});
	
	return Teacher;
}