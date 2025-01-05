import { useLocation, useNavigate, Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { useSigninMutation } from "../../hooks/userHooks";
import { ApiError } from "../../types/ApiError";
import { Store } from "../../Store";
import { toast } from "react-toastify";
import { getError } from "../../utils/utils";
import { Button, Container , Form} from "react-bootstrap";
import { Helmet } from "react-helmet-async";
import LoadingBox from "../../component/loadingBox/LoadingBox";



export default function SigninPage() {
    const navigate = useNavigate();

    const {search} = useLocation();
    const redirectInUrl = new URLSearchParams(search).get("redirect");
    const redirect = redirectInUrl ? redirectInUrl : "/";

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const {state, dispatch}= useContext(Store);
    const {userInfo} = state;

    const {mutateAsync: signin, isLoading}= useSigninMutation()
    //o	mutateAsync is renamed to signin and when we call it mutationFn is called.

    const submitHandler = async (e: React.SyntheticEvent) => {
        e.preventDefault();
        try {
            const data = await signin({
                email,
                password
            });
            dispatch({type: 'USER_SIGNIN', payload: data});
            localStorage.setItem('userInfo', JSON.stringify(data));
            navigate(redirect);
        } catch (err) {
            toast.error(getError(err as ApiError))
        }
    }
    useEffect(()=>{
        if(userInfo){
            navigate(redirect);
        }
    }, [navigate, redirect, userInfo])

    return(
        <Container className="small-container">
            <Helmet>
                <title>Sign In</title>
            </Helmet>
            <h1 className="my-3">Sign In</h1>
            <Form onSubmit={submitHandler}>
                <Form.Group className="my-3" controlId="email">
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control
                        type="email"
                        placeholder="Enter email"
                        required
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </Form.Group>
                <Form.Group className="my-3" controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Enter password"
                        required
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </Form.Group>
                <div className="mb-3">
                    <Button type="submit" disabled={isLoading}>
                        Sign In
                    </Button>
                    {isLoading && <LoadingBox/> }
                </div>
                <div className="mb-3">
                    New Customer ? {' '}
                    <Link to={`/signup?redirect=${redirect}`}>Create your account</Link>
                </div>
            </Form>
        </Container>
    )
    }


