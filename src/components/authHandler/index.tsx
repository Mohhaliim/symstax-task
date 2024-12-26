import { useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';

import { setLoading, setUser } from '@/store/slices/authSlice';
import { firebaseAuth } from '@/firebase/BaseConfig';

const AuthStateHandler = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    dispatch(setLoading(true));

    const unsubscribe = onAuthStateChanged(firebaseAuth, (user) => {
      if (user) {
        dispatch(
          setUser({
            uid: user.uid,
            email: user.email!,
          })
        );

        if (['/login', '/register'].includes(location.pathname)) {
          navigate('/');
        }
      } else {
        dispatch(setUser(null));
        if (!['/login', '/register'].includes(location.pathname)) {
          navigate('/login');
        }
      }
      dispatch(setLoading(false));
    });

    return () => unsubscribe();
  }, [dispatch, navigate]);

  return null;
};

export default AuthStateHandler;
