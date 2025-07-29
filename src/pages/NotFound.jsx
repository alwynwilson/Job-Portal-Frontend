import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 text-gray-800 px-4">
      <h1 className="text-9xl font-bold text-indigo-600">404</h1>
      <h2 className="text-3xl md:text-4xl font-semibold mt-4">Page Not Found</h2>
      <p className="mt-2 text-lg text-gray-600 text-center max-w-md">
        Sorry, the page you are looking for does not exist or has been moved.
      </p>
      <Link
        to="/"
        className="mt-6 inline-block px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition duration-300"
      >
        Go Home
      </Link>
    </div>
  )
}

export default NotFound
