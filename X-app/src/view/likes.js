// Allows you to like the post
export function likeTemplate(post) {
  return /*html*/ `<div class="post__likes">
    <button hx-post="/post/${post.id}/like" hx-target="closest .post__likes" hx-swap="outerHTML"> like </button> 
    <span>${post.likes} </span>
  </div>`;
}

// Allows you to unlike the post
export function unlikeTemplate(post) {
  return /*html*/ `<div class="post__likes">
    <button hx-post="/post/${post.id}/unlike" hx-target="closest .post__likes" hx-swap="outerHTML"> unlike </button> 
    <span>${post.likes} </span>
  </div>`;
}
