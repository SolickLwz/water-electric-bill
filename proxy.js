export async function onRequest(context) {
  const { request } = context;
  const url = new URL(request.url);
  const targetUrl = url.searchParams.get('url');
  
  if (!targetUrl) {
    return new Response('Missing url parameter', { status: 400 });
  }

  const init = {
    method: request.method,
    headers: new Headers(request.headers),
    body: request.method !== 'GET' ? await request.text() : undefined
  };
  
  init.headers.delete('Origin');
  init.headers.delete('Referer');

  const response = await fetch(targetUrl, init);
  const newResponse = new Response(response.body, response);
  
  newResponse.headers.set('Access-Control-Allow-Origin', '*');
  newResponse.headers.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  newResponse.headers.set('Access-Control-Allow-Headers', '*');
  
  return newResponse;
}