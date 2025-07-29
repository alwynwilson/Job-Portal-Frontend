import RegisterForm from "../components/auth/RegisterForm"
import { Link } from 'react-router-dom';

const Register = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-12">
      <div className="w-full max-w-md space-y-8 bg-white p-8 rounded-lg shadow-lg">
        <div>
          <h2 className="text-center text-3xl font-bold text-gray-800">Create your account</h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Already registered?{' '}
            <Link
              to="/login"
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              Login here
            </Link>
          </p>
        </div>
        <RegisterForm />
      </div>
    </div>
  )
}

export default Register
