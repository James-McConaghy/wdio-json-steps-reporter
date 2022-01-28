const express = require("express");
const path = require("path")
const fs = require("fs")
const app = express();
const port = 8080;

var root = path.join(__dirname, "/public")

app.use(express.static(root));

app.use(function(req, res, next) {
    console.log('%s %s', req.method, req.url);
    next();
});

app.get('/status', (request, response) => {
    response.send({ status: 'OK' });
});

app.get("/builds", (request, response) => {
    const buildsResultsPath = path.join(root, "/results/")
    const builds = fs.readdirSync(buildsResultsPath).filter(function (file) {
        return fs.statSync(buildsResultsPath+"/"+file).isDirectory()
    })
    response.send({ builds: builds })
})

app.get("/builds/:id", (request, response) => {
    console.log()
    if (getBuildDirectories().includes(request.params.id)) {
        const buildResultsPath = path.join(root, `/results/${request.params.id}/merged-results.json`)
        fs.createReadStream(buildResultsPath).pipe(response);
    } else {
        response
            .status(400)
            .send({ errors: "Invalid build." });
    }
})

app.get('/results/:id/:browser/*', (request, response) => {
    console.log(request.params)
    console.log(root)
    try {
        const imagePath = path.join(root, `/results/${request.params.id}/${request.params.browser}/${request.params["0"]}`)
        console.log(imagePath)
        if (fs.statSync(imagePath).isFile()) {
            console.log("found file")
            response.setHeader("Content-Type", "image/png")
            response.pipe(fs.createReadStream(buildResultsPath))
        }
    } catch(error) {
        response
            .status(404)
            .send({ errors: "Invalid image." });
    }
})

app.get('*', (req, res) => {
    res.sendFile(path.resolve(root, 'index.html'));
});

app.listen(port, () => console.log(`Listening on port ${port}`));

function getBuildDirectories() {
    const buildsResultsPath = path.join(root, "/results/")
    const builds = fs.readdirSync(buildsResultsPath).filter(function (file) {
        return fs.statSync(buildsResultsPath+"/"+file).isDirectory()
    })

    return builds
}