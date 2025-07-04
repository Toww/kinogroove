import { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import Button from "../ui/Button";
import FormInput from "../ui/FormInput";
import ErrorMessage from "../ui/ErrorMessage";
import { PostsContext } from "../../contexts/PostsContext";

const PostForm = ({ postData }) => {
  // Contexts
  const { createPost, editPost, error } = useContext(PostsContext);

  // Hooks
  const { register, handleSubmit, formState, reset, setValue } = useForm({
    body: "",
  });

  useEffect(() => {
    if (postData) {
      setValue("body", postData.body);
    }
  }, [postData]);

  // Handlers
  const onSubmit = (entries) => {
    const data = new FormData();

    data.append("post[body]", entries.body);

    if (entries.song[0]) {
      data.append("post[song]", entries.song[0]);
    }

    if (postData) {
      editPost(data, postData.id);
    } else {
      createPost(data, reset);
    }
  };

  return (
    <div className="mb-4 rounded-sm bg-zinc-800 p-4">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <FormInput
            id="body"
            type="textArea"
            inputClasses="bg-white p-3 h-20 text-zinc-900 text-base resize-none focus:outline-2 outline-emerald-400"
            formState={formState}
            {...register("body", {
              required: "Your post must have a message.",
              maxLength: {
                value: 100,
                message: "Your post should have max. 100 characters.",
              },
            })}
          />
        </div>
        <div className="mt-2 flex justify-between">
          <FormInput
            id="song"
            type="file"
            accept="audio/*, .mp3"
            containerClasses="mt-2"
            inputClasses="p-0 m-0 max-w-110"
            formState={formState}
            {...register("song", {
              required: "Your post must have a song.",
            })}
          />

          <Button type="submit" className="mt-2 h-min">
            Submit
          </Button>
        </div>
      </form>
      {error && <ErrorMessage>{error.message}</ErrorMessage>}
    </div>
  );
};

export default PostForm;
