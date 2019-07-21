/*
  production: generates optimized js
  development: generates js with sourcemaps
*/
module.exports = {
  mode: "production",
  entry: "./src/main.ts",
  output: {
    path: `${__dirname}/app/js`,
    filename: 'main.js'
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: "ts-loader"
      }
    ]
  },
  resolve: {
    extensions: [".ts"]
  }
};
