module.exports = {
    entry: './main.js',
    output: {
        //path: './dist/',
        filename: 'index.js'
    },
    devServer :{
        inline:true,
        headers: { "Access-Control-Allow-Origin": "*" },
        port:3003
    },
    module:{
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel',                
                query : {
                    presets:['es2015','react','stage-2']
                }
            },
            {
                test: /\.css/,
                loaders: ['style', 'css']
            }, {
        // whatwg-fetch use Promsie which IE11 doesn't support
        test: /\.js$/,
        include: [/whatwg-.*/],
        loader: 'babel'
      }
        ]
    }
}
