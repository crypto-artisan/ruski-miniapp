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
            setLoading(true);
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
                <div className="flex px-3 text-lg font-bold w-full text-[#2ea6d9f0]">
                    <div className="text-start w-[20%]">Rank</div>
                    <div className="text-start w-[55%]">User</div>
                    <div className="text-start w-[20%]">$Ruski</div>
                </div>
                {
                    loading ? (
                        <Loader width="30" />
                    ) : (
                        <>
                            <div className="h-[70vh] overflow-auto w-full">
                                {users.map((iUser: any, index) => (
                                    <div
                                        key={index}
                                        className={`flex px-3 py-2 items-center bg-[#2ea6d9f0] w-full`}
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
                            </div>
                            <div
                                className={`flex px-3 py-2 items-center bg-[#227ea6] rounded-lg w-full`}
                            >
                                <div className="text-xl max-sm:text-lg text-start pl-2 w-[20%]">{ranking + 1}</div>
                                <div className="relative h-12 overflow-hidden w-[60%] flex items-center">
                                    <img src="/logo.png" alt="avatar" className="w-12 h-12 rounded-full" />
                                    <p className="text-xl max-sm:text-lg text-start pl-2">{curUser.userName}</p>
                                </div>
                                <p className="text-xl max-sm:text-lg text-start pl-2 w-[30%]">
                                    {formatNumberWithCommas(curUser.totalPoints)}
                                </p>
                            </div>
                        </>
                    )
                }
            </div>
        </div>
    )
}

export default Rank;