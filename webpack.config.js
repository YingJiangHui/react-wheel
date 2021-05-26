const path = require("path")
module.exports = {
  mode: "production",
  entry: {
    index: "./example.tsx"
  },
  resolve: {
    extensions: [".js", ".jsx", ".tsx", ".ts"]
  },
  output: {
    path: path.resolve(__dirname, "dist/lib"),
    library: "wheel",
    libraryTarget: "umd"
  },
  plugins: ["styled-jsx/babel"],
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: "awesome-typescript-loader"
      },
      {
        test: /\.svg$/,
        loader: "svg-sprite-loader"
      },
      {
        test: /\.scss$/,
        loader: ["style-loader", {
          loader: "css-loader",
          options:{
            modules: {
              compileType: "module",
              auto: true,
              mode:'local',
              // localIdentName: "[path][name]__[local]--[hash:base64:5]",
            }
          }
        }, "sass-loader"]
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: "file-loader"
          }
        ]
      }
    ]
  }
}