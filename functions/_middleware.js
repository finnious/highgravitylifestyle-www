const APEX = "highgravitylifestyle.com";
const WWW = "https://www.highgravitylifestyle.com";

function hostnameOf(request) {
  const fromUrl = new URL(request.url).hostname.toLowerCase();
  const host = request.headers.get("Host") || "";
  const fromHeader = host.split(":")[0].replace(/\.$/, "").toLowerCase();
  return fromHeader || fromUrl;
}

export async function onRequest(context) {
  const { request } = context;
  const url = new URL(request.url);
  const hostname = hostnameOf(request);
  if (hostname !== APEX && url.hostname.toLowerCase() !== APEX) {
    return context.next();
  }

  const target = new URL(url.pathname + url.search, WWW);
  return Response.redirect(target.toString(), 301);
}
