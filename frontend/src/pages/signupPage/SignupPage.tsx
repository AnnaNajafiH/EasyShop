import { useLocation, useNavigate , Link} from "react-router-dom";
import { useState , useContext, useEffect } from "react";
import { Store } from "../../Store";
import { useSignupMutation } from "../../hooks/userHooks";
import { ApiError } from "../../types/ApiError";
import { toast } from "react-toastify";
import { getError } from "../../utils/utils";
import { Button, Container, Form } from "react-bootstrap";
import { Helmet } from "react-helmet-async";





export default function signupPages(){
    const navigate=useNavigate();
    const {search}=useLocation();
    const redirectInUrl=new URLSearchParams(search).get("redirect");
    const redirect=redirectInUrl?redirectInUrl:"/";


const [name, setName]=useState("");
const [email, setEmail]=useState("");
const [password, setPassword]=useState("");
const [confirmPassword, setConfirmPassword]=useState("");

const {state, dispatch}=useContext(Store);
const {userInfo}=state;


useEffect(()=>{
    if(userInfo){
        navigate(redirect);
    }
}, [navigate, redirect, userInfo]);

const {mutateAsync: signup, isLoading}=useSignupMutation();

const submitHandler=async(e: React.SyntheticEvent)=>{
    e.preventDefault();
    if(password !== confirmPassword){
        toast.error("Password do not match");
        return;   //return here means that the function will stop executing here
    }
    try{
        const data=await signup({    //signup is the function that we have created above in useSignupMutation
            name,
            email,
            password
        });
        dispatch({type: 'USER_SIGNIN', payload: data});  //because we have to directly sign in the user after signing up
        localStorage.setItem('userInfo', JSON.stringify(data));
        navigate(redirect || '/');
    }catch(err){
        toast.error(getError(err as ApiError));
    }
} 
return(
    <Container className="small-container">
        <Helmet>
            <title>Sign Up</title>
        </Helmet>
        <h1 className="my-3">Sign Up</h1>
       <Form onSubmit={submitHandler}>
         <Form.Group className="my-3" controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control
                type="text"
                placeholder="Enter name"
                required
                onChange={(e) => setName(e.target.value)}/> 
        </Form.Group> 

         <Form.Group className="my-3" controlId="name">
            <Form.Label>Email</Form.Label>
            <Form.Control
                type="email"
                placeholder="Enter Email"
                required
                onChange={(e) => setEmail(e.target.value)}/> 
        </Form.Group> 
            
             <Form.Group className="my-3" controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control
                    type="password"
                    placeholder="Enter Password"
                    required
                    onChange={(e) => setPassword(e.target.value)}/>
            </Form.Group>

            <Form.Group className="my-3" controlId="confirmPassword">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                    type="password"
                    placeholder="Confirm Password"
                    required
                    onChange={(e) => setConfirmPassword(e.target.value)}/>
            </Form.Group>

            <div className="mb-3">
                <Button type="submit">
                    Sign Up
                </Button>
            </div>

            <div className="mb-3">
                Already have an account? {' '}
                <Link to={`/signin?redirect=${redirect}`}>Sign In</Link>
            </div>
       </Form> 
    </Container>
)
    
};
