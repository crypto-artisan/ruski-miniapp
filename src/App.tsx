import { useState, useRef, useEffect } from "react";
import TabBar from "./components/TabBar";
import Header from "./components/Header";
import Play from "./components/Play";
import Task from "./components/Task";
import Rank from "./components/Rank";
import axios from "axios";
import toastr from "toastr";
import { useTelegram } from "./hooks/useTelegram";

const ENDPOINT = 'https://ruski-backend.vercel.app';

function App() {
  let countdownTime = 12 * 60 * 60;
  let points = -0.002;
  let saveIntervalId = false;
  const [tab, setTab] = useState<string>("Play");
  const [start, setStart] = useState<boolean>(false);
  const [claimShow, setClaimShow] = useState<boolean>(false);

  const [intervalId, setIntervalId] = useState<any>();
  const [cnt, setCnt] = useState<number>(0);
  const [point, setPoint] = useState<number>(0.000);
  const [totalPoint, setTotalPoint] = useState<number>(0.000);

  const [hour, setHour] = useState<number>(0);
  const [min, setMin] = useState<number>(0);
  const [sec, setSec] = useState<number>(0);

  const hasShownWarningRef = useRef(false); // Use a ref to track if warning has been shown
  const [inviteMsg, setInviteMsg] = useState<boolean>(false);

  const [loading, setLoading] = useState<boolean>(false);

  const [task, setTask] = useState<string[]>([]);

  const { user, onClose, start_param } = useTelegram();

  const handleTabChange = (status: string) => {
    setTab(status);
  }

  const handleFarming = () => {
    if (user) {
      axios.put(`${ENDPOINT}/api/user/claim/${user?.id}`)
        .then(response => {
        })
        .catch(error => {
          console.error('Error occurred during PUT request:', error);
        });
      setStart(true);
      let interval_Id = setInterval(() => {
        setIntervalId(interval_Id);
        if (!saveIntervalId) {
          axios.put(`${ENDPOINT}/api/user/claim/${user?.id}`, {
            id: interval_Id
          })
            .then(response => {
              saveIntervalId = true;
            })
            .catch(error => {
              console.error('Error occurred during PUT request:', error);
            });
        }
        if (countdownTime >= 0) {
          let hours = Math.floor(countdownTime / 3600);
          let minutes = Math.floor((countdownTime % 3600) / 60);
          let seconds = countdownTime % 60;
          setHour(hours);
          setMin(minutes);
          setSec(seconds);
          points += 0.002;
          setPoint(points);
          countdownTime--;
          setCnt(countdownTime);
        }
        else {
          clearInterval(intervalId);
          setStart(false);
          setClaimShow(true);
          saveIntervalId = false;
          points = 0;
        }
      }, 1000);
    }
  };

  useEffect(() => {
    if (user && tab == "Play") {
      hasShownWarningRef.current = true;
      setLoading(true);
      let data = {
        userName: user?.username,
        firstName: user?.first_name,
        lastName: user?.last_name,
        countLimit: 12 * 60 * 60,
        start_param: start_param
      };
      axios.post(`${ENDPOINT}/api/user/${user?.id}`, data)
        .then(response => {
          const userInfo = response.data.user;
          setTotalPoint(userInfo.totalPoints);
          setTask(userInfo.task);
          clearInterval(userInfo.intervalId);
          points = userInfo.curPoints;
          countdownTime = userInfo.countDown;
          if (countdownTime == 0 && points != 0) {
            setClaimShow(true);
            setStart(false);
            setPoint(points);
          }
          else if (countdownTime != 0 && points != 0) {
            setStart(true);
            handleFarming();
          }
          else if (countdownTime == 0 && points == 0) {
            countdownTime = 12 * 60 * 60;
          }
          if (start_param && !inviteMsg && start_param != userInfo.inviteLink) {
            toastr.success("Successfully Invited!");
            setInviteMsg(true);
          }
          setLoading(false);
        })
        .catch(error => {
          // toastr.error("error", error);
          console.error('Error occurred during PUT request:', error);
        });
    }
  }, [tab]);

  return (
    <div className="h-full max-h-screen overflow-hidden md:px-[30%]">
      <div className="main-content h-screen overflow-hidden pb-[150px] px-4 dM-Sans font-extrabold">
        {
          tab == "Play" && (
            <Play user={user} onClose={onClose} point={point}
              totalPoint={totalPoint} setTotalPoint={setTotalPoint}
              claimShow={claimShow}
              setClaimShow={setClaimShow}
              handleFarming={handleFarming}
              start={start}
              hour={hour}
              min={min}
              sec={sec}
              loading={loading}
              setLoading={setLoading}
            />
          )
        }
        {
          tab == "Task" && (
            <Task setTab={setTab} user={user} totalPoint={totalPoint} setTotalPoint={setTotalPoint} task={task} setTask={setTask} />
          )
        }
        {
          tab == "Rank" && (
            <Rank user={user} />
          )
        }
      </div>
      <TabBar tab={tab} setTab={handleTabChange} />
    </div>
  );
}

export default App;
