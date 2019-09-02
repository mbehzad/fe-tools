const prompts = require("prompts");

const getDefaultEntryPath = vals => {
  const { useReact, useTS } = vals;
  if (useReact) {
    return `src/js/index.${useTS ? "tsx" : "jsx"}`;
  }
  return `src/js/index.${useTS ? "ts" : "js"}`;
};

const getJsExtension = vals => {
  const { useReact, useTS } = vals;
  if (useReact) {
    return useTS ? "tsx" : "jsx";
  }
  return useTS ? "ts" : "js";
};

const questions = [
  {
    type: "text",
    name: "namespace",
    message: "What's the namespace of your app?"
  },
  {
    type: "toggle",
    name: "useReact",
    message: "Do you want to use React?",
    initial: false,
    active: "yes",
    inactive: "no"
  },
  {
    type: "toggle",
    name: "useTS",
    message: "Do you want to use Typescript?",
    initial: true,
    active: "yes",
    inactive: "no"
  },
  {
    type: "text",
    name: "jsEntry",
    message: (_, vals) => (`Where is your ${getJsExtension(vals)} entry?`),
    initial: (_, vals) => getDefaultEntryPath(vals)
  },
];


(async () => {
  const response = await prompts(questions);

  console.log(response);
})();