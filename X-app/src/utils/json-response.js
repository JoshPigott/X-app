// Sets the content-type to be application/json
const json = (data, init) => {
  const headers = new Headers(init.headers);
  headers.set("content-type", "application/json; charset=UTF-8");
  return new Response(JSON.stringify(data), { ...init, headers });
};
export default json;
