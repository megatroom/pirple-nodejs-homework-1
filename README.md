# The NodeJS Master Class - Homework Assignment #1

Please create a simple "Hello World" API. Meaning:

1. It should be a RESTful JSON API that listens on a port of your choice.

2. When someone posts anything to the route /hello, you should return a welcome message, in JSON format. This message can be anything you want.

## Conclusion

Run the server:

```bash
node index.js
```

Make the requests:

```bash
curl http://127.0.0.1:3000/hello
curl -X POST http://127.0.0.1:3000/hello -d Nardini
```
