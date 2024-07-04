import { faClone, faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import { toast } from "react-hot-toast";
import Loader from "./Loader";
import { ENDPOINT } from "../data";
const desText = `\nAarrf! RUN IT UP RUSKI. NOW IS THE TIME TO TELL YOUR FRIENDS AND SHARE THE JOY OF RUSKI. Winners will be chosen based on referrals and points. 🦴`;

interface IFriendProps {
    user: any;
}

// const data = [
//     {
//         userName: 'sniper131388',
//         status: 'Messaged',
//         totalPoints: 3000
//     },
//     {
//         userName: 'sniper131388',
//         status: 'Messaged',
//         totalPoints: 40000
//     },
//     {
//         userName: 'sniper131388',
//         status: 'Messaged',
//         totalPoints: 40000
//     },
//     {
//         userName: 'sniper131388',
//         status: 'Waiting to claim',
//         totalPoints: 40000
//     },
//     {
//         userName: 'sniper131388',
//         status: 'Waiting to claim',
//         totalPoints: 40000
//     },
//     {
//         userName: 'sniper131388',
//         status: 'Messaged',
//         totalPoints: 3000
//     }
// ]

const Friend: React.FC<IFriendProps> = ({ user }) => {
    const [showModal, setShowModal] = useState<boolean>(false);
    const [availableInviteCount, setAvailableInviteCount] = useState<number>(7);
    const [inviteLink, setInviteLink] = useState<string>("");
    const [friends, setFriends] = useState<object[]>([]);
    const [totalFriendPoints, setTotalFriendPoints] = useState<number>(0.0);
    const hasShownWarningRef = useRef(false);

    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        if (!hasShownWarningRef.current && user) {
            //https:reques
            setLoading(true);
            axios.get(`${ENDPOINT}/api/user/friend/${user?.id}`)
                .then((res) => {
                    let userInfo = res.data;
                    setAvailableInviteCount(userInfo.availableInviteCount);
                    setInviteLink(userInfo.inviteLink);
                    setFriends(userInfo.friendsInfo);
                    setTotalFriendPoints(userInfo.totalFriendPoints);
                    setLoading(false);
                })
                .catch((err) => {
                    toast.error("Something Went Wrong!");
                })
            hasShownWarningRef.current = true;
        }
    }, [])
    //clipBoard
    function legacyCopy(value: string) {
        const ta = document.createElement('textarea')
        ta.value = value ?? ''
        ta.style.position = 'absolute'
        ta.style.opacity = '0'
        document.body.appendChild(ta)
        ta.select()
        document.execCommand('copy')
        ta.remove()
    }
    const handleClipBoardCopy = async () => {
        legacyCopy(`
https://t.me/RuskiRunItUp_Bot/RuskiRunItUp?startapp=${inviteLink}
${desText}`);
        toast.success("Successfully Copied!");
    }
    const handleFriendClaim = () => {
        //
        axios.put(`${ENDPOINT}/api/user/friend/${user?.id}`, {
            totalFriendPoints
        }).then(res => {
            toast.success("Successfully Claimed !");
            setTotalFriendPoints(0.000);
        }).catch((err) => {
            toast.error("Something Went Wrong!");
            console.error("err", err);
        })
    }
    return (
        <div className="flex flex-col text-center items-center justify-start gap-4 pt-2">
            <div className="customCard flex flex-col w-full text-white justify-between items-center gap-4">
                <h2 className="text-[16px]">Invite friends to earn more Points</h2>
                <section className="flex flex-row border-[1px] border-dashed rounded-[10px] w-full items-center justify-between pl-2" style={{ borderColor: "#2e2448" }} >
                    <div className='flex flex-row gap-4'>
                        <h2 className="text-[18px]">{totalFriendPoints.toFixed(3)}</h2>
                        <h4 className="text-[13px] text-gray opacity-70">POINTS</h4>
                    </div>
                    {totalFriendPoints > 0.0 ? (
                        <button onClick={handleFriendClaim} className='customBtn text-white px-4 py-2 h-full rounded-[10px] text-[16px] text-center'>Claim</button>
                    ) : (
                        <button className='disableBtn text-white px-4 py-2 h-full rounded-[10px] text-[16px] text-center'>Claim</button>
                    )}
                </section>
            </div>
            <div className="flex flex-col w-full text-white justify-between items-center gap-4">
                <p className="text-[13px] text-[#000] opacity-70">
                    Refer a friend and earn 10% of the points they accumulate, plus an additional 3% from their referrals
                </p>
                <div className="flex flex-col w-full items-center justify-start gap-2 overflow-auto h-[40vh]" style={{ padding: "10px" }}>
                    {
                        loading ? (
                            <Loader width="30" />
                        ) : (
                            friends.length > 0 ? (
                                friends.map((friend: any, index: number) => {
                                    return (
                                        <div key={index} className="item flex flex-row w-full justify-between gap-1 p-1 items-center border-gray border-b-[1px]">
                                            <div className="flex flex-col justify-center items-center flex-[30%]">
                                                <h1 className="title text-[12px] text-[#8320f4f0]">{friend.userName}</h1>
                                            </div>
                                            <div className="flex flex-col flex-[30%] items-center h-[50px] justify-center text-[12px] w-[120px] text-[#00c4e8f0] px-1 rounded-md border-b-1">
                                                {
                                                    friend.status == "Messaged" ? (
                                                        "Waiting to claim"
                                                    ) : (
                                                        friend.status
                                                    )
                                                }
                                            </div>
                                            <div className="flex flex-row gap-1 flex-[30%]">
                                                <h1 className="title text-[14px] text-[#00c4e8f0]">{friend.totalPoints.toFixed(1)}</h1>
                                                <h1 className="title text-[10px] text-[#00c4e8f0]">POINTS</h1>
                                            </div>
                                        </div>
                                    )
                                })
                            ) : (
                                <div>
                                    <h4 className="opacity-70 pt-10 text-[#2ea6d9]">
                                        No Friends yet
                                    </h4>
                                </div>
                            )
                        )
                    }
                </div>
            </div>
            <div className="px-4 absolute bottom-[80px] w-full">
                {
                    availableInviteCount > 0 ? (
                        <button onClick={() => setShowModal(true)} className="customBtn w-[40%] bg-white text-white p-2 text-[14px]">Invite Friends</button>
                    ) : (
                        <button className="disableBtn w-[40%] bg-white text-white p-2 text-[14px]">Invite Friends</button>
                    )
                }
            </div>
            <div className={`absolute customCard flex flex-col md:w-[40%] w-full bg-white text-white px-4 py-2 gap-4 transition-all duration-500 ease-out transform  ${showModal ? 'bottom-[60px]' : 'bottom-[-440px]'}`}>
                <div className="h-[5px] rounded-full w-[80px] bg-gray self-center"></div>
                <h2 className="text-[20px]">Invite Friends</h2>
                <h4 className="text-[14px] text-gray">You have <span className="text-red-600 font-bold">{availableInviteCount}</span> invitations available</h4>
                <a href={`https://t.me/share/url?url=https://t.me/RuskiRunItUp_Bot/RuskiRunItUp?startapp=${inviteLink}&text=${desText}`} target="blank" className='customBtn text-white p-2 h-full rounded-[10px] text-[16px] text-center'>
                    <FontAwesomeIcon icon={faPaperPlane} className="mr-5" />
                    Send
                </a>
                <button onClick={handleClipBoardCopy} className='customBtn text-white p-2 h-full rounded-[10px] text-[16px] text-center'>
                    <FontAwesomeIcon icon={faClone} className="mr-5" />
                    Copy Link
                </button>
                <button onClick={() => setShowModal(false)} className='customBtn text-white p-2 h-full rounded-[10px] text-[16px] text-center'>
                    Cancel
                </button>
            </div>
        </div>
    )
}

export default Friend;