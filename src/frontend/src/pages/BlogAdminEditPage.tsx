import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from '@tanstack/react-router';
import { useGetAllBlogPosts } from '../hooks/useBlog';
import { useCreateBlogPost, useUpdateBlogPost } from '../hooks/useBlogAdmin';
import { useInternetIdentity } from '../hooks/useInternetIdentity';
import AdminGate from '../components/auth/AdminGate';
import BlogPostEditor from '../components/blog/BlogPostEditor';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { ArrowLeft, Save, Loader2 } from 'lucide-react';
import PageTransition from '../components/site/PageTransition';

function BlogAdminEditContent() {
  const { postId } = useParams({ from: '/admin/blog/$postId' });
  const navigate = useNavigate();
  const { identity } = useInternetIdentity();
  const { data: posts = [] } = useGetAllBlogPosts();
  const createMutation = useCreateBlogPost();
  const updateMutation = useUpdateBlogPost();

  const isNew = postId === 'new';
  const existingPost = isNew ? null : posts.find(p => p.blogPostId.toString() === postId);

  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [content, setContent] = useState('[]');
  const [categories, setCategories] = useState('');
  const [tags, setTags] = useState('');

  useEffect(() => {
    if (existingPost) {
      setTitle(existingPost.title);
      setAuthor(existingPost.author);
      setContent(existingPost.content);
      setCategories(existingPost.categories.join(', '));
      setTags(existingPost.tags.join(', '));
    }
  }, [existingPost]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const categoriesArray = categories
      .split(',')
      .map(c => c.trim())
      .filter(c => c.length > 0);

    const tagsArray = tags
      .split(',')
      .map(t => t.trim())
      .filter(t => t.length > 0);

    try {
      if (isNew) {
        await createMutation.mutateAsync({
          title,
          content,
          author,
          tags: tagsArray,
          categories: categoriesArray,
        });
      } else if (existingPost) {
        await updateMutation.mutateAsync({
          postId: existingPost.blogPostId,
          title,
          content,
          author,
          tags: tagsArray,
          categories: categoriesArray,
        });
      }
      navigate({ to: '/admin/blog' });
    } catch (error) {
      console.error('Error saving post:', error);
    }
  };

  const isSaving = createMutation.isPending || updateMutation.isPending;

  return (
    <PageTransition>
      <div className="container max-w-5xl py-12">
        <Button variant="ghost" onClick={() => navigate({ to: '/admin/blog' })} className="mb-8">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Admin
        </Button>

        <Card>
          <CardHeader>
            <CardTitle>{isNew ? 'Create New Post' : 'Edit Post'}</CardTitle>
            <CardDescription>
              {isNew ? 'Fill in the details to create a new blog post' : 'Update the post details'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="title">Title *</Label>
                <Input
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Enter post title"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="author">Author *</Label>
                <Input
                  id="author"
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  placeholder="Enter author name"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="categories">Categories</Label>
                <Input
                  id="categories"
                  value={categories}
                  onChange={(e) => setCategories(e.target.value)}
                  placeholder="e.g., Construction, Materials (comma-separated)"
                />
                <p className="text-xs text-muted-foreground">
                  Separate multiple categories with commas
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="tags">Tags</Label>
                <Input
                  id="tags"
                  value={tags}
                  onChange={(e) => setTags(e.target.value)}
                  placeholder="e.g., steel, cement, tips (comma-separated)"
                />
                <p className="text-xs text-muted-foreground">
                  Separate multiple tags with commas
                </p>
              </div>

              <Separator />

              <div className="space-y-2">
                <Label>Content *</Label>
                <BlogPostEditor value={content} onChange={setContent} />
              </div>

              <div className="flex gap-4">
                <Button type="submit" disabled={isSaving}>
                  {isSaving ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="h-4 w-4 mr-2" />
                      {isNew ? 'Create Post' : 'Update Post'}
                    </>
                  )}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => navigate({ to: '/admin/blog' })}
                  disabled={isSaving}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </PageTransition>
  );
}

export default function BlogAdminEditPage() {
  return (
    <AdminGate>
      <BlogAdminEditContent />
    </AdminGate>
  );
}
