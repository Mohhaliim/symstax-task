export type FormValues = {
  email: string;
  password: string;
};

export type RegisterFormValues = {
  email: string;
  password: string;
  confirmPassword: string;
};

export type FirebaseError = {
  code: string;
  message: string;
};

export type LoginFormValues = {
  email: string;
  password: string;
};

export type UserState = {
  uid: string;
  email: string;
};

export type AuthState = {
  loading: boolean;
  user: UserState | null;
};

export type RootState = {
  auth: AuthState;
  employees: EmployeeState;
};

export type Employee = {
  id: string;
  name: string;
  department: string;
  role: string;
  email: string;
  phone: string;
};

export type EmployeeState = {
  employees: Employee[];
  loading: boolean;
  totalCount: number;
  error: string | null;
};
