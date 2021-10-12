const { promisify } = require("util");
const path = require("path");
const inquirer = require("inquirer");
const chalk = require("chalk");
const downloadGitRepo = require("download-git-repo");
const { getTemplateRepo, getRepoTag } = require("./https");
const withLoading = require("./loading");

class Download {
  constructor(name, targetDir) {
    this.name = name;
    this.targetDir = targetDir;
    // promise 化 downloadGitRepo
    this.downloadGitRepo = promisify(downloadGitRepo);
  }
  // 远程模板
  async getRepo() {
    const repos = await withLoading(getTemplateRepo, "获取远程模版...");
    if (!repos) return;
    let reposList = repos.map((item) => item.name);
    let { repo } = await inquirer.prompt([
      {
        name: "repo",
        type: "list",
        message: "请选择初始化模板",
        choices: reposList,
      },
    ]);
    return repo;
  }

  // 获取模板的tag版本
  async getTag(repo) {
    const tags = await withLoading(
      getRepoTag,
      "获取目标模板的版本列表...",
      repo
    );
    if (!tags) return;
    const tagsList = tags.map((item) => item.name);
    let { tag } = await inquirer.prompt([
      {
        name: "tag",
        type: "list",
        message: "请选择目标模板的版本:",
        choices: tagsList,
      },
    ]);
    return tag;
  }

  async downloadGit(repo, tag) {
    let requestAPI = `az-cli/${repo}`;
    if (tag) {
      requestAPI += `#${tag}`;
    }
    await withLoading(
      this.downloadGitRepo,
      "正在下载远程模板...",
      requestAPI,
      path.resolve(process.cwd(), this.targetDir)
    );
  }
  // 开始下载repo模版
  async start() {
    let repo = await this.getRepo();
    let tag = await this.getTag(repo);
    await this.downloadGit(repo, tag);

    console.log(`\r\n 成功创建 ${chalk.cyan(this.name)} 项目`);
    console.log(`\r\n  cd ${chalk.cyan(this.name)}`);
    console.log("\r\n  npm install\r\n");
    console.log("  npm run start\r\n");
  }
}

module.exports = Download;
