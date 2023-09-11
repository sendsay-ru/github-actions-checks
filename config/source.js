module.exports = [
  {
    input: 'templates/workflows/check-pr.ejs',
    output: '.github/workflows/check-pr.yml',
  },
  {
    input: 'templates/workflows/check-prod.ejs',
    output: '.github/workflows/check-prod.yml',
  },
  {
    input: 'templates/actions/check-comment/action.ejs',
    output: '.github/actions/check-comment/action.yml',
    condition: ({ showComments }) => !!showComments,
  },
  {
    input: 'templates/actions/check-install/action.ejs',
    output: '.github/actions/check-install/action.yml',
  },
  {
    input: 'templates/actions/check-run/action.ejs',
    output: '.github/actions/check-run/action.yml',
  },
];
