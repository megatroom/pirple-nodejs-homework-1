const routes = {};

routes.hello = {
    get: (data, callback) => {
        callback({ message: 'Hello world!' });
    },

    post: (data, callback) => {
        callback({ message: `Hello ${data.payload}` });
    }
}


module.exports = routes;
