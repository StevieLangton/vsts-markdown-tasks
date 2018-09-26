import ma = require("vsts-task-lib/mock-answer");
import tmrm = require("vsts-task-lib/mock-run");
import path = require("path");

let taskPath: string = path.join(__dirname, "..", "src", "Markdown2Html", "markdown2html.js");
let markdownPath: string = path.join(__dirname, "sample-md-files", "Parameters.md");
let htmlPath: string = path.join(__dirname, "sample-md-files", "Output.html");
let templatePath: string = path.join(__dirname, "sample-md-files", "Parameters.html");

let taskMock: tmrm.TaskMockRunner = new tmrm.TaskMockRunner(taskPath);
taskMock.setInput("markdownPath", markdownPath);
taskMock.setInput("htmlPath", htmlPath);
taskMock.setInput("templatePath", templatePath);
taskMock.setInput("parameters", JSON.stringify({ "header": { "title": "My Title" } }));

let answers: ma.TaskLibAnswers = <ma.TaskLibAnswers>{
    "checkPath": {}
};
answers.checkPath[markdownPath] = true;
answers.checkPath[templatePath] = true;

taskMock.setAnswers(answers);
taskMock.run();