

var config = {
    'port': process.env.port || 5555,
    'database':'mongodb://127.0.0.1:27017/unhiring',
    'superSecret':'itsasecret'
};

module.exports = config;
