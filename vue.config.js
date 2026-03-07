const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
  transpileDependencies: true,
  
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
