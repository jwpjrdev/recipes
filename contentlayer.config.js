import { defineDocumentType, makeSource } from 'contentlayer/source-files';
import remarkGfm from 'remark-gfm';
import rehypePrettyCode from 'rehype-pretty-code';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';

function rehypeWrapRecipeSections() {
  return (tree) => {
    const getText = (node) =>
      (node.type === 'text' && node.value) ||
      node.children?.map(getText).join('') ||
      '';
    const wrapSection = (className, children) => ({
      type: 'element',
      tagName: 'section',
      properties: { className: [className] },
      children,
    });

    const wrapRecipeSections = (children, modeName) => {
      const ingredientIndex = children.findIndex(
        (node) =>
          node.type === 'element' &&
          node.tagName === 'h2' &&
          getText(node).trim().toLowerCase() === 'ingredients',
      );
      const instructionIndex = children.findIndex(
        (node) =>
          node.type === 'element' &&
          node.tagName === 'h2' &&
          getText(node).trim().toLowerCase() === 'instructions',
      );

      if (ingredientIndex < 0 || instructionIndex <= ingredientIndex) {
        return children;
      }

      return [
        wrapSection(
          'recipe-ingredients',
          children.slice(0, instructionIndex),
        ),
        wrapSection(
          'recipe-instructions',
          children.slice(instructionIndex),
        ),
      ];
    };

    const modeHeadingIndex = (name) =>
      tree.children.findIndex(
        (node) =>
          node.type === 'element' &&
          node.tagName === 'h2' &&
          getText(node).trim().toLowerCase() === name,
      );
    const conciseIndex = modeHeadingIndex('concise');
    const detailedIndex = modeHeadingIndex('detailed');

    if (conciseIndex >= 0 && detailedIndex > conciseIndex) {
      const separatorIndex = tree.children.findIndex(
        (node, index) =>
          index > conciseIndex &&
          index < detailedIndex &&
          node.type === 'element' &&
          node.tagName === 'hr',
      );
      const conciseEnd = separatorIndex >= 0 ? separatorIndex : detailedIndex;
      const wrapMode = (name, children) => ({
        type: 'element',
        tagName: 'section',
        properties: { className: [`recipe-mode-${name}`] },
        children: wrapRecipeSections(children, name),
      });

      tree.children = [
        wrapMode('detailed', tree.children.slice(detailedIndex + 1)),
        wrapMode('concise', tree.children.slice(conciseIndex + 1, conciseEnd)),
      ];
      return;
    }

    tree.children = wrapRecipeSections(tree.children);
  };
}

/** @type {import('contentlayer/source-files').ComputedFields} */
const computedFields = {
  slug: {
    type: 'string',
    resolve: (doc) => doc._raw.flattenedPath,
  },
};

export const Recipe = defineDocumentType(() => ({
  name: 'Recipe',
  filePathPattern: `**/*.mdx`,
  contentType: 'mdx',
  fields: {
    title: {
      type: 'string',
      required: true,
    },
    category: {
      type: 'string',
      required: true,
    },
    halvable: {
      type: 'boolean',
    }
  },
  computedFields,
}));

export default makeSource({
  contentDirPath: 'content',
  documentTypes: [Recipe],
  mdx: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [
      rehypeWrapRecipeSections,
      rehypeSlug,
      [
        rehypePrettyCode,
        {
          theme: 'one-dark-pro',
          onVisitLine(node) {
            // Prevent lines from collapsing in `display: grid` mode, and allow empty
            // lines to be copy/pasted
            if (node.children.length === 0) {
              node.children = [{ type: 'text', value: ' ' }];
            }
          },
          onVisitHighlightedLine(node) {
            node.properties.className.push('line--highlighted');
          },
          onVisitHighlightedWord(node) {
            node.properties.className = ['word--highlighted'];
          },
        },
      ],
      [
        rehypeAutolinkHeadings,
        {
          properties: {
            className: ['anchor'],
          },
        },
      ],
    ],
  },
});
