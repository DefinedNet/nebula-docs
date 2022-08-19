'use strict';

var theme = {
  plain: {
    color: '#F8F8F2',
    backgroundColor: 'var(--dn-color-gray-15)',
  },
  styles: [
    {
      types: ['boolean', 'constant'],
      style: {
        color: 'hsl(var(--dn-color-green-hs), 80%)',
      },
    },
    {
      types: ['function'],
      style: {
        color: 'hsl(var(--dn-color-orange-hs), 80%)',
      },
    },
    {
      types: ['deleted', 'symbol'],
      style: {
        color: 'hsl(var(--dn-color-red-hs), 80%)',
      },
    },
    {
      types: ['tag', 'keyword'],
      style: {
        color: 'hsl(var(--dn-color-blue-hs), 80%)',
      },
    },
    {
      types: ['string', 'char', 'selector', 'number', 'variable', 'attr-name', 'builtin', 'inserted'],
      style: {
        color: 'hsl(var(--dn-color-purple-hs), 80%)',
      },
    },
    {
      types: ['comment', 'prolog', 'punctuation'],
      style: {
        color: 'hsl(var(--dn-color-gray-hs), 50%)',
      },
    },
  ],
};

module.exports = theme;
