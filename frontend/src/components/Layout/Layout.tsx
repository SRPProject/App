import React,{ useState } from "react";
import Styles from "./Layout.module.css";
import { useEffect } from "react";
import SideBar from "../SideBar/SideBar"
import NavHeader from "../NavHeader"


interface type {
  Body : any 
}


function Layout({Body}:type) {
  
  console.log(Body)
  const [desktop, changeDesktop] = useState(false);

  const handleSize = () => {
    if (window.innerWidth > 500) changeDesktop(true);
    else changeDesktop(false);
  };

  useEffect(() => {
    window.addEventListener("resize", handleSize);
    handleSize() 
    return () => {
      window.addEventListener("resize", handleSize);
    };
  }, []);


  return <>{desktop ? <DesktopLayout Body={Body}/> : <MobileLayout  Body={Body}/>}</>;

}

////////////////////////////////////////////////////////

function MobileLayout({Body}:type) {
  
  const [sideOpen, changeSideOpen] = useState<Boolean>(false);

  const toggleOpen = () => changeSideOpen((prev) => !prev);
  

  return (
    <div className={Styles.layout}>
      {
        <div
          className={
            [ Styles.nav , sideOpen&&Styles.nav_active ].join(' ')
          }
        >
          <SideBar/>
        </div>
      }

      <NavHeader className={Styles.nav_header}  desktop={false} toggleOpen={toggleOpen}/>
      
      <div  className={Styles.body}>
         {Body}
      </div>
      

    </div>
  );
}

////////////////////////////////////////////////

function DesktopLayout({Body}:type) {
  return (
    <div className={Styles.nav_desktop_wrapper} >
      
      <div className={Styles.nav_desktop}>
        <SideBar/>
      </div>

      <div>

        <NavHeader className={Styles.nav_header} desktop={true} toggleOpen={null}/>
        
        <div className={Styles.body}>

           {Body}

        </div>

      </div>


    </div>
  )
}


export default Layout;
