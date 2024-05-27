import { getInfoUserById } from "@/app/utility/axios/api.user";
import useCheckFollowingAndToggle from "@/app/utility/hooks/useCheckFollowingAndToggle";
import useTokenDecode from "@/app/utility/hooks/useTokenDecode";
import Image from "next/image";
import Link from "next/link";
import { useContext, useEffect } from "react";
import { ContextImageDetail } from "../BlockInfoAndComment";
import { ENV } from "@/app/utility/global-variable";

export default function InfoUserComponent() {
  const { decode } = useTokenDecode();
  const dataContext = useContext(ContextImageDetail);
  if (!dataContext) {
    throw new Error("Component need inside provider");
  }
  const { infoUser, setInfoUser, idUser } = dataContext;
  const {
    fetchIsFollowed,
    fetchToggleFollow,
    isFollowed,
    followersData,
    fetchTotalFollower,
  } = useCheckFollowingAndToggle();
  const handleFetchInfoUser = async (userId: number) => {
    try {
      const { data } = await getInfoUserById(userId);
      setInfoUser(data);
    } catch (err) {
      console.log(err);
    }
  };
  const handleToggleFollow = () => {
    if (infoUser && decode) {
      fetchToggleFollow(infoUser.info.id);
    }
  };
  useEffect(() => {
    if (idUser) {
      handleFetchInfoUser(idUser);
    }
  }, []);
  useEffect(() => {
    if (decode) {
      fetchIsFollowed(idUser);
    }
  }, [decode]);
  useEffect(() => {
    fetchTotalFollower(idUser);
  }, [isFollowed]);
  return (
    <div className=" flex flex-row justify-between items-center gap-2">
      {infoUser && (
        <div className="flex flex-row items-center gap-2 justify-between flex-grow">
          <div className="flex flex-row gap-2 justify-start items-center">
            <div>
              <Link
                href={`/user/${infoUser.info.id}`}
                className="md:w-20 w-16 block aspect-square rounded-full overflow-hidden bg-zinc-700"
              >
                {infoUser.info.avatar && (
                  <Image
                    className="fit-cover"
                    src={ENV.BASE_URL + "/" + infoUser?.info.avatar}
                    alt="avatar"
                    width={80}
                    height={80}
                  />
                )}
              </Link>
            </div>
            <div className="flex flex-col">
              <Link
                href={`/user/${infoUser.info.id}`}
                className="text-sm font-semibold max-w-[150px]"
              >
                {infoUser.info.fullname}
              </Link>
              <div className="text-sm">
                {followersData?.total || 0} Followers
              </div>
            </div>
          </div>
          {decode && infoUser?.info.id !== decode.id && (
            <button
              onClick={handleToggleFollow}
              className="btn-border-style bg-zinc-200"
            >
              {isFollowed ? "Following" : "Follow"}
            </button>
          )}
        </div>
      )}
    </div>
  );
}
