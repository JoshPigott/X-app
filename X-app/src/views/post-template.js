import getTime from "../utils/get-time.js";
import { dbIsUsersPost } from "../database/posts.js";
import { getId } from "../services/session.js";
import escapeHtml from "../utils/escape-html.js";
import { dbGetHasLiked, dbGetLikeNumber } from "../database/likes.js";

import { likeTemplate, unlikeTemplate } from "../views/likes.js";

function getPostTemplate(post, req) {
  // Checks whether the current user created the post, ensuring only the creator can delete it.
  const isUserPost = dbIsUsersPost(post.id, req);
  const userId = getId(req);
  const hasLiked = dbGetHasLiked(post.id, userId);
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
