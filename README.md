## az-cli

```javascript

  npm i -g az-cli

  az-cli create <project-name>

```

### 项目结构

- bin/ cli 入口文件 package.json 中有指定 bin 的目录与文件
- src/ 功能文件 main 为主入口

### 实现思路

- 借助 commander 实现 cli 的命令与参数
- 通过解析 cli 的参数调用不同的方法
- ora 实现 loading 效果
- chalk 控制台变色
- inquirer 交互式命令行，
- figlet 画了一个 logo
- axios 获取 github 的模版与仓库 tag 信息
- download-git-repo 实现 git 仓库的下载

#### 个人理解

> cli 工具可快速的为团队成员初始化一套完整的项目，快速进行开发
>
> cli 工具本身即 clone 远程模板仓库，根据输入信息渲染出新的 package.json 等模板数据

#### 说明

- az-cli 仅是个人学习如何自定义 node-cli 脚手架练习项目（前身为之前小团队内的 cli 工具，未发布至 npm ）
- 欢迎根据此项目进行二次开发
