import getPostTemplate from "./post-template.js";

const createListTemplate = (posts, req) => /*html*/ `
  <ul>
    ${posts.map((post) => getPostTemplate(post, req)).join("")}  
`;

export default createListTemplate;
