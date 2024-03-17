import { SyntheticEvent, useState } from 'react';
import AuthForm from '../components/AuthForm';

interface RegisterPageProps {
  handleRegister: (
    username: string,
    password: string,
    confirmation: string
  ) => void;
}

const RegisterPage = ({ handleRegister }: RegisterPageProps) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmation, setConfirmation] = useState('');

  const handleRegisterSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    handleRegister(username, password, confirmation);
  };

  const fields = [
    {
      label: 'Username',
      inputType: 'text',
      value: username,
      setValue: setUsername,
    },
    {
      label: 'Password',
      inputType: 'password',
      value: password,
      setValue: setPassword,
    },
    {
      label: 'Confirm Password',
      inputType: 'password',
      value: confirmation,
      setValue: setConfirmation,
    },
  ];

  return (
    <div className="page register-page">
      <h2>Register</h2>
      <AuthForm
        formType="register"
        fields={fields}
        handleSubmit={handleRegisterSubmit}
      />
    </div>
  );
};

export default RegisterPage;
