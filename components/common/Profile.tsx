import { useSession } from "next-auth/react";
import React from "react";

interface ProfileProps {
  onClick: () => void;
}

const Profile: React.FC<ProfileProps> = ({ onClick }) => {
  const { data: session } = useSession();
  return (
    <div
      className="inline-block cursor-pointer max-w-xs bg-mainTint px-3 py-0.5 rounded-md hover:bg-mainShade"
      onClick={onClick}
    >
      <div className="flex items-center gap-2">
        <img
          src={session?.user.image || ""}
          alt={`Profile of ${session?.user.name}}`}
          className="h-6 w-6 rounded-md"
        />
        <p className="text-white text-[1rem]">{session?.user.name}</p>
      </div>
    </div>
  );
};

export default Profile;
