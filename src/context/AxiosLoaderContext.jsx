import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AxiosLoaderContext = createContext();

export const useAxiosLoader = () => useContext(AxiosLoaderContext);

export const AxiosLoaderProvider = ({ children }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [requestCount, setRequestCount] = useState(0);
    const [isReady, setIsReady] = useState(false);

    useEffect(() => {
        const reqInterceptor = axios.interceptors.request.use(
            (config) => {
                // Skip global loader if explicitly requested
                if (config.skipGlobalLoader) {
                    return config;
                }
                
                // You can add logic here to ignore specific URLs if needed
                // if (!config.url.includes('/background-task')) ...
                setIsLoading(true);
                setRequestCount(prev => prev + 1);
                return config;
            },
            (error) => {
                // If the request had skipGlobalLoader, we shouldn't have incremented count, so don't decrement
                // But error.config might be undefined depending on where the error occurred
                if (error.config && error.config.skipGlobalLoader) {
                    return Promise.reject(error);
                }

                setIsLoading(false);
                setRequestCount(prev => Math.max(0, prev - 1));
                return Promise.reject(error);
            }
        );

        const resInterceptor = axios.interceptors.response.use(
            (response) => {
                // Skip global loader logic if explicitly requested
                if (response.config && response.config.skipGlobalLoader) {
                    return response;
                }

                setRequestCount(prev => {
                    const newCount = Math.max(0, prev - 1);
                    if (newCount === 0) setIsLoading(false);
                    return newCount;
                });
                return response;
            },
            (error) => {
                // Skip global loader logic if explicitly requested
                if (error.config && error.config.skipGlobalLoader) {
                    return Promise.reject(error);
                }

                setRequestCount(prev => {
                    const newCount = Math.max(0, prev - 1);
                    if (newCount === 0) setIsLoading(false);
                    return newCount;
                });
                return Promise.reject(error);
            }
        );

        setIsReady(true);

        return () => {
            axios.interceptors.request.eject(reqInterceptor);
            axios.interceptors.response.eject(resInterceptor);
        };
    }, []);

    // Force safety check: if loading gets stuck for more than 10 seconds, reset it
    useEffect(() => {
        let timeout;
        if (isLoading) {
            timeout = setTimeout(() => {
                if (requestCount > 0) {
                    console.warn('Global loader timed out (forced reset)');
                    setRequestCount(0);
                    setIsLoading(false);
                }
            }, 10000); // 10 seconds timeout
        }
        return () => clearTimeout(timeout);
    }, [isLoading, requestCount]);

    return (
        <AxiosLoaderContext.Provider value={{ isLoading }}>
            {isReady ? children : null}
        </AxiosLoaderContext.Provider>
    );
};
