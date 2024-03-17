import { SyntheticEvent } from 'react';
import { AuthField } from '../utils/types';
import { Link } from 'react-router-dom';

interface AuthFormProps {
  formType: string;
  fields: AuthField[];
  handleSubmit: (e: SyntheticEvent) => void;
}

const AuthForm = ({ formType, fields, handleSubmit }: AuthFormProps) => {
  const btnText = formType === 'login' ? 'Log In' : 'Sign Up';
  const linkText =
    formType === 'login'
      ? "Don't have an account?"
      : 'Already have an account?';
  const linkPath = formType === 'login' ? '/register' : '/login';
  return (
    <form onSubmit={handleSubmit}>
      {fields.map((field, index) => (
        <div key={index}>
          <label>{field.label}</label>
          <input
            type={field.inputType}
            value={field.value}
            onChange={({ target }) => field.setValue(target.value)}
          />
        </div>
      ))}
      <button type="submit">{btnText}</button>
      <p>
        {linkText} <Link to={linkPath}>{btnText}</Link>
      </p>
    </form>
  );
};

export default AuthForm;
