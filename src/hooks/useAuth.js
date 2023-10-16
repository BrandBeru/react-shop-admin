import React, { useState, useContext, createContext, useEffect } from 'react';
import endPoints from '@services/api';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import useAlert from './useAlert';

const AuthContext = createContext();

export default function ProviderAuth({ children }) {
  const auth = useProviderAuth();
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  return useContext(AuthContext);
};

function useProviderAuth() {
  const [user, setUser] = useState({});

  const [products, setProducts] = useState([]);
  const { alert, setAlert, toggleAlert } = useAlert();
  const router = useRouter();
  const token = Cookies.get('token');

  useEffect(() => {
    if (!token) {
      router.push('/login');
    }
    async function getProducts() {
      const response = await axios.get(endPoints.products.getAllProducts);
      setProducts(response.data);
    }
    try {
      getProducts();
    } catch (error) {
      console.log(error);
    }
  }, [alert]);

  const signIn = async (email, password) => {
    const options = {
      Headers: {
        accept: '*/*',
        'Content-Type': 'application/json',
      },
    };
    const { data: access_token } = await axios.post(endPoints.auth.login, { email, password }, options);
    if (access_token) {
      const token = access_token.access_token;
      Cookies.set('token', token, { expires: 5 });

      axios.defaults.headers.Authorization = `Bearer ${token}`;
      const { data: user1 } = await axios.get(endPoints.auth.profile);
      setUser(user1);
    }
  };

  const logout = () => {
    Cookies.remove('token');
    setUser(null);
    delete axios.defaults.headers.Authorization;

    window.location.href = '/login';
  };

  return {
    user,
    signIn,
    logout,
    token,
    products,
    setAlert,
    toggleAlert,
  };
}
