const express = require("express");
const cors = require("cors");
const { exec } = require("child_process");

const app = express();

app.use(cors());

const port = 8080;

const runCMD = (cmd, successCallback, errorCallback) => {
    exec(cmd, (error, stdout, stderr) => {
        if (error) {
            // console.log(`error: ${error.message}`);
            if (errorCallback) {
                errorCallback(error.message);
            }
            return;
        }
        if (stderr) {
            //console.log(`stderr: ${stderr}`);
            if (errorCallback) {
                errorCallback(stderr);
            }
            return;
        }
        //console.log(`stdout: ${stdout}`);
        if (successCallback) {
            successCallback(stdout);
        }
    });
};

app.get("/runcmd/:cmd", (req, res) => {
    const cmd = req.params["cmd"];

    runCMD(
        cmd,
        (suc) => {
            res.send(suc);
        },
        (err) => {
            res.send(err);
        }
    );
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
