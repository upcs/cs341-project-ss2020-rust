/**
 * logout.js
 * @author Geryl Vinoya, Kama Simon, Pele Kamala, Mikey Antkiewicz
 * @version 25April2020
 */

 /**
  * @desc logging out of account 
  */
function logout() {
    localStorage.removeItem('username');
    window.location.href = "index.html";
    return true;
}

module.exports = {logout}; 