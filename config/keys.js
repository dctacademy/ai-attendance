let keys = {};

if(process.env.NODE_ENV === 'test') {
    keys['apiUrl'] = "http://localhost:3000";
    keys['contentType'] = "application/json";
    keys['secret'] = "supersecret";
    keys['MONGODB_URI'] = "mongodb://localhost:27017/ai-attendace";
}

if(process.argv.slice(2) == 'development'){
    keys['apiUrl'] = "http://localhost:3000";
    keys['contentType'] = "application/json";
    keys['secret'] = "supersecret";
    keys['MONGODB_URI'] = "mongodb://localhost:27017/ai-attendace";
}

if(process.argv.slice(2) == 'staging'){
    keys['apiUrl'] = "/";
    keys['contentType'] = "application/json";
    keys['secret'] = "supersecret";
    keys['MONGODB_URI'] = ""
}

if(process.argv.slice(2) == 'production'){
    keys['apiUrl'] = "/";
    keys['contentType'] = "application/json";
    keys['secret'] = "supersecret";
    keys['MONGODB_URI'] = ""
}

exports.keys = keys;