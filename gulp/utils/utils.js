module.exports = {
    generateFileNames: (path, filesArr, isProd) => {
        if(!path.extname.includes('map')) {
            path.basename += isProd ?'-min' : '';
            const fileName = `${path.basename}${path.extname}`;
            if(filesArr.length) {
                filesArr.forEach(el => {
                    if(el && el === fileName) return;
                    filesArr.push(fileName);
                })
                return;
            }
            filesArr.push(fileName);
        }
    }
}