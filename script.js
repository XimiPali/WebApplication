const rootDiv = document.getElementById('root');

function renderSignUp(){

    rootDiv.innerHTML=`
    
   <h1>Sign Up</h1>
    <form id="signupForm">
            <label for="name">Name:</label>
            <input type="text" id="name" placeholder="Enter your name"><br>
            <label for="email">Email:</label>
            <input type="email" id="email" placeholder="Enter your email"><br>
            <label for="password">Password:</label>
            <input type="password" id="password" placeholder="Enter your password"><br>
            <button type="button" onclick="handleSignUp()">Sign Up</button>
    </form>
    
    `;
    let userName ="";

    function handleSignUp(){
        const nameInput = document.getElementById('name').value;
    const emailInput = document.getElementById('email').value;
    const passwordInput = document.getElementById('password').value;
    if (nameInput && emailInput && passwordInput) {
        userName = nameInput; // Store the user's name in a global variable
        renderHomePage();     // Move to the next step in the app
    } else {
        alert('Please fill out all fields');
        }
    }

}


function renderHomePage() {
    rootDiv.innerHTML = `
        <h1>Welcome, ${userName}!</h1>
        <h2>Create a Post</h2>
        <textarea id="postContent" placeholder="What's on your mind?"></textarea><br>
        <button type="button" onclick="handleCreatePost()">Post</button>
        <h3>Your Posts</h3>
        <ul id="postList"></ul>
    `;
}


let posts = [];
function handleCreatePost() {
    const postContent = document.getElementById('postContent').value;
    
    if (postContent) {
        posts.push(postContent); // Add the new post to the posts array
        renderPostList();        // Update the displayed post list
    } else {
        alert('Post content cannot be empty');
    }
}
function renderPostList() {
    const postListElement = document.getElementById('postList');
    postListElement.innerHTML = ''; // Clear the current list
    posts.forEach((post, index) => {
        const postItem = document.createElement('li');
        const postContent = document.createElement('span');
        postContent.textContent = post;
        
        // Create edit and delete buttons
        const editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.classList.add('edit-button');
        editButton.onclick = () => handleEditPost(index);

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.classList.add('delete-button');
        deleteButton.onclick = () => handleDeletePost(index);

        postItem.appendChild(postContent);
        postItem.appendChild(editButton);
        postItem.appendChild(deleteButton);
        postListElement.appendChild(postItem);
    });
}

function handleEditPost(index) {
    const newContent = prompt('Edit your post:', posts[index]);
    if (newContent) {
        posts[index] = newContent;
        renderPostList();
        savePostsToLocalStorage(); // Save changes to local storage
    }
}

function handleDeletePost(index) {
    if (confirm('Are you sure you want to delete this post?')) {
        posts.splice(index, 1);
        renderPostList();
        savePostsToLocalStorage(); // Save changes to local storage
    }
}
renderSignUp();