function bodyDigest(body) {
  if (body === null) {
    return '';
  }

  return crypto
    .createHash('md5')
    .update(body, 'utf8')
    .digest('base64');
}

exports.sign = function (method, path, body, timestamp, publicKey, privateKey) {
  const data = [method.toUpperCase(),
                path.toLowerCase(),
                bodyDigest(body),
                timestamp,
                publicKey].join('\n').trim();

  return crypto
    .createHmac('sha256', privateKey)
    .update(data, 'utf8')
    .digest('base64');
}