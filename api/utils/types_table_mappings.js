const { Students ,Internships,Placement,Projects,Scholarship,Workshops,ExtraCourses,EventHackathon,PaperPublished,HigherEducation, StudentSem} = require("../models/students");



const getModel = (type)=>{

    switch(type) {
      
      case 'ACADEMICS' : return StudentSem; 

      case 'INTERSHIPS' : return Internships;  
  
      case 'PLACEMENTS' : return Placement;
  
      case 'PROJECTS' : return Projects;
  
      case 'SCHOLARSHIPS': return Scholarship;
  
      case 'WORKSHOPS' : return Workshops;
  
      case 'EXTRA_COURSES' : return ExtraCourses;
  
      case 'EVENTS_HACKATHON': return EventHackathon;
  
      case 'PAPER_PUBLISHED' :  return PaperPublished;
  
      case 'HIGHER_EDUCATION': return HigherEducation;
  
    }
  
  }

module.exports = getModel 
