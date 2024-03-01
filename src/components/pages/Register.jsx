import { httpClient } from "../service/http.client.js";
import { useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();
  return (
    <>
      <div className='w-1/2 p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700'>
        <form
          className='space-y-6 flex flex-col'
          onSubmit={(e) => {
            e.preventDefault();
            httpClient.api
              .post(
                "auth/register",
                Object.fromEntries(new FormData(e.target).entries())
              )
              .then(() => navigate("/login"));
          }}
        >
          <h5 className='text-xl font-medium text-gray-900 dark:text-white'>
            Créer un compte
          </h5>
          <div className='mb-6'>
            <label
              htmlFor='username'
              className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
            >
              Nom d'utilisateur
            </label>
            <input
              type='username'
              id='username'
              name='username'
              className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
              placeholder="Nom d'utilisateur"
              required
            />
          </div>
          <div className='mb-6'>
            <label
              htmlFor='email'
              className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
            >
              Email
            </label>
            <input
              type='email'
              id='email'
              name='email'
              className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
              placeholder='Utilisateur@trivian.cool'
              required
            />
          </div>
          <div className='mb-6'>
            <label
              htmlFor='password'
              className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
            >
              Mot de passe
            </label>
            <input
              type='password'
              id='password'
              name='password'
              className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
              placeholder='•••••••••'
              required
            />
          </div>
          <button
            type='submit'
            className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
          >
            Connexion
          </button>
        </form>
      </div>
    </>
  );
}

export default Register;
