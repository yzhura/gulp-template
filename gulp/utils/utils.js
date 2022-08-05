module.exports = {
    generateFileNames: (path, filesArr, isProd) => {
        if(!path.extname.includes('map')) {
            path.basename += isProd ?'-min' : '';
            const fileName = `${path.basename}${path.extname}`;
            filesArr.push(fileName);
        }
    }
}