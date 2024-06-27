import axios from "axios";
import React from "react";
const ENDPOINT = 'https://ruski-backend.vercel.app';
const data = [
    {
        "id": "twitter",
        "title": "Follow Ruski's X",
        "img": "/twitter.svg",
        "points": 100,
        "link": "https://x.com/ruskiton/status/1805562536424546621?s=46&t=EKWa8NdWTOERIDjJ2Jn0PA"
    },
    ,
    {
        "id": "telegram",
        "title": "Join Ruski's TG Channel",
        "img": "/telegram.png",
        "points": 100,
        "link": "https://t.me/ruskiinu"
    },
    {
        "id": "ruski",
        "title": "View Ruski's Website",
        "img": "/logo.png",
        "points": 100,
        "link": "https://ruski.me"
    },
    {
        "id": "dedust",
        "title": "Explore Ruski's Dedust",
        "img": "/dedust.png",
        "points": 100,
        "link": "https://dedust.io/swap/TON/EQBzDjzzpN6PaLK2VxddADaPdNAVAbczzvBDhxBWQzHh6aLV"
    },
    {
        "id": "dextool",
        "title": "Explore Ruski's Dextool",
        "img": "/dextools.svg",
        "points": 100,
        "link": "https://dexscreener.com/ton/EQC3LfUR_Sfcu9p1d88JUySIb7LPibO2y-S8y3jzcQM4bua1"
    }
];
interface ITaskProps {
    setTab: (status: string) => void;
    user: any;
    totalPoint: number;
    setTotalPoint: (status: number) => void;
    task: string[];
    setTask: (status: string[]) => void;
}

const Task: React.FC<ITaskProps> = ({ setTab, user, totalPoint, setTotalPoint, task, setTask }) => {

    const handleFollow = (link: any, id: any) => {
        if (id == "telegram" || id == "fyde") {
            axios.put(`${ENDPOINT}/api/user/task/${user?.id}`, {
                id
            })
                .then(res => {
                    if (res.data) {
                        let newPoints = totalPoint + 100;
                        setTotalPoint(newPoints);
                        setTask([...task, id]);

                        toastr.success("Congratulation! You just earned 100 POINTS");
                    }
                })
                .catch(err => {
                    console.error("er", err);
                }
                )
            window.open(link, '_blank');
        }
        else {
            window.open(link, '_blank');
            //axios
            setTimeout(() => {
                axios.put(`${ENDPOINT}/api/user/task/${user?.id}`, {
                    id
                })
                    .then(res => {
                        if (res.data) {
                            let newPoints = totalPoint + 100;
                            setTotalPoint(newPoints);
                            setTask([...task, id]);
                            toastr.success("Congratulation! You just earned 100 POINTS");
                        }
                    })
                    .catch(err => {
                        console.error("er", err);
                    }
                    )
            }, 5000);
        }

    }
    const handleClaim = () => {
        axios.put(`${ENDPOINT}/api/user/task/${user?.id}`, {
            id: "all"
        })
            .then(res => {
                if (res.data) {
                    let newPoints = totalPoint + 200;
                    setTotalPoint(newPoints);
                    setTask([...task, "all"]);
                    toastr.success("Congratulation! You just earned 200 POINTS");
                }
            })
            .catch(err => {
                console.error("er", err);
            }
            )
    }
    return (
        <div className="h-full flex flex-col text-center items-center justify-around">
            <div className="flex flex-col w-full gap-2  items-center justify-between">
                <h1 className="text-[24px] text-left">Tasks</h1>
                <section className="flex flex-col gap-2 items-center py-2">
                    <img src="/dollar.png" alt="dollar" className="h-[80px] w-[80px] rounded-full scale-150" />
                    <p className="text-[18px] text-center text-[#2ea6d9f0] z-0">
                        COMPLETE THE TASKS TO EARN MORE POINTS
                    </p>
                </section>
                <div className="customCard flex flex-col w-full items-center justify-between gap-1 overflow-auto h-[30vh]" style={{ padding: "10px" }}>
                    {
                        data?.map((item: any, index) => (
                            <div key={index} className="item flex flex-row w-full justify-between gap-2 py-2 items-center">
                                <section className="flex flex-row gap-2 justify-between items-center">
                                    <img src={item?.img} alt="x-icon" className="h-[40px] w-[40px] rounded-full" />
                                    <div className="flex flex-col text-left">
                                        <h1 className="title text-[14px]">{item?.title}</h1>
                                        <h2 className="title text-[12px] text-black">
                                            +{item?.points} Points
                                        </h2>
                                    </div>
                                </section>
                                {task.includes(item?.id) ? (
                                    <button onClick={() => handleFollow(item?.link, item?.id)} className="customBtn px-4 py-2">CLAIMED</button>
                                ) : (
                                    <button onClick={() => handleFollow(item?.link, item?.id)} className="customBtn px-4 py-2">START</button>
                                )}

                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default Task;