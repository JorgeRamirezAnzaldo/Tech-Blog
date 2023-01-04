const modifyPostForm = document.getElementById("form-postupdate"); //Get the form for the post update using the id

//Handler when pressing the buttons in the modify form
const modifyPostHandler = async (event) => { 
    event.preventDefault(); 
    const index = event.target.dataset.index; //Get the index of the button to know which is the post id
    const modifyPostId = index; //Make the index to be the post id
    if (event.target.matches("#updatebtn")){
        const modifyPostTitle = document.getElementById("updatetitle-input").value; //Get the text introduced in the input for new title
        const modifyPostContent = document.getElementById("updatecontent-input").value; //Get the text introduced in the text area for new content
        const response = await fetch(`/dashboard/${modifyPostId}`, { //Fetch /dashboad/:id route with PUT to update a post
            method: 'PUT',
            body: JSON.stringify({  //Send data for post update
                title: modifyPostTitle,
                content: modifyPostContent,
            }),
            headers: { 'Content-Type': 'application/json' },
        });
    
        if (response.ok) { //If response was ok
            document.location.replace(`/dashboard`); //Go to the dashboard
        } else { //if the response was not ok
            alert('Failed to update post'); //Display alert
        }
    
    } else if (event.target.matches("#deletebtn")){
        const response = await fetch(`/dashboard/${modifyPostId}`, { //Fetch /dashboad/:id route with DELETE to delete a post
            method: 'DELETE',
            body: JSON.stringify({}),
            headers: { 'Content-Type': 'application/json' },
        });
    
        if (response.ok) { //If response was ok
            document.location.replace(`/dashboard`); //Go to the dashboard
        } else { //if the response was not ok
            alert('Failed to delete alert'); //Display alert
        }

    }
}

modifyPostForm.addEventListener("click", modifyPostHandler); //Define Event Listener for the clicks in the form