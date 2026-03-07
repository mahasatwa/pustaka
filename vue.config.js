const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
  transpileDependencies: true,
  
  // Configure Vue CLI to serve static admin folder
  chainWebpack: config => {
    // Copy admin folder to dist during build
    config.plugin('copy').tap(args => {
      args[0].push({
        patterns: [
          {
            from: 'admin',
            to: 'admin',
            globOptions: {
              ignore: ['**/.gitignore'],
            },
            noErrorOnMissing: true,
          },
        ],
      })
      return args
    })
  },

  // Configure devServer to serve admin folder
  devServer: {
    historyApiFallback: {
      rewrites: [
        {
          from: /^\/admin\/.*$/,
          to: (context) => {
            // Serve admin files directly
            return context.parsedUrl.pathname
          },
        },
      ],
    },
  },
})
