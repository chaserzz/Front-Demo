import Button from "../src/Button";
import { render,fireEvent } from "@testing-library/react";

test("button unit test",() => {
  const fn = jest.fn();
  const {getAllByRole} = render(<Button handleBtnClick={fn} >1231</Button>);
  const button = getAllByRole("button")[0];
  fireEvent.click(button);
  expect(fn).toBeCalled(); // 期望这个方法被调用
  expect(fn).toBeCalledTimes(1); // 这个方法被调用一次
})