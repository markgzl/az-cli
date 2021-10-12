const inquirer = require("inquirer");

module.exports = async function () {
  let { name } = await inquirer.prompt([
    { name: "name", message: "请输入项目名称", type: "input" },
  ]);
  let { desc } = await inquirer.prompt([
    { name: "desc", message: "请输入项目描述", type: "input" },
  ]);
  let { author } = await inquirer.prompt([
    { name: "author", message: "请输入项目作者", type: "input" },
  ]);
  let { language } = await inquirer.prompt([
    {
      name: "language",
      message: "请选择语言",
      type: "list",
      choices: [
        { name: "typescript", value: "typescript" },
        { name: "javascript", value: "javascript" },
      ],
    },
  ]);
  let { platform } = await inquirer.prompt([
    {
      name: "platform",
      message: "请选择适用平台",
      type: "list",
      choices: [
        { name: "小程序", value: "mini" },
        { name: "admin-pc", value: "admin-pc" },
        { name: "pc", value: "pc" },
        { name: "mobile", value: "mobile" },
      ],
    },
  ]);

  return {
    name,
    desc,
    author,
    language,
    platform,
  };
};
