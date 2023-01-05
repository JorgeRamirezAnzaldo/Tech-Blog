const loginForm = document.querySelector("#login-form"); //Get the login form by its id
const link = document.getElementById("link"); //Get the link element by its id
const button = document.getElementById("formbutton"); //Get the button element by its id
const title = document.getElementById("title"); //Get the title element by its id

//Handler when clicking in the Login Form
const FormHandler = async (event) => {
    event.preventDefault();
    if (event.target.matches("#link")){ //Verify if the click was done in the link
        let linktext = link.innerText; //Get the text of the link
        if (linktext == "Sign up instead"){ //If the text of the link is equal to Sign up instead
            link.innerText = "Log in instead"; //Change the text of the link to Log in instead
            button.innerText = "Sign Up!"; //Change the text of the button to Sign up
            title.innerText = "Sign Up"; //Change the text of the title to Sign up
        } else if (linktext == "Log in instead"){ //If the text of the link is equal to Log in instead
            link.innerText = "Sign up instead"; //Change the text of the link to Sign up instead
            button.innerText = "Log In!"; //Change the text of the button to Log in
            title.innerText = "Log In"; //Change the text of the title to Log in
        }
    } else if (event.target.matches("#formbutton")){ //Verify if the click was done in the submit button
        event.preventDefault();
        let titletext = title.innerText; //Get the text of the title
        const username = document.querySelector('#user-input').value.trim(); //Get the value of the user input element
        const password = document.querySelector('#password-input').value.trim(); //Get the value of the password input element
        if (titletext == "Log In"){ //If the text of the title is equal to Log in
            if (username && password){ //Verify if username and password were provided
                const responselogin = await fetch('/api/users/login', { //Fetch route /api/users/login with POST to log in to the application
                    method: 'POST',
                    body: JSON.stringify({ username, password }), //Send username and password
                    headers: { 'Content-Type': 'application/json' },
                });
            
                if (responselogin.ok) { //If response was ok
                    document.location.replace('/dashboard'); //Replace the document location with dashboard
                } else { //If response was not ok
                    alert('Failed to log in.'); //Display an alert when the log in failed
                }
            }
        } else if (titletext == "Sign Up"){ //If the text of the title is equal to Sign up
            if (username && password){ //Verify if username and password were provided
                const responsesignup = await fetch('/api/users', { //Fetch route /api/users with POST to create user in database
                    method: 'POST',
                    body: JSON.stringify({ username, password }), //Send username and password
                    headers: { 'Content-Type': 'application/json' },
                });
            
                if (responsesignup.ok) { //If response was ok
                    document.location.replace('/dashboard'); //Replace the document location with dashboard
                } else { //If response was not ok
                    alert('Failed to sign up.'); //Display an alert when the sign up failed
                }
            }
        }
    }
}

loginForm.addEventListener('click', FormHandler); //Create event listener for a click in the Login Form
