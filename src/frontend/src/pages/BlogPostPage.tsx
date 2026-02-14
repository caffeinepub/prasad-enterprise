import React from 'react';
import { useParams, useNavigate } from '@tanstack/react-router';
import { useGetAllBlogPosts } from '../hooks/useBlog';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { ArrowLeft, Calendar, FolderOpen, Tag } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import BlogPostContentRenderer from '../components/blog/BlogPostContentRenderer';
import PageTransition from '../components/site/PageTransition';

export default function BlogPostPage() {
  const { postId } = useParams({ from: '/blog/$postId' });
  const navigate = useNavigate();
  const { data: posts = [], isLoading } = useGetAllBlogPosts();

  const post = posts.find(p => p.blogPostId.toString() === postId);

  if (isLoading) {
    return (
      <PageTransition>
        <div className="container max-w-4xl py-12">
          <Skeleton className="h-10 w-32 mb-8" />
          <Card>
            <CardHeader>
              <Skeleton className="h-8 w-3/4 mb-4" />
              <Skeleton className="h-4 w-1/2" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-64 w-full" />
            </CardContent>
          </Card>
        </div>
      </PageTransition>
    );
  }

  if (!post) {
    return (
      <PageTransition>
        <div className="container max-w-4xl py-12">
          <Button variant="ghost" onClick={() => navigate({ to: '/blog' })} className="mb-8">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Blog
          </Button>
          <Card>
            <CardContent className="py-12 text-center">
              <p className="text-lg font-medium mb-2">Blog post not found</p>
              <p className="text-muted-foreground">
                The post you're looking for doesn't exist or has been removed.
              </p>
            </CardContent>
          </Card>
        </div>
      </PageTransition>
    );
  }

  return (
    <PageTransition>
      <div className="container max-w-4xl py-12">
        <Button variant="ghost" onClick={() => navigate({ to: '/blog' })} className="mb-8">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Blog
        </Button>

        <article>
          <Card>
            <CardHeader>
              <CardTitle className="text-3xl md:text-4xl mb-4">{post.title}</CardTitle>
              <div className="flex items-center gap-2 text-muted-foreground text-sm mb-4">
                <Calendar className="h-4 w-4" />
                <span>By {post.author}</span>
              </div>

              {(post.categories.length > 0 || post.tags.length > 0) && (
                <>
                  <Separator className="my-4" />
                  <div className="space-y-3">
                    {post.categories.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {post.categories.map(category => (
                          <Badge key={category} variant="secondary">
                            <FolderOpen className="h-3 w-3 mr-1" />
                            {category}
                          </Badge>
                        ))}
                      </div>
                    )}
                    {post.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {post.tags.map(tag => (
                          <Badge key={tag} variant="outline">
                            <Tag className="h-3 w-3 mr-1" />
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>
                </>
              )}
            </CardHeader>
            <CardContent>
              <BlogPostContentRenderer content={post.content} />
            </CardContent>
          </Card>
        </article>
      </div>
    </PageTransition>
  );
}
