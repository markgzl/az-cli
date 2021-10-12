const axios = require("axios");

axios.interceptors.response.use((res) => res.data);

async function getTemplateRepo() {
  return axios.get("https://api.github.com/orgs/az-cli/repos");
}

async function getRepoTag(repo) {
  return axios.get(`https://api.github.com/repos/az-cli/${repo}/tags`);
}

module.exports = {
  getTemplateRepo,
  getRepoTag,
};
