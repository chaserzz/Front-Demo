import React from "react";
import { render, waitFor } from "@testing-library/react";
import { renderHook } from "@testing-library/react-hooks";

test("Hooks 测试", () => {
  const useCounter = () => {
    const [count, setCount] = React.useState(0);
    const increment = React.useCallback(() => setCount(count + 1), [count]);
    return { count, increment };
  };
  const { result } = renderHook(() => useCounter());
  // result.current 包含hooks的返回值
  expect(result.current.count).toBe(0);
  // result.current.increment()的调用需要放在waitFor里
  waitFor(() => result.current.increment());
  waitFor(() => result.current.increment());
  expect(result.current.count).toBe(2);
});
