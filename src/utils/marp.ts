import { Marp } from '@marp-team/marp-core';

const marp = new Marp({
  html: true, // Enable HTML tags
  minify: false,
});

export const renderMarp = (markdown: string) => {
  const { html, css } = marp.render(markdown);
  return { html, css };
};
