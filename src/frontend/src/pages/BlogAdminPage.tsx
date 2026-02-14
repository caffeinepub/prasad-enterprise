import React from 'react';
import { useNavigate } from '@tanstack/react-router';
import { useGetAllBlogPosts } from '../hooks/useBlog';
import { useDeleteBlogPost } from '../hooks/useBlogAdmin';
import AdminGate from '../components/auth/AdminGate';
import LoginButton from '../components/auth/LoginButton';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Plus, Edit, Trash2, ArrowLeft } from 'lucide-react';
import PageTransition from '../components/site/PageTransition';

function BlogAdminContent() {
  const navigate = useNavigate();
  const { data: posts = [], isLoading } = useGetAllBlogPosts();
  const deleteMutation = useDeleteBlogPost();

  const sortedPosts = [...posts].sort((a, b) => Number(b.blogPostId) - Number(a.blogPostId));

  const handleDelete = async (postId: bigint) => {
    await deleteMutation.mutateAsync(postId);
  };

  return (
    <PageTransition>
      <div className="container max-w-7xl py-12">
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="flex items-center gap-4 mb-2">
              <Button variant="ghost" onClick={() => navigate({ to: '/blog' })}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Blog
              </Button>
              <LoginButton />
            </div>
            <h1 className="text-4xl font-bold">Blog Admin</h1>
            <p className="text-muted-foreground mt-2">Manage your blog posts</p>
          </div>
          <Button onClick={() => navigate({ to: '/admin/blog/$postId', params: { postId: 'new' } })}>
            <Plus className="h-4 w-4 mr-2" />
            New Post
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>All Posts</CardTitle>
            <CardDescription>
              {posts.length} {posts.length === 1 ? 'post' : 'posts'} total
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="space-y-4">
                {[1, 2, 3].map(i => (
                  <Skeleton key={i} className="h-16 w-full" />
                ))}
              </div>
            ) : posts.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground mb-4">No blog posts yet</p>
                <Button onClick={() => navigate({ to: '/admin/blog/$postId', params: { postId: 'new' } })}>
                  <Plus className="h-4 w-4 mr-2" />
                  Create your first post
                </Button>
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Author</TableHead>
                    <TableHead>Categories</TableHead>
                    <TableHead>Tags</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sortedPosts.map(post => (
                    <TableRow key={Number(post.blogPostId)}>
                      <TableCell className="font-medium">{post.title}</TableCell>
                      <TableCell>{post.author}</TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {post.categories.slice(0, 2).map(cat => (
                            <Badge key={cat} variant="secondary" className="text-xs">
                              {cat}
                            </Badge>
                          ))}
                          {post.categories.length > 2 && (
                            <Badge variant="secondary" className="text-xs">
                              +{post.categories.length - 2}
                            </Badge>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {post.tags.slice(0, 2).map(tag => (
                            <Badge key={tag} variant="outline" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                          {post.tags.length > 2 && (
                            <Badge variant="outline" className="text-xs">
                              +{post.tags.length - 2}
                            </Badge>
                          )}
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => navigate({ to: '/admin/blog/$postId', params: { postId: post.blogPostId.toString() } })}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button variant="ghost" size="sm">
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>Delete Post</AlertDialogTitle>
                                <AlertDialogDescription>
                                  Are you sure you want to delete "{post.title}"? This action cannot be undone.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction
                                  onClick={() => handleDelete(post.blogPostId)}
                                  className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                >
                                  Delete
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </div>
    </PageTransition>
  );
}

export default function BlogAdminPage() {
  return (
    <AdminGate>
      <BlogAdminContent />
    </AdminGate>
  );
}
