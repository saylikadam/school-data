var _getSubjectSummary = function(id,db,onComplete){
	var subject_query = "select name, grade_id, maxScore from subjects where id ="+id;
	db.get(subject_query,function(err,subject){
		var student_score_query = "select st.name,sc.score from students st ,scores sc where st.id = sc.student_id and st.grade_id =" + subject.grade_id;
		db.all(student_score_query,function(ess,student_summary){
			subject.student_summary = student_summary;
			console.log(student_summary);
			var grade_query = "select name from grades where id="+subject.grade_id;
			db.all(grade_query,function(egr,grade){
				subject.grade = grade;
				onComplete(null,subject);
			});
		});
	});
};