module.exports = async (req, res) => {
  const clientId = process.env.OAUTH_GITHUB_CLIENT_ID;
  const clientSecret = process.env.OAUTH_GITHUB_CLIENT_SECRET;
  const code = req.query && req.query.code;

  if (!clientId || !clientSecret) {
    res.status(500).send("Missing OAUTH_GITHUB_CLIENT_ID / OAUTH_GITHUB_CLIENT_SECRET environment variables.");
    return;
  }
  if (!code) {
    res.status(400).send("Missing authorization code.");
    return;
  }

  const tokenRes = await fetch("https://github.com/login/oauth/access_token", {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({ client_id: clientId, client_secret: clientSecret, code }),
  });
  const tokenData = await tokenRes.json();

  if (tokenData.error) {
    res.status(400).send(`GitHub authorization error: ${tokenData.error_description || tokenData.error}`);
    return;
  }

  const payload = JSON.stringify({ token: tokenData.access_token, provider: "github" });

  res.setHeader("Content-Type", "text/html");
  res.send(`<!doctype html>
<html><body>
<script>
(function () {
  function receiveMessage(e) {
    window.opener.postMessage('authorization:github:success:${payload}', e.origin);
    window.removeEventListener('message', receiveMessage, false);
  }
  window.addEventListener('message', receiveMessage, false);
  window.opener.postMessage('authorizing:github', '*');
})();
</script>
</body></html>`);
};
