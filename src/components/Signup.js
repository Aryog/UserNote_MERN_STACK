import React,{useState} from 'react'
import { useHistory } from 'react-router-dom';


export const Signup = (props) => {
    const host = "http://localhost:5000";
    const [creds, setcreds] = useState({name:"",email: "", password:"", cpassword:""})
    const history= useHistory();

    const onChange = (e)=>
    {
        e.preventDefault();
        setcreds({...creds,[e.target.name]:e.target.value})
    }


    const handleClick = async (e)=>
    {
      e.preventDefault();
      if(creds.cpassword===creds.password)
      {
        const response = await fetch(`${host}/api/auth/createuser`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
      
            body: JSON.stringify({ name:creds.name, email:creds.email ,password:creds.password}),
          });
          const json = await response.json();
          console.log(json);
          console.log(json.success);
          if(json.success==="true")
          {
            localStorage.setItem('token',json.authToken);
            history.push('/');
            console.log('success from the createuser json');
            props.showAlert("User created Successfully!","success")
          }
        
          else
          {
              props.showAlert("Email Already Exists!","danger")
          }
        }
        else
        {
          props.showAlert("Confirmation Password didn't match!","warning")
        }
    }


    return (
        <form onSubmit={handleClick}>
        <div className="form-group">
        <label htmlFor="name">UserName</label>
        <input type="text" className="form-control" id="name" name="name" minLength={3} onChange={onChange} placeholder="UserName" required/>
          <label htmlFor="email">Email address</label>
          <input type="email" className="form-control" id="email" name="email" onChange={onChange} aria-describedby="emailHelp" placeholder="Enter email" required/>
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input type="password" className="form-control" id="password" name="password" minLength={5} onChange={onChange} placeholder="Password" required/>
          <label htmlFor="cpassword">Confirm Password</label>
          <input type="password" className="form-control" id="cpassword" name="cpassword" placeholder="Confirm Password" onChange={onChange} minLength={5} required/>
        </div>
        <button type="submit" className="btn btn-primary" disabled={(creds.cpassword===creds.password)?"":"true"}>Submit</button>
      </form>
    )
}
