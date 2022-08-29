/* eslint-disable */
import React, { useEffect } from "react";
/* eslint-enable */
import axios from "axios";
import { useNavigate } from "react-router-dom";



const AxiosIntercept = ({ children }) => {
    const navigate = useNavigate();

    const resInterceptorRes = (response) => {
        return response;
    }
    const errInterceptorRes = (error) => {
        if(error.response.status === 401) {
            navigate('/Login');
        }
        return Promise.reject(error);
    };
    const interceptorRes = axios.interceptors.response.use(resInterceptorRes, errInterceptorRes);

    const reqInterceptorReq = (request) => {
        
        request.headers = {
            authorization: `Bearer ${localStorage.getItem('token')}`,
        };
        return request;
    };

    const errInterceptorReq = (error) => {
        return Promise.reject(error);
    };

    const interceptorReq = axios.interceptors.request.use(reqInterceptorReq, errInterceptorReq)
/* eslint-disable */
    useEffect(() => {
        return () => {
            axios.interceptors.response.eject(interceptorRes);
            axios.interceptors.request.eject(interceptorReq);
        }
    }, [])

    return children;
/* eslint-enable */

    
};

export default AxiosIntercept;