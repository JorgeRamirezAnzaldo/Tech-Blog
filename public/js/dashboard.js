const creationForms = document.getElementsByClassName("creationforms"); //Getting form elements with certain class name

//Handler when submitting the forms for post creation
const creationFormHandler = async (event) => { 
    event.preventDefault();
    if (event.target.matches("#form-buttoncreate")){ //If the submit was done in the button to display the post creation form
        const response = await fetch('/dashboard/creation', { //Fetch /dashboard/creation route with GET to render post creation screen
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        });
        if (response.ok) { //If response was ok
            document.location.replace(`/dashboard/creation`); //Go to the page for the post creation
        } else { //if the response was not ok
            alert('Failed to start post creation'); //Display alert
        }
    } else if (event.target.matches("#form-postcreation")){ //If the submit was done in the button to create a post with data
        const newPostTitle = document.getElementById("posttitle-input").value; //Get the post title introduced by user
        const newPostContent = document.getElementById("postcontent-input").value; //Get the post content introduced by user
        const newPostDate = new Date(); //Create a date objet for the new post
        const response = await fetch('/dashboard', { //Fetch /dashboard route with POST to create a new post
            method: 'POST',
            body: JSON.stringify({  //Send data for post creation
                title: newPostTitle,
                content: newPostContent,
                creation_date: newPostDate,
            }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) { //If response was ok
            document.location.replace(`/dashboard`); //Go to the dashboard
        } else { //if the response was not ok
            alert('Failed to create post'); //Display alert
        }
    }
};

//Add event listeners for the submit in the forms
for (let i = 0; i < creationForms.length; i++){
    creationForms[i].addEventListener("submit", creationFormHandler);
};
