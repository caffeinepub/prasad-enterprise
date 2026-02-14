import Map "mo:core/Map";
import List "mo:core/List";
import Nat "mo:core/Nat";
import Iter "mo:core/Iter";
import Runtime "mo:core/Runtime";
import Principal "mo:core/Principal";

import MixinAuthorization "authorization/MixinAuthorization";
import AccessControl "authorization/access-control";


actor {
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  type Post = {
    blogPostId : Nat;
    title : Text;
    content : Text;
    author : Text;
    tags : [Text];
    categories : [Text];
  };

  type Posts = Map.Map<Nat, Post>;

  var nextPostId = 1;
  let posts : Posts = Map.empty<Nat, Post>();

  public type BlogAuthor = {
    adminPrincipal : Principal;
    name : Text;
    bio : Text;
  };

  let blogAuthors = List.empty<BlogAuthor>();

  public type UserProfile = {
    name : Text;
    bio : Text;
  };

  let userProfiles = Map.empty<Principal, UserProfile>();

  func requireAdmin(caller : Principal) {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can perform this action");
    };
  };

  func getPostValue(postId : Nat) : Post {
    switch (posts.get(postId)) {
      case (null) { Runtime.trap("Blogpost must exist"); };
      case (?post) { post };
    };
  };

  func forNonEmpty<A>(value : [A], f : [A] -> Bool) : Bool {
    if (value.size() == 0) { return true };
    f(value);
  };

  // User profile functions
  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view profiles");
    };
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles.add(caller, profile);
  };

  // Blog post CRUD operations (admin-only for write operations)
  public shared ({ caller }) func createBlogPost(title : Text, content : Text, author : Text, tags : [Text], categories : [Text]) : async Nat {
    requireAdmin(caller);
    if (
      not (forNonEmpty<Text>(tags, func(tags) { for (tag in tags.values()) { if (tag == "") { return false } } ; true })) or not (forNonEmpty<Text>(categories, func(categories) { for (category in categories.values()) { if (category == "") { return false } } ; true }))
    ) {
      Runtime.trap("Tags and categories must not contain empty values");
    };
    let post : Post = {
      blogPostId = nextPostId;
      title;
      content;
      author;
      tags;
      categories;
    };
    posts.add(nextPostId, post);
    nextPostId += 1;
    post.blogPostId;
  };

  public shared ({ caller }) func updateBlogPost(postId : Nat, title : Text, content : Text, author : Text, tags : [Text], categories : [Text]) : async () {
    requireAdmin(caller);
    let post = getPostValue(postId);
    posts.add(postId, {
      post with
      title;
      content;
      author;
      tags;
      categories;
    });
  };

  public shared ({ caller }) func deleteBlogPost(postId : Nat) : async () {
    requireAdmin(caller);
    posts.remove(postId);
  };

  // Blog post query operations (public access)
  public query func getAllBlogPosts() : async [Post] {
    posts.values().toArray();
  };

  public query func getBlogPostsByBlogAuthor(author : Text) : async [Post] {
    posts.values().toArray().filter(func(post) { post.author == author });
  };

  public query func getBlogPostsByCategory(category : Text) : async [Post] {
    posts.values().toArray().filter(func(post) { post.categories.find(func(c) { c == category }) != null });
  };

  public query func getBlogPostsByTag(tag : Text) : async [Post] {
    posts.values().toArray().filter(func(post) { post.tags.find(func(t) { t == tag }) != null });
  };

  public query func getNextPostId() : async Nat {
    nextPostId;
  };

  // Blog author management (admin-only)
  public shared ({ caller }) func createBlogAuthor(adminPrincipal : Principal, name : Text, bio : Text) : async () {
    requireAdmin(caller);
    blogAuthors.add({
      adminPrincipal;
      name;
      bio;
    });
  };

  public shared ({ caller }) func deleteBlogAuthor(adminPrincipal : Principal) : async () {
    requireAdmin(caller);
    let currentAuthors = blogAuthors.toArray().filter(
      func(author) { author.adminPrincipal != adminPrincipal }
    );
    blogAuthors.clear();
    blogAuthors.addAll(currentAuthors.values());
  };

  public shared ({ caller }) func updateBlogAuthor(adminPrincipal : Principal, name : Text, bio : Text) : async () {
    requireAdmin(caller);
    let newAuthors = List.empty<BlogAuthor>();
    for (author in blogAuthors.values()) {
      if (author.adminPrincipal != adminPrincipal) {
        newAuthors.add(author);
      } else {
        newAuthors.add({
          adminPrincipal = author.adminPrincipal;
          name;
          bio;
        });
      };
    };
    blogAuthors.clear();
    blogAuthors.addAll(newAuthors.values());
  };

  public query func getAllBlogAuthors() : async [BlogAuthor] {
    blogAuthors.toArray();
  };
};


