const express = require('express')
const bodyParser = require('body-parser')
const db = require('../sequelize')
const router = express.Router()


// test
router.get('/student', (req, res) => {
	db.Student.findAll({
		attributes: ['email', 'status']
	}).then(users => {
		console.log(users);
		res.json(users)
	})
})

// register students
router.post('/register', (req, res) => {
	const teacherEmail = req.body.teacher;
	const students = req.body.students;
	arr = [];
	students.forEach( email => {
		arr.push({teacher:teacherEmail, student:email})
	})
	db.Registration.bulkCreate(arr).then(() => {
		res.status(204).end();
	}).catch(error => {
		console.log(error);
		res.status(400).json({message:"Invalid email address, make sure all provided email addresses are from registered users."})
	})

})

// common student
router.get('/commonstudents', (req, res) => {
	teachers = req.query.teacher;
    arr = teachers.toString().split(',');
    count = 0;
    result = [];
    arr.forEach( email => {
    	db.Registration.findAll({
    		attributes: ['student'],
    		raw: true,
    		where: {
    			teacher: email
    		}
    	}).then(emails => {
    		result.push(emails.map(e => e.student));
    		count++;
    	    handle();
    	}).catch(error => {
    		console.log(error);
    		res.status(400).end();
    	})

    })
    
    function handle() {
    	if (count == arr.length) {
    		result = result.reduce((a,b) => a.filter(c => b.includes(c)));
    		data = {"students" : result};
			res.status(200).json(data);
		}
	}
})

// suspend student
router.post('/suspend', (req, res) => {
	const studentEmail = req.body.student;
	db.Student.update({
		status: 'suspended'
	}, {
		where: {
			email: studentEmail
		}
	}).then(() => {
		res.status(204).end();
	}).catch(error => {
		console.log(error);
		res.status(400).end();
	});
})

// retrieve for notifications
router.post('/retrievefornotifications', (req, res) => {
	const teacherEmail = req.body.teacher;
	const msg = req.body.notification;
	const emails = msg.match(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/g);
	db.Registration.findAll({
		attributes: ['student'],
		raw: true,
		where: {
			teacher: teacherEmail
		}
	}).then(studentEmails => {
		tmp = studentEmails.map(e => e.student);
		tmp = tmp.filter((value, index, self) => {
			return self.indexOf(value) === index;
		});
		result = tmp.concat(emails.filter(e => {
			return tmp.indexOf(e) < 0;
		}));
		res.status(200).json({"recipients":result});
	}).catch(error => {
		console.log(error);
		res.status(400).end();
	})
})

module.exports = router;