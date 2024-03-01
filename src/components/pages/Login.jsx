import { httpClient } from "../service/http.client.js";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  return (
    <>
      <div className='w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700'>
        <form
          className='space-y-6'
          onSubmit={(e) => {
            e.preventDefault();
            httpClient
              .authenticate(
                "auth/authenticate",
                Object.fromEntries(new FormData(e.target).entries())
              )
              .then(() => navigate("/"));
          }}
        >
          <h5 className='text-xl font-medium text-gray-900 dark:text-white'>
            Me connecter
          </h5>
          <div>
            <label
              htmlFor='email'
              className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
            >
              Votre email
            </label>
            <input
              type='email'
              name='email'
              id='email'
              className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white'
              placeholder='Utilisateur@Trivian.cool'
              required
            />
          </div>
          <div>
            <label
              htmlFor='password'
              className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
            >
              Votre mot de passe
            </label>
            <input
              type='password'
              name='password'
              id='password'
              placeholder='••••••••'
              className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white'
              required
            />
          </div>
          <div className='flex items-start'>
            <div className='flex items-start'>
              <div className='flex items-center h-5'>
                <input
                  id='remember'
                  type='checkbox'
                  name='remember'
                  onChange={(e) => (e.target.value = e.target.checked)}
                  className='w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800'
                />
              </div>
              <label
                htmlFor='remember'
                className='ms-2 text-sm font-medium text-gray-900 dark:text-gray-300'
              >
                Remember me
              </label>
            </div>
          </div>
          <button
            type='submit'
            className='w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
          >
            Me connecter
          </button>
          <div className='text-sm font-medium text-gray-500 dark:text-gray-300'>
            Pas de compte? 
            <Link
              to='/register'
              className='text-blue-700 hover:underline dark:text-blue-500'
            >
              Créer un compte
            </Link>
          </div>
        </form>
      </div>
    </>
  );
}

export default Login;
