module.exports = [
  {
    input: 'templates/workflows/checks.ejs',
    output: '.github/workflows/checks.yml',
    condition: ({ jobs }) => jobs.length > 0,
  },
  {
    input: 'templates/actions/check-comment/action.ejs',
    output: '.github/actions/check-comment/action.yml',
    condition: ({ jobs, showComments }) => jobs.length > 0 && !!showComments,
  },
  {
    input: 'templates/actions/check-install/action.ejs',
    output: '.github/actions/check-install/action.yml',
    condition: ({ jobs }) => jobs.length > 0,
  },
  {
    input: 'templates/actions/check-run/action.ejs',
    output: '.github/actions/check-run/action.yml',
    condition: ({ jobs }) => jobs.length > 0,
  },
];
