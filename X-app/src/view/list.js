import getPostTemplate from "./post-template.js";

// create a list of post (expect I remove it from <ul> tags as it was unnecessary and gave me weird margins)
const createListTemplate = (posts, req) => /*html*/ `
  ${posts.map((post) => getPostTemplate(post, req)).join("")}  
`;

export default createListTemplate;
