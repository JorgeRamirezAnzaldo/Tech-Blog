const loginForm = document.querySelector("#login-form");
const link = document.getElementById("link");
const button = document.getElementById("formbutton");
const title = document.getElementById("title");

const FormHandler = async (event) => {
    event.preventDefault();
    if (event.target.matches("#link")){
        let linktext = link.innerText;
        if (linktext == "Sign up instead"){
            link.innerText = "Log in instead";
            button.innerText = "Sign Up!";
            title.innerText = "Sign Up";
        } else if (linktext == "Log in instead"){
            link.innerText = "Sign up instead";
            button.innerText = "Log In!";
            title.innerText = "Log In";
        }
    } else if (event.target.matches("#formbutton")){
        console.log("Submit");
        event.preventDefault();
        let titletext = title.innerText;
        const username = document.querySelector('#user-input').value.trim();
        const password = document.querySelector('#password-input').value.trim();
        console.log(username);
        console.log(password);
        if (titletext == "Log In"){
            console.log("Log In");
            if (username && password){
                const responselogin = await fetch('/api/users/login', {
                    method: 'POST',
                    body: JSON.stringify({ username, password }),
                    headers: { 'Content-Type': 'application/json' },
                });
            
                if (responselogin.ok) {
                    document.location.replace('/');
                } else {
                    alert('Failed to log in.');
                }
            }
        } else if (titletext == "Sign Up"){
            console.log("Sign Up");
            if (username && password){
                const responsesignup = await fetch('/api/users', {
                    method: 'POST',
                    body: JSON.stringify({ username, password }),
                    headers: { 'Content-Type': 'application/json' },
                });
            
                if (responsesignup.ok) {
                    document.location.replace('/');
                } else {
                    alert('Failed to sign up.');
                }
            }
        }
    }
}

loginForm.addEventListener('click', FormHandler);
