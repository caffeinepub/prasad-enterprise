import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import { toast } from 'sonner';

export function useCreateBlogPost() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      title,
      content,
      author,
      tags,
      categories,
    }: {
      title: string;
      content: string;
      author: string;
      tags: string[];
      categories: string[];
    }) => {
      if (!actor) throw new Error('Actor not available');
      return actor.createBlogPost(title, content, author, tags, categories);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blogPosts'] });
      toast.success('Blog post created successfully');
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to create blog post');
    },
  });
}

export function useUpdateBlogPost() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      postId,
      title,
      content,
      author,
      tags,
      categories,
    }: {
      postId: bigint;
      title: string;
      content: string;
      author: string;
      tags: string[];
      categories: string[];
    }) => {
      if (!actor) throw new Error('Actor not available');
      return actor.updateBlogPost(postId, title, content, author, tags, categories);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blogPosts'] });
      toast.success('Blog post updated successfully');
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to update blog post');
    },
  });
}

export function useDeleteBlogPost() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (postId: bigint) => {
      if (!actor) throw new Error('Actor not available');
      return actor.deleteBlogPost(postId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blogPosts'] });
      toast.success('Blog post deleted successfully');
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to delete blog post');
    },
  });
}

export function useCheckIsAdmin() {
  const { actor, isFetching } = useActor();

  return useMutation({
    mutationFn: async () => {
      if (!actor) return false;
      return actor.isCallerAdmin();
    },
  });
}
