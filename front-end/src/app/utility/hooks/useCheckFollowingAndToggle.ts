import { useState } from "react";
import { ResponseGetFollower, ResponseGetFollowing, checkIsFollowed, getFollower, getFollowing, toggleFollow } from "../axios/api.user";


export default function useCheckFollowingAndToggle() {
    const [isFollowed, setIsFollowed] = useState<boolean>(false);
    const [followersData, setFollowers] = useState<ResponseGetFollower | null>(null);
    const [followingData, setFollowing] = useState<ResponseGetFollowing | null>(null);
    const fetchIsFollowed = async (id: number) => {
        try {
            const { data } = await checkIsFollowed(id);
            setIsFollowed(data);
        } catch (err) {
            console.log(err);
        }
    };
    const fetchToggleFollow = async (id: number) => {
        try {
            const { data } = await toggleFollow(id);
            setIsFollowed(data);
        } catch (err) {
            console.log(err);
        }
    };
    const fetchTotalFollower = async (id: number) => {
        try {
            const { data } = await getFollower(id);
            setFollowers(data);
        } catch (err) {
            console.log(err);
        }
    }

    const fetchTotalFollowing = async (id: number) => {
        try {
            const { data } = await getFollowing(id);
            setFollowing(data);
        } catch (err) {
            console.log(err);
        }
    }

    return {
        isFollowed,
        fetchIsFollowed,
        fetchToggleFollow,
        fetchTotalFollower,
        fetchTotalFollowing,
        followersData,
        followingData
    }
}