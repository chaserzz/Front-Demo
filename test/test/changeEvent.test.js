test("输入框输入,校验值", () => {
  const onChange = jest.fn();
  const { getByTestId } = render(
    <input data-testid="input" onChange={onChange} />
  );
  // 通过data-testid的方式来获取元素
  const input = getByTestId("input");
  // 模拟change事件，第二个参数模拟event的值
  fireEvent.change(input, { target: { value: "test" } });
  expect(onChange).toBeCalled();
  expect(input).toHaveValue("test");
});
