# sign_request.js

This implementation requires NodeJS

## Usage

From within the `javascript` directory of this repo, run the following commands in a terminal session.

```
> node
> const { sign } = require('./sign_request');
> sign('GET', '/foo/bar/baz', 'Hello World! This is the body of the request', 1646092023, 'abc123', 'xyz321');
```

This should print the string: `'QZ0rpNA66JmRXbsCvka05MjcJmUeeyezFH4tzLW1IHk='`