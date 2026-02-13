import getTime from "../helper-functions/get-time.js";
import { dbIsUsersPost } from "../data-base/posts.js";

function getPostTemplate(post, req) {
  // Checks whether the current user created the post, ensuring only the creator can delete it.
  const isUserPost = dbIsUsersPost(post.id, req);

  // Returns a post with the account, content, like button, and maybe delete button.
  return /*html*/ `
  <article class="post" id=${post.id}>
    <div>
      <img class="post__profile-pic" src="assets/profile-pic.png" alt="profile picture">
      ${post.username} ${getTime(post.time)}
    </div>
    <pre class="text">${post.content}</pre>
  
    <div class="post__buttons">
      <div class="post__likes">
        <button hx-post="/post/${post.id}/like" hx-target="closest .post__likes" hx-swap="outerHTML"> Like </button> 
        <span> ${post.likes} </span>
      </div>
      ${isUserPost ? deleteButton(post) : ""}
    </div>
  </article>
`;
}

function deleteButton(post) {
  return /*html*/ `<button hx-delete="/post/${post.id}" hx-swap="delete" hx-target="#${post.id}"> Delete </button>`;
}

export default getPostTemplate;
