select * from studentsems inner join 
         students on students."st_id" = studentsems."studentStId"
		 inner join marksheets on marksheets."studentStId" = students."st_id" 
		 inner join subjects on subjects."subid" = studentsems."subjectSubid"
		 where students."distFacultyFacultyId" = 1 and 
		 students."batchId" = 1  and marksheets."semester_no" = 1 
		 ; 		