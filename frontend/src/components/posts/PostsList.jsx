import { usePosts } from "../../hooks/posts/usePosts";

const PostsList = () => {
  const { posts, loading, error } = usePosts();

  if (error) return <p className="text-red">{error}</p>;
  if (loading) return "Loading...";

  return (
    <>
      {posts.map((post) => (
        <div key={post.id} className="border rounded mb-4 py-2 px-4 gap-y-4">
          <h2>{post.title}</h2>
          <p>{post.body}</p>
        </div>
      ))}
    </>
  );
};

export default PostsList;
