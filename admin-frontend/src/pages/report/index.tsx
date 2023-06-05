import React ,{useContext, useState}from "react";
import { CustomContext } from "../../utils/Routes";
import { Button } from "@mui/material";
import axiosObj from "../../api"
import {toast} from "react-toastify"
import html2pdf from 'html2pdf.js';


const Report = () => {
  
  const {batch,degree} = useContext(CustomContext)

  const [results,setResults] = useState([])

  const submit = async ()=>{
      const data = {
         degreeDegid : document.getElementById("degreeDegid").value,
         batchId : document.getElementById("batchId").value ,
         distDepartmentDeptid : 1 
      
        }

        const endpoint = document.getElementById("url" ).value 

        const resp = await axiosObj.get(endpoint,{
          params : data
        })

        if(resp.status===200)
        {
           setResults(resp.data.message)
        }
        else {
          toast.error(resp.data.message)
        }
  }

  return <div>

     <div style={{
       display : "flex" ,
       gap : "2rem"
     }}>
      <select id="batchId">
         {
           batch && batch.map((el:any)=>{
             return(
              <option value={el.id}>{el.name}</option>
             )
           })
         }
      </select>

      <select id="degreeDegid">
        {
           degree && degree.map((el:any)=>{
            return(
             <option value={el.id}>{el.name}</option>
            )
          })
        }
      </select>

      <select id="url">
        <option value="admin/getscholarship">Scholarship</option>
        {/* <option value="admin/getProjectReport">Project </option>
        <option value="admin/getPlacementReport">Placement</option>
        <option value="admin/getInternshipsReport">Internship</option> */}
      </select>

     </div>

     <Button onClick={submit} sx={{margin:"2rem 0"}} variant="contained">Generate Report</Button>

     { results.length!==0 && <HTMLToPDF results={results}/>}
    
  </div>;
};



const HTMLToPDF = ({results}:{results:any}) => {
  const generatePDF = () => {
    const element = document.getElementById('htmlContent');

    const options = {
      filename: 'document.pdf',
      margin: [10, 10, 10, 10],
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
    };

    html2pdf()
      .from(element)
      .set(options)
      .save();
  };

  return (
    <div>
      <Button variant="contained" style={{marginBottom:"2rem"}} onClick={generatePDF}>Generate PDF</Button>
      <div id="htmlContent" style={{fontFamily:"sans-serif"}}>
        <table style={{width:"100%",border:"1px solid",borderCollapse:"collapse"}}>
           <tr >
            <th style={{border:"1px solid",fontSize:"1.5rem"}}>Sno</th>
      <th  style={{border:"1px solid",fontSize:"1.5rem"}}>Rollnumber</th>
      <th  style={{border:"1px solid",fontSize:"1.5rem"}}>Scholarship Name</th>
      <th  style={{border:"1px solid",fontSize:"1.5rem"}}>Scholarship Amount</th>
      <th  style={{border:"1px solid",fontSize:"1.5rem"}}>Proof</th>
           </tr>
           {
          results.map((e:any,index:any)=>{
            return(
              <tr >
                  <td style={{border:"1px solid",textAlign:"center",padding:"2rem"}}>{index}</td>
                  <td  style={{border:"1px solid",textAlign:"center",padding:"2rem"}}>{e.rollnumber}</td>
                  <td  style={{border:"1px solid",textAlign:"center",padding:"2rem"}}>{e.scholarshipname}</td>
                  <td  style={{border:"1px solid",textAlign:"center",padding:"2rem"}}>{e.scholarshipamount}</td>
                  <td  style={{border:"1px solid",textAlign:"center",padding:"2rem"}}><a href={e.fileurl}>Download</a></td>

              </tr>
                
            )
          })

         }

        </table>
         
      </div>
    </div>
  );
};

export default Report;