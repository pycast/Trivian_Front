function Nav() {
  return (
    <>
      <div className='navbar'>
        <div id="titre" className='flex-1'>
          
          <a href='/'><img id="logo" src="/logo_trivian.png" width="120" height="75"/></a>
          <a href='/'><h1 id="trivian">Trivian</h1></a>
          
        </div>
        <div className='flex-none'>
          <ul className='menu menu-horizontal px-1'>
            <li>
              <a href='/login'>Se connecter</a>
            </li>
            <li>
              <a href='/register'>Créer un compte</a>
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
