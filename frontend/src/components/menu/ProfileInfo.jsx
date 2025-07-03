import ProfilePic from "../../assets/feed/profile-pic.jpg";

const ProfileInfo = () => (
  <div className="my-8 flex items-center border-t-1 border-b-1 border-white py-3">
    <div className="h-10 w-10 overflow-hidden rounded-full border border-zinc-100">
      <img src={ProfilePic} />
    </div>
    <div className="ml-3">Toww</div>
  </div>
);

export default ProfileInfo;
