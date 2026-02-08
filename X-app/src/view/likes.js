export function likeTemplate(post) {
  return /*html*/ `<div class="likes">
    <button hx-post="/post/${post.id}/like" hx-target="closest .likes" hx-swap="outerHTML"> like </button> 
    <span>${post.likes} </span>
  </div>`;
}

export function unlikeTemplate(post) {
  return /*html*/ `<div class="likes">
    <button hx-post="/post/${post.id}/unlike" hx-target="closest .likes" hx-swap="outerHTML"> unlike </button> 
    <span>${post.likes} </span>
  </div>`;
}
