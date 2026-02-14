import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, Trash2, MoveUp, MoveDown, Type, Image as ImageIcon } from 'lucide-react';

interface ContentBlock {
  type: 'text' | 'image';
  content?: string;
  src?: string;
  alt?: string;
  caption?: string;
}

interface BlogPostEditorProps {
  value: string;
  onChange: (value: string) => void;
}

export default function BlogPostEditor({ value, onChange }: BlogPostEditorProps) {
  const [blocks, setBlocks] = useState<ContentBlock[]>(() => {
    try {
      const parsed = JSON.parse(value);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  });

  const updateBlocks = (newBlocks: ContentBlock[]) => {
    setBlocks(newBlocks);
    onChange(JSON.stringify(newBlocks));
  };

  const addTextBlock = () => {
    updateBlocks([...blocks, { type: 'text', content: '' }]);
  };

  const addImageBlock = () => {
    updateBlocks([...blocks, { type: 'image', src: '', alt: '', caption: '' }]);
  };

  const removeBlock = (index: number) => {
    updateBlocks(blocks.filter((_, i) => i !== index));
  };

  const moveBlock = (index: number, direction: 'up' | 'down') => {
    const newBlocks = [...blocks];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= blocks.length) return;
    [newBlocks[index], newBlocks[targetIndex]] = [newBlocks[targetIndex], newBlocks[index]];
    updateBlocks(newBlocks);
  };

  const updateBlock = (index: number, updates: Partial<ContentBlock>) => {
    const newBlocks = [...blocks];
    newBlocks[index] = { ...newBlocks[index], ...updates };
    updateBlocks(newBlocks);
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <Button type="button" onClick={addTextBlock} variant="outline" size="sm">
          <Type className="h-4 w-4 mr-2" />
          Add Text Block
        </Button>
        <Button type="button" onClick={addImageBlock} variant="outline" size="sm">
          <ImageIcon className="h-4 w-4 mr-2" />
          Add Image Block
        </Button>
      </div>

      {blocks.length === 0 && (
        <Card>
          <CardContent className="py-8 text-center text-muted-foreground">
            No content blocks yet. Add a text or image block to get started.
          </CardContent>
        </Card>
      )}

      {blocks.map((block, index) => (
        <Card key={index}>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium">
                {block.type === 'text' ? 'Text Block' : 'Image Block'}
              </CardTitle>
              <div className="flex gap-1">
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => moveBlock(index, 'up')}
                  disabled={index === 0}
                >
                  <MoveUp className="h-4 w-4" />
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => moveBlock(index, 'down')}
                  disabled={index === blocks.length - 1}
                >
                  <MoveDown className="h-4 w-4" />
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => removeBlock(index)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            {block.type === 'text' ? (
              <Textarea
                value={block.content || ''}
                onChange={(e) => updateBlock(index, { content: e.target.value })}
                placeholder="Enter text content..."
                rows={6}
              />
            ) : (
              <>
                <div>
                  <label className="text-sm font-medium mb-1.5 block">Image URL</label>
                  <Input
                    value={block.src || ''}
                    onChange={(e) => updateBlock(index, { src: e.target.value })}
                    placeholder="https://example.com/image.jpg or /assets/image.jpg"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1.5 block">Alt Text</label>
                  <Input
                    value={block.alt || ''}
                    onChange={(e) => updateBlock(index, { alt: e.target.value })}
                    placeholder="Describe the image for accessibility"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1.5 block">Caption (optional)</label>
                  <Input
                    value={block.caption || ''}
                    onChange={(e) => updateBlock(index, { caption: e.target.value })}
                    placeholder="Image caption"
                  />
                </div>
                {block.src && (
                  <div className="mt-2">
                    <img
                      src={block.src}
                      alt={block.alt || 'Preview'}
                      className="rounded-lg max-h-48 object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = 'none';
                      }}
                    />
                  </div>
                )}
              </>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
