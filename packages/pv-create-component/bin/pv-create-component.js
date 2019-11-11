#!/usr/bin/env node
"use strict";
const program = require("commander");
const { resolve } = require("path");
const chalk = require("chalk");
const figlet = require("figlet");

const { version } = require("../package.json");
const enquiry = require("./enquiry");
const generator = require("../lib");

program
  .version(version)
  .option("-N, --name [component name]", "component name, incase you don't want to answer it in the cli interaction", "")
  .option("-Y, --yes", "answer all questions automatically with 'YES'")
  .option("--dontCheck", "ask to generate for example unit test files even if the user didn't want a js file")
  .option("--verbose", "logs debug information")
  .parse(process.argv);

// read configuration from pv.config.js
const {
  namespace,
  // useTS is default true for pv webpack configs
  useTS = true,
  useReact = false,
} = require(resolve("./pv.config.js"));


// bail out on react projects
if (useReact) {
  console.log(chalk.red("React projects are currently not supported by 'create-new-component' script!"));
  process.exit(-1);
}

// warn regarding missing feature
if (program.yes) {
  console.log(chalk.orange("The 'YES' option is not implemented yet. Please open a github issue!"));
}

run();


function printIntroText() {

  console.log(
    chalk.yellow(
      figlet.textSync("Create Component", {
        horizontalLayout: "full"
      })
    )
  );

  console.log("You can enter a " + chalk.bold("name") + " for a new component. e.g. '" + chalk.green("Related Topics") + "',");
  console.log("you will be asked to choose hbs/scss or js file names.");
  console.log("All necessary files whit some boilerplate code and their imports will then be generated.");
  console.log("i.e.");
  console.log("template file: ", chalk.cyan(`${namespace}-m-related-topics.hbs`));
  if (useTS) {
    console.log("typescript file: ", chalk.cyan(`${namespace}-m-related-topics.ts`));
  }
  else {
    console.log("javascript file: ", chalk.cyan(`${namespace}-m-related-topics.js`));
  }

  console.log("\nyou can press any time ", chalk.bgWhite.black(" ctrl + c "), " to cancel the procedure.\n\n");

}

async function run() {
  printIntroText();

  const options = await enquiry({
    useTS,
    // e.g. "related topic"
    name: program.name.toLowerCase(),
    dontCheck: program.dontCheck,
  });

  if (program.verbose) console.log("Filled in data: ", options);

  await generator({
    ...options,
    isInteractive: true,
    namespace,
  });

  process.exit = 0;
}