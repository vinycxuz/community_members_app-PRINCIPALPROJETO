import React from 'react';

const NavBar = () => {
  return (
    <nav>
      <ul>
        <li>
          <a href="/">Home</a>
        </li>
        <li>
          <a href="/create-post">Create Post</a>
        </li>
        <li>
          <a href="/list-post">List Posts</a>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;