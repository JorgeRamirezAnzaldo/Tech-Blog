const addCommentForm = document.getElementById("form-comment"); //Get the form for the comment creation using the id

//Handler when submitting the form for comment creation
const addCommentHandler = async (event) => { 
    event.preventDefault(); 
    const index = event.target.dataset.index; //Get the index of the form to know which is the post id
    const newCommentPostId = index; //Make the index to be the post id
    const newCommentContent  = document.getElementById("comment-input").value; //Get the text introduced in the text area
    const newCommentDate = new Date(); //Create a new date object
    const response = await fetch('/comment', { //Fetch /comment route with POST to create a new comment
        method: 'POST',
        body: JSON.stringify({  //Send data for comment creation
            content: newCommentContent,
            post_id: newCommentPostId,
            creation_date: newCommentDate,
        }),
        headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) { //If response was ok
        document.location.replace(`/post/${index}`); //Go to the page for the post id with all the comments
    } else { //if the response was not ok
        alert('Failed to create comment'); //Display alert
    }
}

addCommentForm.addEventListener("submit", addCommentHandler); //Define Event Listener for the submit button in the form