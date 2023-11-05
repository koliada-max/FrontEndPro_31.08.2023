const postIdInput = document.getElementById('postId');
const searchButton = document.getElementById('searchButton');
const postContainer = document.getElementById('postContainer');
const commentsButton = document.getElementById('commentsButton');

searchButton.addEventListener('click', () => {
  const postId = postIdInput.value;
  if (postId >= 1 && postId <= 100) {
    fetchPost(postId)
      .then((post) => {
        displayPost(post);
        commentsButton.style.display = 'block';
      })
      .catch((error) => {
        console.error('Error:', error);
        postContainer.innerHTML = 'Post not found.';
        commentsButton.style.display = 'none';
      });
  } else {
    postContainer.innerHTML = 'Invalid ID. Please enter an ID between 1 and 100.';
    postContainer.innerHTML = 'Post not found.';
    commentsButton.style.display = 'none';
  }
});

commentsButton.addEventListener('click', () => {
  const postId = postIdInput.value;
  fetchComments(postId)
    .then((comments) => {
      displayComments(comments);
    })
    .catch((error) => {
      postContainer.innerHTML ='Error loading comments:', error;
    });
});

function fetchPost(postId) {
  return fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`).then(
    (response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    }
  );
}

function fetchComments(postId) {
  return fetch(
    `https://jsonplaceholder.typicode.com/posts/${postId}/comments`
  ).then((response) => {
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json();
  });
}

function displayPost(post) {
  postContainer.innerHTML = `
        <h2>Post #${post.id}</h2>
        <h3>${post.title}</h3>
        <p>${post.body}</p>
      `;
}

function displayComments(comments) {
  const commentsContainer = document.createElement('div');
  commentsContainer.innerHTML = '<h3>Comments:</h3>';
  comments.forEach((comment) => {
    const commentDiv = document.createElement('div');
    commentDiv.innerHTML = `
          <strong>${comment.name}</strong>
          <p>${comment.body}</p>
        `;
    commentsContainer.appendChild(commentDiv);
  });
  postContainer.appendChild(commentsContainer);
  commentsButton.style.display = 'none';
}
