import React, { useState } from "react";
import { FaList } from "react-icons/fa";
import { MdGridView } from "react-icons/md";
import { useParams } from "react-router-dom";
import Loading from "../components/Loader";
import Title from "../components/Title";
import Button from "../components/Button";
import { IoMdAdd } from "react-icons/io";
import Tabs from "../components/Tabs";
import TaskTitle from "../components/TaskTitle";
import BoardView from "../components/BoardView";
import { tasks } from "../assets/data";
import Table from "../components/task/Table";
import AddTask from "../components/task/AddTask";
import { useGetAllTaskQuery } from "../redux/slices/api/taskApiSlice";
import { useSelector } from "react-redux";

const TABS = [
  { title: "Доска", icon: <MdGridView /> },
  { title: "Список", icon: <FaList /> },
];

const TASK_TYPE = {
  "на выполнение": "bg-blue-600",
  "в процессе": "bg-yellow-600",
  "выполненные": "bg-green-600",
};

const TRANSLATE = {
  "todo":"на выполнение",
  "in progress":"в процессе",
  "completed":"выполненные",
}


const Tasks = () => {
  const params = useParams();

  const [selected, setSelected] = useState(0);
  const [open, setOpen] = useState(false);
  const { user } = useSelector((state) => state.auth);

  const status = params?.status || "";

  const { data, isLoading, isAdmin } = useGetAllTaskQuery({
    strQuery: status,
    isTrashed: "",
    search: "",
  });

  return isLoading ? (
    <div className="py-10">
      <Loading />
    </div>
  ) : (
    <div className="w-full">
      <div className="flex items-center justify-between mb-4">
        <Title title={status ? `${TRANSLATE[status]}` : "Задачи"} />

        {!status && user?.isAdmin && (
          <Button
            onClick={() => setOpen(true)}
            label="Добавить задачу"
            icon={<IoMdAdd className="text-lg" />}
            className="flex flex-row-reverse gap-1 items-center bg-green-600 text-white rounded-md py-2 2xl:py-2.5"
          />
        )}
      </div>

      <Tabs tabs={TABS} setSelected={setSelected}>
        {!status && (
          <div className="w-full flex justify-between gap-4 md:gap-x-12 py-4">
            <TaskTitle label="На выполнение" className={TASK_TYPE["на выполнение"]} />
            <TaskTitle
              label="В процессе"
              className={TASK_TYPE["в процессе"]}
            />
            <TaskTitle label="Выполненные" className={TASK_TYPE["выполненные"]} />
          </div>
        )}

        {selected !== 1 ? (
          <BoardView tasks={data?.tasks} />
        ) : (
          <div className="w-full">
            <Table tasks={data?.tasks} />
          </div>
        )}
      </Tabs>

      <AddTask open={open} setOpen={setOpen} />
    </div>
  );
};

export default Tasks;
