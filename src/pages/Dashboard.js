import { useEffect, useState } from "react"
import { UserDetailsApi } from "../services/Api"
import NavBar from "../components/NavBar"
import { logout } from "../services/Auth"
import { Navigate, useNavigate } from "react-router-dom"
import { isAuthenticated } from "../services/Auth"

export default function DashboardPage(){ 
    const navigate =useNavigate();  
    const [user,setUser]=useState({name:"",email:"",localId:""})
  
    useEffect(()=>{   
        if(isAuthenticated()){
            UserDetailsApi().then((response)=>{
                setUser({name:response.data.users[0].displayName,
                    email:response.data.users[0].email,
                 
                    localId:response.data.users[0].localId,
                    })
               
               })
        }    
      
    },[])
            const logoutUser=()=>{
                 logout();
                 navigate('/login')
            }

            if (!isAuthenticated()) {           /* not login can't dashboard    */
                return <Navigate to="/dashboard" />
            }

    return(
        <div>
            <NavBar logoutUser={logoutUser}/>
        <main role="main" className="container mt-5">
          <div className="container">
           <div className="text-center mt-5">
            <h3>User Dashboard page</h3>
            { user.name && user.email && user.localId?
            (<div>
                 <p className="text-bold ">Hi!! {user.name}, your Firebase ID is  {user.localId}</p>
                 <p>your email ID is {user.email}</p>
            </div>)
            :<p>loading...</p>
             }
         
          </div>
        </div>
    </main>
    </div>
    )
}