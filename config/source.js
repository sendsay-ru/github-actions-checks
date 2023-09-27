module.exports = [
  {
    input: 'templates/workflows/check-pr.ejs',
    output: '.github/workflows/check-pr.yml',
    condition: ({ jobs }) => jobs.length > 0,
  },
  {
    input: 'templates/workflows/check-prod.ejs',
    output: '.github/workflows/check-prod.yml',
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
