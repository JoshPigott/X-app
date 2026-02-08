const postFormTemplate = () => /*html*/ `
<div>
  <form>
    <input
      type="TEXT",
      name="content",
      placeholder="What is happening",
    >
    <button type="sumbit" hx-post="/post" hx-target=".display-posts" hx-swap="beforeend"
     hx-on::after-request="document.querySelector('form').reset();">Post</button>

</form>

</div>`;

export default postFormTemplate;
