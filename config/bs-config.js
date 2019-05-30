
module.exports = {
    
    ui: {
        port: 3001,
        weinre: {
            port: 8080
        }
    },
    port: 3000,
    server: {
        baseDir: './htdocs'
    },
    files: './htdocs/**/*',
    tunnel: false,
    notify: false
};