import { useMutation } from "@tanstack/react-query";
import apiClient from "../apiClient";
import { User } from "../types/User";


export const useSigninMutation = () =>   
    useMutation({   
        mutationFn: async ({ 
            email, 
            password  
        }:{
            email: string;
            password: string;
        }) => (await apiClient.post <User>("/api/users/signin", { 
            email, 
            password 
        })
    ).data,
    });


    export const useSignupMutation = () =>   
    useMutation({   
        mutationFn: async ({ 
            name,
            email, 
            password  
        }:{
            name: string;
            email: string;
            password: string;
        }) => (await apiClient.post <User>("/api/users/signup", { 
            name,
            email, 
            password 
        })
    ).data,
    });






