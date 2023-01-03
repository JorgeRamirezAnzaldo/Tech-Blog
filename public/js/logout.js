//Function to perform logout from application
const logout = async () => {
    const responselogout = await fetch('/api/users/logout', { //Fetch route /api/users/logout to perform logout with POST
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    });
  
    if (responselogout.ok) { //If response was ok
      document.location.replace('/'); //Change document location to home
    } else { //If response was not ok
      alert('Failed to log out.'); //Send an alert with failure message
    }
  };
  
  document.querySelector('#logout').addEventListener('click', logout); //Determine an event listener for the Logout link the in the navigation bar