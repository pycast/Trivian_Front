function Nav() {
  return (
    <>
      <div className='navbar bg-base-100'>
        <div className='flex-1'>
          <a href='/'>Trivian</a>
        </div>
        <div className='flex-none'>
          <ul className='menu menu-horizontal px-1'>
            <li>
              <a href="/login">Compte</a>
            </li>
            <li>
              <details>
                <summary>Les Quiz</summary>
                <ul className='p-2 bg-base-100 rounded-t-none'>
                  <li>
                    <a href="/newquiz">Nouveau Quiz!</a>
                    <a href="/allquiz">Tous les Quiz!</a>

                  </li>
                </ul>
              </details>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}

export default Nav;
