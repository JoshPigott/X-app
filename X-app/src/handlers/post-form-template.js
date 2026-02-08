import postFormTemplate from "../view/post-form-template.js";
import htmlResponse from "../helper-functions/html-response.js";

// Allows the user to make post using a form
const getPostForm = () => {
  const html = postFormTemplate();
  return htmlResponse(html, { status: 200 });
};
export default getPostForm;
