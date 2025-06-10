import React from 'react';

/**
 * Loader Component
 *
 * Displays a loading message and a simple visual indicator.
 * It's shown conditionally when the application's state is 'loading',
 * for example, while fetching quiz questions from an API.
 *
 * The styling for this component is defined in `App.css` under the
 * `.loader-container` class, which typically centers the content.
 */
function Loader() {
  return (
    <div className="loader-container">
      <p>Loading questions...</p>
      {/* You could also add a CSS spinner here for a more dynamic look */}
    </div>
  );
}

export default Loader;