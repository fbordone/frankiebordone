import picturefill from 'picturefill';

export default {
  init() {
    // JavaScript to be fired on all pages
    // feature detect for IE11
    if (!!window.MSInputMethodContext && !!document.documentMode) {
      document.body.classList.add('ie11');
    }

    // only add outline focus for keyboard/tab users
    window.addEventListener('keydown', handleFirstTab);

    // force picturefill to analyze every image
    picturefill();
  },
  finalize() {
    // JavaScript to be fired on all pages, after page specific JS is fired
  },
};

/**
 * Adds a body class for styling focus elements (specific to keyboard users)
 * @param  {Object}   e   event object
 * @return void
 */
function handleFirstTab(e) {
  if (e.keyCode === 9) { // the "I am a keyboard user" key
    document.body.classList.add('user-is-tabbing');
    window.removeEventListener('keydown', handleFirstTab);
  }
}
