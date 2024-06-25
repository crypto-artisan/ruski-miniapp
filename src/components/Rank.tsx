import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import toastr from "toastr";
import Loader from "./Loader";
const ENDPOINT = 'http://localhost:5000'

interface IRankProps {
    user: any;
}

const Rank: React.FC<IRankProps> = ({ user }) => {
    const [users, setUsers] = useState<object[]>([]);
    const [curUser, setCurUser] = useState<any>({});
    const [ranking, setRaking] = useState<number>(0);
    const hasShownWarningRef = useRef(false);

    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        if (!hasShownWarningRef.current && user) {
            axios.get(`${ENDPOINT}/api/user/all/${user.id}`)
                .then((res) => {
                    let userInfo = res.data;
                    setUsers(userInfo.allUsers);
                    setCurUser(userInfo.curUser);
                    setRaking(userInfo.ranking);
                    setLoading(false);
                })
                .catch((err) => {
                    toastr.error("Something Went Wrong!");
                })
            hasShownWarningRef.current = true;
        }
    }, [])

    function formatNumberWithCommas(number: number, locale = "en-US") {
        return new Intl.NumberFormat(locale).format(number);
    }

    return (
        <div className="flex flex-col text-center items-center justify-start gap-4 pt-2">
            <div className="flex flex-col w-full justify-between items-center gap-4">
                <div className="flex px-3 py-1 text-lg font-bold w-full">
                    <div className="text-start w-[20%]">Rank</div>
                    <div className="text-start w-[55%]">User</div>
                    <div className="text-start w-[20%]">$Ruski</div>
                </div>
                {
                    loading ? (
                        <Loader width="30" />
                    ) : (
                        <>
                            {users.map((iUser: any, index) => (
                                <div
                                    key={index}
                                    className={`flex ${index > 0 && "my-3"
                                        } px-3 py-2 items-center bg-[#2ea6d9f0] rounded-lg`}
                                >
                                    <div className="text-xl max-sm:text-lg text-start pl-2 w-[20%]">{index + 1}</div>
                                    <div className="relative h-10 overflow-hidden w-[60%] flex items-center">
                                        <img
                                            src="/logo.png"
                                            alt="avatar"
                                            className="w-12 h-12 rounded-full"
                                        />
                                        <p className="text-xl max-sm:text-lg text-start pl-2">{iUser.userName}</p>
                                    </div>

                                    <p className="text-xl max-sm:text-lg text-start pl-2 w-[30%]">
                                        {formatNumberWithCommas(iUser.totalPoints)}
                                    </p>
                                </div>
                            ))}
                            < hr className="my-3 border-[#2ea6d9f0] border-2" />
                            <div className="text-xl max-sm:text-lg text-start pl-2 w-[20%]">{ranking + 1}</div>
                            <div className="relative h-12 overflow-hidden w-[60%] flex items-center">
                                <img src="/logo.png" alt="avatar" className="w-12 h-12 rounded-full" />
                                <p className="text-xl max-sm:text-lg text-start pl-2">{curUser.userName}</p>
                            </div>

                            <p className="text-xl max-sm:text-lg text-start pl-2 w-[30%]">
                                {formatNumberWithCommas(curUser.totalPoints)}
                            </p>
                        </>)
                }
            </div>
        </div>
    )
}

export default Rank;