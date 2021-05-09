var path = require("path")
var http = require("http")
var fs = require("fs")

var dir = path.join(__dirname, "/public")

var mime = {
    html: "text/html",
    txt: "text/plain",
    css: "text/css",
    gif: "image/gif",
    jpg: "image/jpeg",
    png: "image/png",
    svg: "image/svg+xml",
    js: "application/javascript"
}

var server = http.createServer(function (req, res) {
    var reqpath = req.url.toString().split("?")[0]
    if (req.method !== "GET") {
        res.statusCode = 501
        res.setHeader("Content-Type", "text/plain")
        return res.end("Method not implemented")
    }
    if (req.url === "/status") {
        res.writeHead(200, {"Content-Type": "application/json"})
        return res.end(JSON.stringify({"status": "OK"}))
    }
    if (req.url === "/buildInfo.json") {
        res.writeHead(200, {"Content-Type": "application/json"})
        let json = loadJSONfile(path.join(dir, "/buildInfo.json"))
        let dirs = getDirectories(path.join(dir, "/results/"))
        json.builds = dirs
        return res.end(JSON.stringify(json))
    }
    var file = path.join(dir, reqpath.replace(/\/$/, "/index.html"))
    if (file.indexOf(dir + path.sep) !== 0) {
        res.statusCode = 403
        res.setHeader("Content-Type", "text/plain")
        return res.end("Forbidden")
    }
    var type = mime[path.extname(file).slice(1)] || "text/plain"
    var s = fs.createReadStream(file)
    s.on("open", function () {
        res.setHeader("Content-Type", type)
        s.pipe(res)
    })
    s.on("error", function () {
        res.setHeader("Content-Type", "text/plain")
        res.statusCode = 404
        res.end("Not found")
    })
})

server.listen(8080, function () {
    console.log("Listening on http://localhost:8080/")
})

function getDirectories(path) {
    return fs.readdirSync(path).filter(function (file) {
        return fs.statSync(path+"/"+file).isDirectory()
    })
}

function loadJSONfile(file) {
    let fileconents = fs.readFileSync(file, "utf8")
    return JSON.parse(fileconents)
}