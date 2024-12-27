import {Formik, Form, Field, FormikProps} from 'formik';
import * as Yup from 'yup';
import styled from 'styled-components';
import { firebaseSignIn } from '@/firebase/AuthService';
import { LoginFormValues, FirebaseError } from '@/types';

const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
})

const StyledForm = styled(Form)`
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin: 0 auto;
  padding: 20px;
`;

const StyledField = styled(Field)`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
`;

const StyledError = styled.div`
  color: red;
  font-size: 14px;
  margin-top: 5px;
`;

const SubmitButton = styled.button`
  padding: 10px 20px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;

  &:disabled {
    background-color: #ccc;
  }
`;

const RegisterLink = styled.a`
  padding: 10px 20px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  text-decoration: none;
`;

const LoginForm = () => {
    const initalValues: LoginFormValues = {
        email: '',
        password: '',
    }

    const handleSubmit = async (values: LoginFormValues, { setSubmitting, setErrors }: { setSubmitting: (isSubmitting: boolean) => void; setErrors: (errors: { submit?: string }) => void;}) => {
        try {
            await firebaseSignIn({
                email: values.email,
                password: values.password
            });

        } catch (error) {
            if (error && typeof error === 'object' && 'message' in error) {
                setErrors({ submit: (error as FirebaseError).message });
              } else {
                setErrors({ submit: 'An unknown error occurred' });
              }
          } finally {
            setSubmitting(false);
          }
    }

    return (
        <Formik
            initialValues={initalValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
        >
            {({errors, touched, isSubmitting}: FormikProps<LoginFormValues>) => (
                <StyledForm>
                    <div>
                        <StyledField type="email" name="email" placeholder="Email" />
                        {errors.email && touched.email && (<StyledError>{errors.email}</StyledError>)}
                    </div>
                    <div>
                        <StyledField type="password" name="password" placeholder="Password" />
                        {errors.password && touched.password && (<StyledError>{errors.password}</StyledError>)}
                    </div>
                    {(errors as {submit?: string}).submit && (<StyledError>{(errors as {submit?: string}).submit}</StyledError>)}
                    <SubmitButton type="submit" disabled={isSubmitting}>
                        {isSubmitting ? 'Logining in...' : 'Login'}
                    </SubmitButton>
                    <RegisterLink href="/register">Register</RegisterLink>
                </StyledForm>
            )}

        </Formik>
    )
}

export default LoginForm