import React from "react";
import ReactDOM from "react-dom";
import { shallow, configure, mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { shallowToJson } from "enzyme-to-json";
import Select from "../Select";

configure({ adapter: new Adapter() });

describe("Select", () => {
  it("Render Select with default options", () => {
    const component = shallow(<Select name="test-select" />);
    const tree = shallowToJson(component);
    expect(tree).toMatchSnapshot();
  });

  // eslint-disable-next-line no-undef
  it("renders without crashing", () => {
    const wrapper = document.createElement("div");
    ReactDOM.render(
      <Select name="select" options={["Select 1", "Select 2"]} />,
      wrapper
    );
    ReactDOM.unmountComponentAtNode(wrapper);
  });

  it("select field should render without throwing an error", function () {
    const wrapper = mount(
      <Select name="select" options={["Select 1", "Select 2"]} />
    );
    expect(wrapper.find("input").length).toBe(1);
  });

  it("select field with options as function", function () {
    const wrapper = mount(
      <Select
        name="select"
        options={() => ["Select 1", "Select 2"]}
        placeholder="Select Value"
        prefix="P"
        suffix="S"
      />
    );
    expect(wrapper.find("input").length).toBe(1);
  });
});
