import React from "react";
import { UserProps } from "./types";

interface ProfileProps {
  user: UserProps;
  onClick: () => void;
}

const Profile: React.FC<ProfileProps> = ({ user, onClick }) => {
  const { name, image } = user;
  return (
    <div
      className="inline-block cursor-pointer max-w-xs bg-primary-500 p-2 rounded-md hover:bg-primary-700"
      onClick={onClick}
    >
      <div className="flex items-center gap-2">
        <img
          src={image}
          alt={`Profile of ${name}`}
          className="h-6 w-6 rounded-md"
        />
        <h4 className="text-white text-lg font-regular">{name}</h4>
      </div>
    </div>
  );
};

export default Profile;
