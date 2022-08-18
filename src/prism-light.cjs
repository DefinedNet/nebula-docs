'use strict';

var theme = {
  plain: {
    color: 'var(--dn-color-gray-30)',
    backgroundColor: 'var(--dn-color-gray-95)',
  },
  styles: [
    {
      types: ['boolean', 'constant'],
      style: {
        color: 'hsl(var(--dn-color-green-hs), 30%)',
      },
    },
    {
      types: ['function'],
      style: {
        color: 'hsl(var(--dn-color-orange-hs), 30%)',
      },
    },
    {
      types: ['deleted', 'symbol'],
      style: {
        color: 'hsl(var(--dn-color-red-hs), 30%)',
      },
    },
    {
      types: ['tag', 'keyword'],
      style: {
        color: 'hsl(var(--dn-color-blue-hs), 30%)',
      },
    },
    {
      types: ['string', 'char', 'selector', 'number', 'variable', 'attr-name', 'builtin', 'inserted'],
      style: {
        color: 'hsl(var(--dn-color-purple-hs), 30%)',
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
