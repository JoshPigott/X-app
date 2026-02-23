import getPostTemplate from "./post-template.js";

// create a list of post (expect I remove it from <ul> tags as it was unnecessary and gave me weird margins)
const createListTemplate = (posts, cursor, req) => /*html*/ `
  ${posts.map((post) => getPostTemplate(post, req)).join("")} 
  <!--If this is showing on the page it will request more posts-->
  <div hx-get="/posts?cursor=${cursor}" hx-trigger="revealed"
  hx-target=".posts__container" hx-swap="beforeend"></div>
`;

export default createListTemplate;
