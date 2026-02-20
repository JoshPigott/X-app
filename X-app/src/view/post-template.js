import getTime from "../helper-functions/get-time.js";
import { dbIsUsersPost } from "../data-base/posts.js";
import { getId } from "../webauthn/sessions/session.js";
import escapeHtml from "../helper-functions/escape-html.js";
import { dbGetLikeNumber, getHasLiked } from "../data-base/likes.js";

import { likeTemplate, unlikeTemplate } from "../view/likes.js";

function getPostTemplate(post, req) {
  // Checks whether the current user created the post, ensuring only the creator can delete it.
  const isUserPost = dbIsUsersPost(post.id, req);
  const userId = getId(req);
  const hasLiked = getHasLiked(post.id, userId);
  const postLikes = dbGetLikeNumber(post.id);

  // Returns a post with the account, content, like button, and maybe delete button.
  return /*html*/ `
  <article class="post" id=${post.id}>
    <div>
      <img class="post__profile-pic" src="assets/profile-pic.png" alt="profile picture">
      ${escapeHtml(post.username)} ${getTime(post.time)}
    </div>
    <pre class="text">${escapeHtml(post.content)}</pre>
  
    <div class="post__buttons">
      ${
    hasLiked
      ? unlikeTemplate({ id: post.id, likes: postLikes })
      : likeTemplate({ id: post.id, likes: postLikes })
  }
      ${isUserPost ? deleteButton(post) : ""}
    </div>
  </article>
`;
}

function deleteButton(post) {
  return /*html*/ `<button hx-delete="/post/${post.id}" hx-swap="delete" hx-target="#${post.id}"> Delete </button>`;
}

export default getPostTemplate;
