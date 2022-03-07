# sign_request.ts

This implementation requires Deno

## Usage

From within the `typescript` directory of this repo, run the following commands in a terminal session.

```
> deno
> import { sign } from './sign_request.ts';
> sign('GET', '/foo/bar/baz', 'Hello World! This is the body of the request', 1646092023, 'abc123', 'xyz321');
```

This should print the string: `Promise { "QZ0rpNA66JmRXbsCvka05MjcJmUeeyezFH4tzLW1IHk=" }`