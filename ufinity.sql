DROP DATABASE IF EXISTS ufinity;

CREATE DATABASE IF NOT EXISTS ufinity;
USE ufinity;

DROP TABLE IF EXISTS students;
CREATE TABLE IF NOT EXISTS students (
	id int(5) NOT NULL AUTO_INCREMENT,
	email varchar(50) NOT NULL UNIQUE,
	status enum('normal', 'suspended') DEFAULT 'normal',
	PRIMARY KEY (id)
) ENGINE = InnoDB;

DROP TABLE IF EXISTS teachers;
CREATE TABLE IF NOT EXISTS teachers (
	id int(5) NOT NULL AUTO_INCREMENT,
	email varchar(50) NOT NULL UNIQUE,
	PRIMARY KEY (id)
) ENGINE = InnoDB;

DROP TABLE IF EXISTS registrations;
CREATE TABLE IF	NOT EXISTS registrations (
	id int(5) NOT NULL AUTO_INCREMENT,
	student varchar(50) NOT NULL,
	teacher varchar(50) NOT NULL,
	PRIMARY KEY (id),
	FOREIGN KEY fk_student(student) REFERENCES students(email),
	FOREIGN KEY fk_teacher(teacher) REFERENCES teachers(email)
) ENGINE = InnoDB;

INSERT INTO students (email, status) 
VALUES ('studentjon@example.com', 'normal'), 
('studenthon@example.com', 'normal'), 
('student_only_under_teacher_ken@gmail.com', 'normal'),
('commonstudent1@gmail.com', 'normal'),
('commonstudent2@gmail.com', 'normal'),
('studentmary@gmail.com', 'normal'),
('studentagnes@example.com', 'normal'),
('studentmiche@example.com', 'normal'),
('studentbob@example.com', 'normal');

INSERT INTO teachers (email)
VALUES ('teacherken@gmail.com'),
('teacherjoe@gmail.com');