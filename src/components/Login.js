import React,{useState} from 'react'
import { useHistory } from 'react-router';




export const Login = (props) => {
    const host = "http://localhost:5000";
    const [creds, setcreds] = useState({email: "", password:""})
    const history = useHistory();


    const onChange = (e) => {
        e.preventDefault();
        setcreds({...creds,[e.target.name]: e.target.value})
      }


    const handleclick  = async (e)  =>
    {
        e.preventDefault();
        const response = await fetch(`${host}/api/auth/login`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({email:creds.email,password:creds.password}),
          });
          const json = await response.json();
          console.log(json);
          if(json.success)
          {
            //  Save the auth-token and redirect to dashboard
            localStorage.setItem('token',json.authToken);
            history.push('/');
            props.showAlert("logged in successfully","success");
          }
          else
          {
              props.showAlert("Invalid Credentials!","danger");
          }
    }


    return (
        <div>
           <form onSubmit={handleclick}>
  <div className="form-group">
    <label htmlFor="email">Email address</label>
    <input type="email" className="form-control" id="email" name="email" aria-describedby="emailHelp" placeholder="Enter email" value={creds.email} onChange={onChange}/>
  </div>
  <div className="form-group">
    <label htmlFor="password">Password</label>
    <input type="password" className="form-control" id="password" name="password" placeholder="Password" value={creds.password} onChange={onChange}/>
  </div>
  <button type="submit" className="btn btn-primary">Login</button>
</form>
        </div>
    )
}
