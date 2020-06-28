import React from "react";
import ReactDOM from "react-dom";
import { shallow, configure, mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { shallowToJson } from "enzyme-to-json";
import Table from "../Table";

configure({ adapter: new Adapter() });

const tableData = {
  columns: [
    { name: "name", label: "Name", type: "date", sort: true, filter: true },
    {
      name: "status",
      label: "Status",
      type: "checkbox",
      sort: true,
      filter: true,
      options: [
        {
          label: "Draft",
          value: "Draft",
        },
        {
          label: "Ready",
          value: "Ready",
        },
        {
          label: "Published",
          value: "Published",
        },
      ],
    },
    { name: "render", label: "Render", type: "render", render: () => "Render" },
    { name: "expand", label: "Expand", type: "expand", render: () => "Expand" },
  ],
  rows: [
    {
      id: "1",
      name: "Draft Record",
      status: "Draft",
    },
    {
      id: "2",
      name: "Ready Record",
      status: "Ready",
    },
    {
      id: "3",
      name: "Published Record",
      status: "Published",
    },
  ],
};

describe("Table", () => {
  it("Render Table with default options", () => {
    const component = shallow(<Table />);
    const tree = shallowToJson(component);
    expect(tree).toMatchSnapshot();
  });

  // eslint-disable-next-line no-undef
  it("renders without crashing", () => {
    const wrapper = document.createElement("div");
    ReactDOM.render(<Table title="Test Table" {...tableData} />, wrapper);
    ReactDOM.unmountComponentAtNode(wrapper);
  });

  it("default field should render without throwing an error", function () {
    const wrapper = mount(
      <Table title="Test Table" name="default" {...tableData} />
    );
    expect(wrapper.find("table").length).toBe(1);
  });
});
