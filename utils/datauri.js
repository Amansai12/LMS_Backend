const dataUriParser = require('datauri/parser')
const path = require("path")
const getUri = (file) => {
    const parser = new dataUriParser()
    const extName = path.extname(file.originalName).toString()
    return parser.format(extName,file.content)
}

module.exports = getUri