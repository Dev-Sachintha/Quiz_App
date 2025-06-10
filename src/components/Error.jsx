import React from 'react';

/**
 * Error Component
 *
 * Displays a user-friendly error message. It's shown conditionally when the
 * application's state is 'error', which is typically triggered by a failed
 * API call.
 *
 * The emoji (💥) provides a quick visual cue that something is wrong.
 * The styling is handled by the `.error` class in `App.css`.
 */
function Error() {
  return (
    <p className="error">
      <span>💥</span> There was an error fetching questions.
    </p>
  );
}

export default Error;