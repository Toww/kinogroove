import { useContext } from "react";
import { PostsContext } from "../../contexts/PostsContext";

const PostsList = () => {
  // Contexts
  const { posts, loading, error } = useContext(PostsContext);

  if (error) return <p className="text-red">{error}</p>;
  if (loading) return "Loading...";

  return (
    <>
      {posts.map((post) => (
        <div key={post.id} className="border rounded mb-4 py-2 px-4 gap-y-4">
          <h2>{post.title}</h2>
          <p>{post.body}</p>
          {post.song_url && <audio controls src={post.song_url} />}
        </div>
      ))}
    </>
  );
};

export default PostsList;
