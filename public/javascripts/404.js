/**
 * 404.js
 * @author Geryl Vinoya, Kama Simon, Pele Kamala, Mikey Antkiewicz
 * @version 02April2020
 */

/**
 * @desc reverts page back to previous page
 */
function goBack() {
    window.history.back();
    return true;
  }
module.exports = {goBack}; 
  // end of 404.js