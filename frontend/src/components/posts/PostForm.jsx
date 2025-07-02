import { useContext } from "react";
import { useForm } from "react-hook-form";
import Button from "../ui/Button";
import FormInput from "../ui/FormInput";
import ErrorMessage from "../ui/ErrorMessage";
import { PostsContext } from "../../contexts/PostsContext";

const PostForm = () => {
  // Contexts
  const { createPost, error } = useContext(PostsContext);

  // Hooks
  const { register, handleSubmit, formState } = useForm();

  // Handlers
  const onSubmit = (entries) => {
    const data = new FormData();

    data.append("post[body]", entries.body);

    if (entries.song[0]) {
      data.append("post[song]", entries.song[0]);
    }
    createPost(data);
  };

  return (
    <div className="mb-8 bg-gray-100 p-4">
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormInput
          id="body"
          type="text"
          labelText="Body"
          containerClasses="mt-2"
          formState={formState}
          {...register("body", {
            required: "Your post must have a message.",
            maxLength: {
              value: 100,
              message: "Your post should have max. 100 characters.",
            },
          })}
        />
        <FormInput
          id="song"
          type="file"
          labelText="Song"
          accept="audio/*, .mp3"
          containerClasses="mt-2"
          formState={formState}
          {...register("song", {
            required: "Your post must have a song.",
          })}
        />

        <Button
          type="submitInput"
          className="mt-4 cursor-pointer rounded bg-teal-400 px-2 py-2"
          label="Create post"
        />
      </form>
      {error && <ErrorMessage>{error.message}</ErrorMessage>}
    </div>
  );
};

export default PostForm;
