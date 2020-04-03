import { addNewTask, updateTask } from "./server";

(async function myFunc() {
  await addNewTask({
    name: "My task",
    id: "123456"
  });

  await updateTask({
    name: "My task - UPDATED",
    id: "123456"
  });
})();
