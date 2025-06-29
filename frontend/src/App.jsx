import PostsList from "./components/posts/PostsList";

function App() {
  return (
    <>
      <div className="my-8 mx-auto max-w-2xl">
        <h1 className="text-lg text-center mb-6">Index page</h1>

        <PostsList />
      </div>
    </>
  );
}

export default App;
