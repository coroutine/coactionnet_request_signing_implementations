# sign_request.rb

This implementation requires Ruby 3.1.1

## Usage

From within the `ruby` directory of this repo, run the following commands in a terminal session.

```
> irb -I .
> require 'sign_request'
> SignRequest.('GET', '/foo/bar/baz', 'Hello World! This is the body of the request', 1646092023, 'abc123', 'xyz321')
```

This should print the string: `Promise { "QZ0rpNA66JmRXbsCvka05MjcJmUeeyezFH4tzLW1IHk=" }`
This should print the string: `"QZ0rpNA66JmRXbsCvka05MjcJmUeeyezFH4tzLW1IHk="`