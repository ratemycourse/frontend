/* eslint-env node */
const INDENTS = 2;
const MAX_PROPS_PER_LINE = 2;

module.exports = {
  'plugins': ['react'],
  'extends': ['plugin:react/all'],
  'env': {
    'browser': true,
    'commonjs': true,
  },
  'globals': {
    // webpack require
    'require': true,
  },
  'rules': {
    'jsx-quotes': ['error', 'prefer-double'],

    'react/jsx-indent': ['error', INDENTS],
    'react/jsx-indent-props': ['error', INDENTS],
    'react/jsx-max-props-per-line': ['error', { maximum: MAX_PROPS_PER_LINE }],
    'react/jsx-curly-spacing': ['error', 'always'],
    'react/no-multi-comp': ['error', { 'ignoreStateless': true }],
    'react/sort-comp': [
      'error', {
        'order': [
          'constructor',
          'displayName',
          'propTypes',
          'contextTypes',
          'childContextTypes',
          'mixins',
          'observe',
          'statics',
          'defaultProps',
          'getDefaultProps',
          'getInitialState',
          'getChildContext',
          'componentWillMount',
          'componentDidMount',
          'observe',
          'componentWillReceiveProps',
          'shouldComponentUpdate',
          'componentWillUpdate',
          'componentDidUpdate',
          'componentWillUnmount',
          '/^handle.+$/',
          '/^on.+$/',
          '/^get.+$/',
          '/^render.+$/',
          'render',
        ],
      },
    ],

    'react/forbid-prop-types': 'off',
    'react/jsx-filename-extension': 'off',
    'react/forbid-component-props': 'off',
    'react/prop-types': 'off', // does not work well with recompse
    'react/require-optimization': 'off',

    // might want
    'react/no-set-state': 'off',
    'react/jsx-sort-props': 'off',
    'react/jsx-handler-names': 'off',
    'react/sort-prop-types': 'off',
    'react/no-unused-prop-types': 'off',
    'react/jsx-boolean-value': 'off',
    'react/no-string-refs': 'off',
    'react/prefer-stateless-function': 'off',
    'react/jsx-no-literals': 'off',
    'react/jsx-no-bind': 'off',
    'react/no-find-dom-node': 'off',
    'react/jsx-closing-tag-location': 'off',
    'react/require-default-props': 'off',
  },
};
