import { useQuery } from '@tanstack/react-query';
import { useActor } from './useActor';
import type { Post } from '../backend';

export function useGetAllBlogPosts() {
  const { actor, isFetching } = useActor();

  return useQuery<Post[]>({
    queryKey: ['blogPosts'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllBlogPosts();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetBlogPostsByCategory(category: string | null) {
  const { actor, isFetching } = useActor();

  return useQuery<Post[]>({
    queryKey: ['blogPosts', 'category', category],
    queryFn: async () => {
      if (!actor || !category) return [];
      return actor.getBlogPostsByCategory(category);
    },
    enabled: !!actor && !isFetching && !!category,
  });
}

export function useGetBlogPostsByTag(tag: string | null) {
  const { actor, isFetching } = useActor();

  return useQuery<Post[]>({
    queryKey: ['blogPosts', 'tag', tag],
    queryFn: async () => {
      if (!actor || !tag) return [];
      return actor.getBlogPostsByTag(tag);
    },
    enabled: !!actor && !isFetching && !!tag,
  });
}

export function useGetAllCategories() {
  const { data: posts = [] } = useGetAllBlogPosts();
  
  const categories = Array.from(
    new Set(posts.flatMap(post => post.categories))
  ).sort();
  
  return categories;
}

export function useGetAllTags() {
  const { data: posts = [] } = useGetAllBlogPosts();
  
  const tags = Array.from(
    new Set(posts.flatMap(post => post.tags))
  ).sort();
  
  return tags;
}
