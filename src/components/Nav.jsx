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
              <a href='/login'>Compte</a>
            </li>

            <li>
              <a href='/quiz/all'>Les Quiz!</a>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}

export default Nav;
