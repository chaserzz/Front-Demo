import React from "react";
import { render, fireEvent } from "@testing-library/react";

test("test a click event",() => {
  const handleBtnClick = jest.fn(); //jest 提供的测试函数
  const {getByTestId} = render(
    <button data-testid="button" onClick={handleBtnClick}></button>
  );
  const btn = getByTestId("button"); //通过节点上的testid来获得对应的node
  fireEvent.click(btn); //触发btn上的click方法
  expect(handleBtnClick).toBeCalled(); // 期望这个方法被调用
  expect(handleBtnClick).toBeCalledTimes(1); // 这个方法被调用一次
})