import { LoginApi } from '../services/Api';
import  './Loginpages.css';
import { useState } from 'react';
import { storeUserData } from '../services/Storage';
import { isAuthenticated } from '../services/Auth';
import { Link, Navigate } from 'react-router-dom';
import NavBar from '../components/NavBar';

export default function LoginPage() {

    const initialStateErrors={
        email:{required:false},
        password:{required:false},
        name:{required:false},
        custom_error:null
      };

const[errors,setErrors]=useState(initialStateErrors);   

const[loading,setLoading]=useState(false);  

const[inputs,setInputs]=useState({   /* inital input */
          email:"",
          password:""
          
        })

        const handleInput=(event)=>{        /*  handleinput store name=ala,mail=@gmail input value*/
        setInputs({...inputs,[event.target.name]:event.target.value}) 
   }


const handleSubmit=(event)=>{       /* if register click trigger  */
            event.preventDefault();        /*   to stop browser loading*/
            let errors=initialStateErrors;   /* if any input is blank it shows error */
            let hasError=false;
            
            if (inputs.email == ""){
              errors.email.required=true;
              hasError=true;
            }
            if (inputs.password == ""){
              errors.password.required=true;
              hasError=true;
            }
            
            if(!hasError){   /*haserror!=true  */
              setLoading(true)  /* if has no error once submit loading spinner run */
               LoginApi(inputs).then((response)=>{
                storeUserData(response.data.idToken);
                
       
               }).catch((err)=>{
                  if(err.code="ERR_BAD_REQUEST"){
                    setErrors({...errors,custom_error:"invalid Credentials"})
                  }
                  
               }).finally(()=>{
                setLoading(false) 
               })
            }

                      
            setErrors({...errors});
            
        }
        if (isAuthenticated()) {  
            return <Navigate to="/dashboard" />
        }

    return (
      <div>
        <NavBar/>
        <section className="login-block">
        <div className="container">
            <div className="row ">
                <div className="col login-sec">
                    <h2 className="text-center">Login</h2>
                    <form onSubmit={handleSubmit} className="login-form" action="">
                    <div className="form-group">
                        <label htmlFor="exampleInputEmail1" className="text-uppercase">Email</label>
                        <input type="email"  className="form-control"  onChange={handleInput}  name="email"  id="" placeholder="email" />
                        {errors.email.required==true?
                        (<span className="text-danger" >
                            Email is required.
                        </span>):null
                        }
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputPassword1" className="text-uppercase">Password</label>
                        <input  className="form-control" type="password" onChange={handleInput}   name="password" placeholder="password" id="" />
                        {errors.password.required==true?
                        (<span className="text-danger" >
                            Password is required.
                        </span>):null
                     }
                    </div>
                    <div className="form-group">
                    { loading?
                        (<div  className="text-center">
                          <div className="spinner-border text-primary " role="status">
                            <span className="sr-only">Loading...</span>
                          </div>
                        </div>):null
                         }
                        <span className="text-danger" >
                        {errors.custom_error?
                           (<p>{errors.custom_error}</p>)
                           :null
                           }
                        </span>
                        <input  type="submit" className="btn btn-login float-right"disabled={loading} value="Login"/>
                    </div>
                    <div className="clearfix"></div>
                    <div className="form-group">
                    Create a new account ? Please <Link to="/register">Register</Link>
                    </div>
                    </form>
                </div>
            </div>
        </div>
    </section>
    </div>
    )
}
