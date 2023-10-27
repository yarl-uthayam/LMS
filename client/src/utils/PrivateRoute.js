import React from 'react';
import { Navigate} from 'react-router-dom';
import { ACCESS_TOKEN, USER } from './config';
import { parseJwt } from './jwt';
const adminRoutes = ["users","users/:id"]
export const PrivateRoute = ({
        redirectPath = '/',
        children,
        path
      }) => {
        const token = localStorage.getItem(ACCESS_TOKEN)
        if (!token) {
                return <Navigate to={redirectPath} replace />;
        }else{
                const {userId,role} =parseJwt(token)
                if(adminRoutes.includes(path) && role===USER){
                        return <Navigate to={"/dashboard"} replace />;
                }
               
        }
      
        return children;
};