var school_records = require('./school_records').init('./data/school.db');
exports.get_grades = function(req,res){
	school_records.getGrades(function(err,grades){
		res.render('grades',{grades:grades});
	});
};

exports.get_students = function(req,res){
	school_records.getStudentsByGrade(function(err,grades){
		res.render('students',{grades:grades});
	});
};

exports.get_subjects = function(req,res){
	school_records.getSubjectsByGrade(function(err,grades){
		res.render('subjects',{grades:grades});
	});
};

exports.get_student = function(req,res,next){
	school_records.getStudentSummary(req.params.id,
	function(err,student){
		if(!student) 
			next();
		else 
		{
			res.render('student',student);
		}
	});
};

exports.get_subject_summary = function(req,res,next){
	school_records.getSubjectSummary(req.params.id,
	function(err,subject){
		if(!subject) 
			next();
		else 
			res.render('subject',subject);
	});
};

exports.get_grade_summary = function(req,res,next){
	school_records.getGradeSummary(req.params.id,
		function(err,grade){
			if(!grade)
				next();
			else
				res.render('grade',grade);
		});
};

exports.get_edit_grade = function(req,res,next){
	school_records.getEditGrade(req.params.id,
		function(err,grade){
			if(!grade)
				next();
			else
				res.render('grade_edit',grade);
		});
};

exports.get_edit_student = function(req,res,next){
	school_records.getEditStudent(req.params.id,
		function(err,student){
			if(!student)
				next();
			else{
				console.log('from routes',student);
				res.render('student_edit',student);
			}
		});
};

exports.get_update_grade = function (req, res, next) {
	school_records.getUpdateGrade(req.body,
		function(err){
			if(err)
				next();
			else{
				res.redirect('/grade/'+req.body.id);
				res.end();
			}
		});
};

exports.get_update_student = function (req, res, next) {
	var id = req.body.id;
	var body = bodyParser(req.body);
	school_records.getUpdateStudent(body,
		function(err){
			if(err)
				next();
			else{
				res.redirect('/student/'+id);
				res.end();
			}
		});
};

var bodyParser = function (body) {
	var request = body;
	request.subjects = [];
	var updatedBody = request.subject_id.map(function(id,i){
		return {'id':id,score:request.subject_score[i]};
	});

	request.subjects.updatedBody;
	return request;
};
