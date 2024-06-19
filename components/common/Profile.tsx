import { useSession } from "next-auth/react";
import React from "react";
import { IconCrown } from "./icons";
import { Session } from "next-auth";

interface ProfileProps {
  onClick: () => void;
  session: Session;
}

const Profile: React.FC<ProfileProps> = ({ onClick, session }) => {
  // const { data: session } = useSession();
  return (
    <div className="flex flex-col">
      <div
        className="inline-block cursor-pointer max-w-xs bg-mainTint px-3 py-0.5 lg:py-1.5 rounded-md hover:bg-mainShade"
        onClick={onClick}
      >
        <div className="flex items-center gap-2 overflow-visible">
          {session?.user.isManager && (
            <div className="absolute -translate-y-3.5 translate-x-1.5">
              <IconCrown size={30} />
            </div>
          )}
          <img
            src={session?.user.image || ""}
            alt={`Profile of ${session?.user.name}}`}
            className="h-6 w-6 rounded-md object-cover"
          />
          <p className="text-white text-[1rem]">{session?.user.name}</p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
