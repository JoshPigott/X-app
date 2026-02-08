import getTime from "../helper-functions/get-time.js";
import { dbIsUsersPost } from "../data-base/posts.js";

function getPostTemplate(post, req) {
  const isUserPost = dbIsUsersPost(post.id, req);

  return /*html*/ `
  <div class="post" id=${post.id}>
    <div>${post.username} ${getTime(post.time)}</div>
    <p>${post.content}<p>
  
    <div class="likes">
      <button hx-post="/post/${post.id}/like" hx-target="closest .likes" hx-swap="outerHTML"> like </button> 
      <span>${post.likes} </span>
    </div>
    ${isUserPost ? deleteButton(post) : ""}
  </div>
`;
}

function deleteButton(post) {
  return /*html*/ `<button hx-delete="/post/${post.id}" swap="delete" hx-target="#${post.id}"> delete </button>`;
}

export default getPostTemplate;
