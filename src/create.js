const path = require("path");
const fs = require("fs");
const inquirer = require("inquirer");
const chalk = require("chalk");
const Download = require("./utils/download");
const ask = require("./utils/steps");

module.exports = async function (name, options) {
  console.log("新建项目", chalk.green(name));
  // 这里的一通问询 可以作为参数写入模板或者选择不同的模板进行下载
  let results = await ask();
  console.log(results, "=====");
  // 当前目录
  const cwd = process.cwd();
  const targetDir = path.join(cwd, name);
  // 当前项目名称已存在
  if (fs.existsSync(targetDir)) {
    if (options && options.force) {
      fs.rmdirSync(targetDir, { recursive: true });
    } else {
      const { action } = await inquirer.prompt([
        {
          name: "action",
          type: "list",
          message: "已存在相同名称的项目，请选择创建方式",
          choices: [
            {
              name: "覆盖",
              value: true,
            },
            {
              name: "取消",
              value: false,
            },
          ],
        },
      ]);
      if (!action) return;

      fs.rmdirSync(targetDir, { recursive: true });
    }
  }
  const download = new Download(name, targetDir);
  download.start();
};
