<p align="center">
  <a href="" rel="noopener">
 <img width=200px height=200px src="https://sendsay.ru/new/img/logo.svg" alt="Project logo"></a>
</p>

<h3 align="center">github-actions-checks</h3>

<div align="center">

[![Status](https://img.shields.io/badge/status-active-success.svg)]()
[![GitHub Issues](https://img.shields.io/github/issues/sendsay-ru/github-actions-checks/issues.svg)](https://github.com/sendsay-ru/github-actions-checks/issues/issues)
[![GitHub Pull Requests](https://img.shields.io/github/issues-pr/sendsay-ru/github-actions-checks/issues.svg)](https://github.com/sendsay-ru/github-actions-checks/issues/pulls)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](/LICENSE)

</div>

---

<p align="center">A CLI-tool for generate github-actions workflow for pull-requests and master branch checks
    <br> 
</p>

## 📝 Table of Contents

- [📝 Table of Contents](#-table-of-contents)
- [🧐 About ](#-about-)
- [🏁 Getting Started ](#-getting-started-)
- [🎈 Usage ](#-usage-)
- [💬 Comments](#-comments)
- [✍️ Authors ](#️-authors-)

## 🧐 About <a name = "about"></a>

We have created a project to configure the same type of checks. This package allows you to quickly configure the necessary checks for your repository using github-actions. This is a CLI tool with very simple usage.

## 🏁 Getting Started <a name = "getting_started"></a>

Just run

```
npx github-actions-checks
```

The file `.github.checks.json` will appear in your repository. You can edit it as you like and re-run the utility to update workflow according to the config.<br>So, just edit this file and run again:

```
npx github-actions-checks
```

Then commit changes in your repository.

## 🎈 Usage <a name="usage"></a>

The main config - `.github.checks.json`<br>
config by default:
```
{
  "env": {
    "NODE_ENV": "CI"
  },
  "jobs": [
    {
      "key": "checks",
      "steps": [
        {
          "key": "eslint",
          "name": "ESLint",
          "command": "npm run eslint"
        },
        {
          "key": "prettier",
          "name": "Prettier",
          "command": "npm run prettify"
        }
      ]
    },
    {
      "key": "tests",
      "steps": [
        {
          "key": "unit",
          "name": "Unit",
          "command": "npm run test"
        }
      ]
    }
  ],
  "showComments": false,
  "node": 16,
  "installCommand": "npm install",
  "buildCommand": ""
}
```

`showComments` - show [Comments section](#-comments)

`env` - environment variables<br>
`jobs` - asynchronous processes<br>
each process will start a virtual machine with:<br>
`node` - node.js version<br>
`installCommand` - command to install dependencies<br>
`buildCommand` - the command to build the project<br>
`useTurbo` - use Turborepo cache<br>

`steps` - array of checks within a separate process<br>
each step has:
`key`<br> 
`name` - Title<br>
`command` - bash command<br>
`preCommand` - prepare bash command<br>
`artifacts` - array of folders with artifacts<br>

in this example, 2 parallel processes will start:<br>
- in the first, checks will run one after the other: eslint and prettier,
- in the second - unit tests

<br>

![Screenshot of a github flow](/public/images/flow.png)

## 💬 Comments

> <b>Works only in private repositories!</b>

If you change `{showComments: true}` in `.github.checks.json`, a special comment with the status of checks will be displayed in the pull request.

Example of a comment when checks are in progress:
![Screenshot of a github flow](/public/images/progress.png)

Example of a comment when one of the checks failed:
![Screenshot of a github flow](/public/images/progress.png)

Example of a comment when one of the checks failed:
![Screenshot of a github flow](/public/images/failed.png)
<br>

## ✍️ Authors <a name = "authors"></a> 

- [@aleksnick](https://github.com/aleksnick) - Idea & Initial work, [contact in telegram](https://t.me/aleksnick)
