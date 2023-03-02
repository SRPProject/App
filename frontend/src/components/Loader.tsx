


import { CircularProgress } from '@mui/material'

function Loader({ width,height}:{width:string,height:string}) {
  return (
      <div style={{
          height,
          width , 
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}>
            
            <CircularProgress/>
    
    </div>
  )
}

export default Loader
