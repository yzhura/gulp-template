const gulp = require('gulp')

const styles = require('./sass2css')
const imageMinify = require('./imgmin')
let devip = require('dev-ip');
const server = require('browser-sync').create()
let reload = server.reload;

function readyReload(cb) {
  server.reload()
  cb()
}



module.exports = function localServer(cb) {
    server.init({
        server: './',
        notify: false,
        open: true,
        cors: true,
        online: true,
        host: devip[0]
    })

    gulp.watch('src/sourceimages/*.{gif,png,jpg,svg,webp}', gulp.series(imageMinify, readyReload))
    // gulp.watch('src/img/sprite/*.svg', gulp.series(svgSprite, readyReload))
    gulp.watch('src/styles/**/*.scss', gulp.series(styles, cb => gulp.src('css').pipe(server.stream()).on('end', cb)))
    // gulp.watch('src/js/**/*.js', gulp.series(script, readyReload))
    // gulp.watch('src/pages/**/*.pug', gulp.series(pug2html, readyReload))
    // gulp.watch('package.json', gulp.series(copyDependencies, readyReload))
    gulp.watch("*.html").on("change", reload)

    return cb()
}