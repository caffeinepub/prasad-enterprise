import React from 'react';

interface ContentBlock {
  type: 'text' | 'image';
  content?: string;
  src?: string;
  alt?: string;
  caption?: string;
}

interface BlogPostContentRendererProps {
  content: string;
}

export default function BlogPostContentRenderer({ content }: BlogPostContentRendererProps) {
  let blocks: ContentBlock[] = [];

  try {
    blocks = JSON.parse(content);
    if (!Array.isArray(blocks)) {
      blocks = [{ type: 'text', content }];
    }
  } catch {
    blocks = [{ type: 'text', content }];
  }

  return (
    <article className="prose prose-slate dark:prose-invert max-w-none">
      {blocks.map((block, index) => {
        if (block.type === 'image' && block.src) {
          return (
            <figure key={index} className="my-8">
              <img
                src={block.src}
                alt={block.alt || 'Blog post image'}
                className="rounded-lg w-full object-cover"
              />
              {block.caption && (
                <figcaption className="text-center text-sm text-muted-foreground mt-2">
                  {block.caption}
                </figcaption>
              )}
            </figure>
          );
        }

        if (block.type === 'text' && block.content) {
          return (
            <div key={index} className="whitespace-pre-wrap">
              {block.content}
            </div>
          );
        }

        return null;
      })}
    </article>
  );
}
