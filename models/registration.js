module.exports = (sequelize, type) => {

	const Registration = sequelize.define('registration', {
		id: {
			type: type.INTEGER,
			autoIncrement: true,
			primaryKey: true
		},
		student: type.STRING,
		teacher: type.STRING
	}, {
    	timestamps: false
	});
	
	return Registration;
}