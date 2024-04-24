import { nextWrokOfUnit, preformWorkUnit } from "./React";

export function workLoop(deadline) {
  let shouldYield = false;
  while (!shouldYield && nextWrokOfUnit) {
    nextWrokOfUnit = preformWorkUnit(nextWrokOfUnit);
    shouldYield = deadline.timeRemaining() < 1;
    requestIdleCallback(workLoop);
  }
  //代表链表处理完成
  if (!nextWrokOfUnit) {
    commitRoot();
  }
}

