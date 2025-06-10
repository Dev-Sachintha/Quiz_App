import React from 'react';

/**
 * Header Component
 *
 * This is a simple, presentational component that displays the main title
 * of the application. It uses a semantic <header> tag for better
 * accessibility and SEO.
 *
 * The className 'header' links this component to the styles defined
 * in the main App.css file.
 */
function Header() {
  return (
    <header className='header'>
      <h1>The #HACKWAVE Quiz</h1>
    </header>
  );
}

export default Header;