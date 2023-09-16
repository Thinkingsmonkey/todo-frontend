// import src, dest, watch, series 從 gulp
const { src, dest, watch, series } = require('gulp')

// import sass 從 gulp-sas，給定 sass compier，回傳一個 function
const sass = require('gulp-sass')(require('sass'));

// fun name 可自訂
// 建立 scss 到 css 的流程
function buildStyles() {
  return src('src/style/scss/index.scss') // 指定 scss 來源檔案
    .pipe(sass()) // 經過 sass compier 處理
    .pipe(dest('src/style/css/')) // 指定 output css file
}


// fun name 可自訂
function watchTask() {
  watch(['index.scss'], buildStyles) // 監看 檔名 給流程
}

// 輸出：使用 series function 調用給定參數
exports.default = series(buildStyles, watchTask)