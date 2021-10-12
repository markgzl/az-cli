const program = require("commander");
const path = require("path");
const figlet = require("figlet");
const chalk = require("chalk");
const { version } = require("./utils/constants");
const { formatCreateArgv } = require("./utils/format");

program
  .command("create")
  .description("创建项目")
  .action(() => {
    let { name, options } = formatCreateArgv();
    require(path.resolve(__dirname, "create"))(name, options);
  })
  .alias("c");

program.on("--help", () => {
  console.log("Examples");
  // Object.values(actionsMap).forEach((item) => {
  //   (item.examples || []).forEach((example) => {
  //     console.log(`  ${example}`);
  //   });
  // });

  console.log(
    "\r\n" +
      figlet.textSync("az-cli", {
        font: "Banner",
        horizontalLayout: "fitted",
        verticalLayout: "fitted",
        width: 200,
        whitespaceBreak: false,
      })
  );
  // 新增说明信息
  console.log(`\r\nRun ${chalk.cyan(`az-cli  --help`)} show details\r\n`);
});

program
  .version(version)
  .option("-f, --force", "强制覆盖同名文件夹")
  .option("-s, --set <path> <value>")
  .option("-d, --delete <path>", "delete option from config")
  .parse(process.argv);
