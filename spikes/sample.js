var sqlite3 = require('sqlite3').verbose();

var _getUpdateStudent = function(student, db, onComplete){
	var studentUpdateQuery = "update students set name = '"+student.name+"', grade_id = '" +student.grade_id + "' where id='" +student.id+"'";
	db.run(studentUpdateQuery,function(std_err){
		student.subjects.forEach(function(subject,index,array){
			if(array.length-1 == index) onComplete('hiiiiii');
			var updateScoreQuery = "update scores set score="+subject.score+" where student_id='"+student.id+"' and subject_id = '"+subject.id+"';";
			db.run(updateScoreQuery, function(){});
		});
	});
};

var student = { name: 'Abu',
	id: 1,
	grade_id: 1,
	subjects:
	[ { id: 1, score: 10 },
	 { id: 2, score: 10 },
	 { id: 3, score: 10 } ] };


var callback = function (err) {
	if(err){return;}
	db.run("PRAGMA foreign_keys = 'ON';");
	_getUpdateStudent(student, db, console.log);
	db.close();
}

var db = new sqlite3.Database('./school_sample.db', callback);


// Database#each(sql, [param, ...], [callback], [complete]);