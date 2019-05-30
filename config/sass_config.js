
function getEnv(){
    const _node_env = process.env.NODE_ENV || 'production';
    return require('node-sass').types.String(_node_env);
}

module.exports ={
    "get-env()": getEnv
};