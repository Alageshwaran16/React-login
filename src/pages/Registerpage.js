import { useState } from 'react'
import './Registerpage.css'
import { RegisterApi } from '../services/Api';
import { storeUserData } from '../services/Storage';
import { isAuthenticated } from '../services/Auth';
import { Link, Navigate } from 'react-router-dom';
import NavBar from '../components/NavBar';
export default function RegisterPage(){

          const initialStateErrors={
            email:{required:false},
            password:{required:false},
            name:{required:false},
            custom_error:null
          };

    const[errors,setErrors]=useState(initialStateErrors);    /* initial error required stop code bottom input box*/
       /* email:{required:false},
        password:{required:false},
        name:{required:false},
        custom_error:null
    });*/

        const[loading,setLoading]=useState(false);      /* initial stage of form  */

        const handleSubmit=(event)=>{       /* if register click trigger  */
            event.preventDefault();        /*   to stop browser loading*/
            let errors=initialStateErrors;   /* if any input is blank it shows error */
            let hasError=false;
            if (inputs.name == ""){
              errors.name.required=true;
              hasError=true;
            }
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
               RegisterApi(inputs).then((response)=>{
                storeUserData(response.data.idToken);
                
       
               }).catch((err)=>{
                  if(err.response.data.error.message=="EMAIL_EXISTS"){  /*  error handling of email exits*/
                      setErrors({...errors,custom_error:"Already this email has been generated!"})
                  } else if(String(err.response.data.error.message).includes('WEAK_PASSWORD')){
                    setErrors({...errors,custom_error:"password should be atleast 6 characters"})
                  }
               }).finally(()=>{
                setLoading(false) 
               })
            }

                      
            setErrors({...errors});
            
        }
        const[inputs,setInputs]=useState({   /* inital input */
          email:"",
          password:"",
          name:""
        })

        const handleInput=(event)=>{        /*  handleinput store name=ala,mail=@gmail input value*/
             setInputs({...inputs,[event.target.name]:event.target.value}) 
        }
       if (isAuthenticated()) {             /* if user succesfully login go to next page*/  
        return <Navigate to="/dashboard" />
      
       }


    return(
      <div>
        <NavBar/>
        <section className="register-block">
              <div className="container">
               <div className="row ">
                <div className="col register-sec">
                     <h2 className="text-center">Register</h2>
                     <form onSubmit={handleSubmit} className="register-form" action="" >
                      <div className="form-group">
                        <label htmlFor="exampleInputEmail1" className="text-uppercase">Name</label>
          
                        <input type="text" className="form-control" onChange={handleInput} name="name" id="" placeholder='enter your name'/>
                        {errors.name.required==true?
                        (<span className="text-danger" >
                            Name is required.
                        </span>):null
                        }
                     </div>
                      <div className="form-group">
                        <label htmlFor="exampleInputEmail1" className="text-uppercase">Email</label>
          
                        <input type="text"  className="form-control" onChange={handleInput} name="email" id="" placeholder='enter your email' />
                        {errors.email.required==true?
                        (<span className="text-danger" >
                            Email is required.
                        </span>):null
                        }
                     </div>
                     <div className="form-group">
                        <label htmlFor="exampleInputPassword1" className="text-uppercase">Password</label>
                        <input  className="form-control" type="password" onChange={handleInput} name="password" id="" placeholder='enter your password'/>
                        {errors.password.required==true?
                        (<span className="text-danger" >
                            Password is required.
                        </span>):null
                        }
                     </div>
                     <div className="form-group">
                         
                        <span className="text-danger" >
                        {errors.custom_error?
                           (<p>{errors.custom_error}</p>)
                           :null
                           }
                        </span>
                        { loading?
                        (<div  className="text-center">
                          <div className="spinner-border text-primary " role="status">
                            <span className="sr-only">Loading...</span>
                          </div>
                        </div>):null
                         }
                        <input type="submit" className="btn btn-login float-right" disabled={loading} value="Register"/>
                     </div>
                     <div className="clearfix"></div>
                     <div className="form-group">
                       Already have an account ? Please <Link to="/login">Login</Link>
                     </div>
          
          
                     </form>
          
          
                  </div>
          
               </div>
          
          
            </div>
          </section>
          </div>
    )
  }