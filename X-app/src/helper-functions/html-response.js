// Sets the content-type to be text/html
const htmlResponse = (html, init) => {
  const headers = new Headers(init.headers);
  headers.set("content-type", "text/html; charset=UTF-8");
  return new Response(html, { ...init, headers });
};
export default htmlResponse;
