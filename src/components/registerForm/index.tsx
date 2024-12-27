import {Formik, Form, Field, FormikProps} from 'formik';
import * as Yup from 'yup';
import styled from 'styled-components';
import { firebaseSignUp } from '@/firebase/AuthService';
import { RegisterFormValues, FirebaseError } from '@/types';
const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
    confirmPassword: Yup.string().oneOf([Yup.ref('password')], 'Passwords must match').required('Confirm password is required'),
})

const StyledForm = styled(Form)`
  display: flex;
  flex-direction: column;
  gap: 20px;
  max-width: 400px;
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

const RegisterForm = () => {
    const initalValues: RegisterFormValues = {
        email: '',
        password: '',
        confirmPassword: ''
    }

    const handleSubmit = async (values: RegisterFormValues, { setSubmitting, setErrors }: { setSubmitting: (isSubmitting: boolean) => void; setErrors: (errors: { submit?: string }) => void;}) => {
        try {
            await firebaseSignUp({
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
            {({errors, touched, isSubmitting}: FormikProps<RegisterFormValues>) => (
                <StyledForm>
                    <div>
                        <StyledField type="email" name="email" placeholder="Email" />
                        {errors.email && touched.email && (<StyledError>{errors.email}</StyledError>)}
                    </div>
                    <div>
                        <StyledField type="password" name="password" placeholder="Password" />
                        {errors.password && touched.password && (<StyledError>{errors.password}</StyledError>)}
                    </div>
                    <div>
                        <StyledField type="password" name="confirmPassword" placeholder="Confirm Password" />
                        {errors.confirmPassword && touched.confirmPassword && (<StyledError>{errors.confirmPassword}</StyledError>)}
                    </div>
                    {(errors as {submit?: string}).submit && (<StyledError>{(errors as {submit?: string}).submit}</StyledError>)}
                    <SubmitButton type="submit" disabled={isSubmitting}>
                        {isSubmitting ? 'Registering...' : 'Register'}
                    </SubmitButton>
                </StyledForm>
            )}
        </Formik>
    )
}

export default RegisterForm