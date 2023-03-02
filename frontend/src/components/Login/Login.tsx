import { useState } from "react";
import Styles from "./Login.module.css";
import { Button, Switch,Link } from "@mui/material";
import CustomInput from "../InputBox";
import ReCAPTCHA from "react-google-recaptcha";
import {login , forgotPassword} from "../../services/login.service"

const LOGO = "/images/logo.png"

//////////////////////////////////////////////////////


function Login({role}:{role:string}) {
  
  // true for normal login ; false for forgot password
  const [toggle, handleToggle] = useState(true);

  const changeMode = () => {
    handleToggle(prev => !prev);
  }

  return (
    <div className={Styles.login}>
      <div className={Styles.login_logo}>
        <div>
          <img className={Styles.login_logo_image} src={LOGO}></img>
        </div>
      </div>

      <div className={Styles.login_box}>

        {
          toggle ? 
          <NormalLogin role={role} changeMode={changeMode }/> : 
          <ForgotPassword changeMode={changeMode }/>
        }
          
      </div>
    </div>
  );
}


//////////////////////////////////////////////////////

const ForgotPassword = ({changeMode}:{changeMode:any}) => {
  const [Email, changeEmail] = useState("");
  
  const submitData = () => {
    (async () => {
        const res :any  = await forgotPassword({email:Email})
        if(res.message==="success"){
          // pull notification
        }
        else {

        }
    })();
  };

  return (
    <>
     <h2>Reset Password</h2>

      <CustomInput
        type="email"
        title="Email"
        data={Email}
        changeData={changeEmail}
      />
      <Button variant="contained" disableElevation onClick={submitData}>
        Send Mail 
      </Button>

      <Link onClick={changeMode}
            style={{cursor:"pointer",marginTop:"13px"}}
      >Login</Link>
    </>
  );
};

//////////////////////////////////////////////////////

const NormalLogin = ({changeMode,role}:{changeMode:any,role:string}) => {
 
   const [Email, changeEmail] = useState("");
   const [Password, changePassword] = useState("");
   const [requestSent, changeRequestSent] = useState(false);


  const config = [
    {
      title: "Email",
      type: "text",
      data: Email,
      changeData: changeEmail,
    },
    {
      title: "Password",
      type: "password",
      data: Password,
      changeData: changePassword,
    },
  ];

  const submitData = () => {
    
    var url = ""

    if (role === "student") {
       url = "/student/login"
    }
    else {
      // url ="/admin/login"
      url="/auth/adminLogin"
    }

    (async () => {
      const res:any = await login(url, { email: Email, password: Password })

      if (res.status===200  && res.data.message === "Success") {
        console.log("success");
      }
      else {
        console.log("failure");
      }
    })()

  };

  return (
    <>
      <h2 style={{textTransform:"capitalize"}}>{role} Login</h2>
      {config.map((el: any) => {
        return (
          <CustomInput
            type={el.type}
            title={el.title}
            data={el.data}
            changeData={el.changeData}
          />
        );
      })}

      <ReCAPTCHA
        sitekey="6LeeV6YkAAAAAI--BlJpwkhQdYqA9nHKWWjnbMPv"
      />


      <Button sx={{marginTop:"2em"}}  variant="contained" disableElevation onClick={submitData}>
        Login
      </Button>

      <div className={Styles.row}>
      <div>
          <span>Remember Me</span>
          <Switch></Switch>
      </div>

      <Link 
      style={{cursor:"pointer"}}
      onClick={changeMode}>Forgot Password?</Link>
      
      </div>
      
    </>
  );
};



export default Login;
