import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface BlogAuthor {
    bio: string;
    adminPrincipal: Principal;
    name: string;
}
export interface UserProfile {
    bio: string;
    name: string;
}
export interface Post {
    categories: Array<string>;
    title: string;
    content: string;
    tags: Array<string>;
    blogPostId: bigint;
    author: string;
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    createBlogAuthor(adminPrincipal: Principal, name: string, bio: string): Promise<void>;
    createBlogPost(title: string, content: string, author: string, tags: Array<string>, categories: Array<string>): Promise<bigint>;
    deleteBlogAuthor(adminPrincipal: Principal): Promise<void>;
    deleteBlogPost(postId: bigint): Promise<void>;
    getAllBlogAuthors(): Promise<Array<BlogAuthor>>;
    getAllBlogPosts(): Promise<Array<Post>>;
    getBlogPostsByBlogAuthor(author: string): Promise<Array<Post>>;
    getBlogPostsByCategory(category: string): Promise<Array<Post>>;
    getBlogPostsByTag(tag: string): Promise<Array<Post>>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getNextPostId(): Promise<bigint>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    isCallerAdmin(): Promise<boolean>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    updateBlogAuthor(adminPrincipal: Principal, name: string, bio: string): Promise<void>;
    updateBlogPost(postId: bigint, title: string, content: string, author: string, tags: Array<string>, categories: Array<string>): Promise<void>;
}
