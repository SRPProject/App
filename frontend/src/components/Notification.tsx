

import React from 'react'
import { Snackbar } from '@mui/material'
import ReactDOM from 'react-dom/client';

function Notification() {

  
  return (
    <div style={{position:"absolute"}}>
       this is kumaran 
    </div>
  )
}

export const triggerNotification = ()=>{
  
  console.log("notifications")

  // const root = ReactDOM.createRoot(
  //   document.getElementById('root') as HTMLElement
  // );
  // root.render(<Snackbar/>);

}

export default Notification