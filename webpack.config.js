const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  entry: './src/js/index.js', // نقطة انطلاق الجافا سكريبت
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'js/bundle.js',
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.html$/i,
        loader: 'html-loader',
      },
      {
        test: /\.s[ac]ss$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
      },
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
        generator: { filename: 'assets/images/[name][ext]' }
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
        generator: { filename: 'assets/fonts/[name][ext]' }
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({ template: './src/index.html' }),
    new MiniCssExtractPlugin({ filename: 'css/main.css' }),
  ],
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist'), // المجلد الذي يراقبه السيرفر
    },
    compress: true, // ضغط الملفات لتسريع النقل
    port: 9000,     // المنفذ (يمكنك اختيار أي رقم مثل 8080)
    open: true,     // لفتح المتصفح تلقائياً بمجرد تشغيل الأمر
    hot: true,      // تفعيل التحديث المباشر دون إعادة تحميل الصفحة بالكامل
    watchFiles: ['./src/**/*.html'], // مراقبة ملفات HTML لأنها لا تُستدعى عادة بـ Import
  },
};