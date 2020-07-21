import React from "react";
import ReactDOM from "react-dom";
import { shallow, configure, mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { shallowToJson } from "enzyme-to-json";
import Field from "../Field";
import { StoreProvider } from "../../lib";

configure({ adapter: new Adapter() });

describe("Field/Checkbox", () => {
  const setState = jest.fn();
  const useStateSpy = jest.spyOn(React, "useState");
  useStateSpy.mockImplementation((init) => [init, setState]);

  afterEach(() => {
    jest.clearAllMocks();
  });

  // {name: 'checkbox1', type: 'checkbox', label: 'checkbox 1', placeholder: 'checkbox 1', required: true},
  // {
  //   name: 'checkbox2',
  //   type: 'checkbox',
  //   label: 'checkbox 2',
  //   placeholder: 'checkbox 2',
  //   required: true,
  //   options: [{value: 'chk1', label: 'Checkbox 1'}, {value: 'chk2', label: 'Checkbox 2'}],
  //   dependencies: {
  //     'chk1': [
  //       {
  //         name: 'chk1-text',
  //         type: 'text',
  //         label: 'chk1-text',
  //         required: true
  //       }
  //     ],
  //     'chk2': [
  //       {
  //         name: 'chk2-text',
  //         type: 'text',
  //         label: 'chk2-text',
  //         required: true
  //       }
  //     ],
  //     '*': [
  //       {
  //         name: 'checkbox-all-text',
  //         type: 'text',
  //         label: 'checkbox-all-text',
  //         required: true
  //       }
  //     ]
  //   }
  // },
  it("snapshot testing", () => {
    const component = shallow(<Field name="text" type="text" />);
    const tree = shallowToJson(component);
    expect(tree).toMatchSnapshot();
  });

  // eslint-disable-next-line no-undef
  it("renders without crashing", () => {
    const wrapper = document.createElement("div");
    ReactDOM.render(
      <StoreProvider>
        <Field name="text" type="text" />
      </StoreProvider>,
      wrapper
    );
    ReactDOM.unmountComponentAtNode(wrapper);
  });

  it("checkbox field should render without throwing an error", function () {
    const wrapper = mount(
      <StoreProvider>
        <Field
          name="checkbox"
          type="checkbox"
          options={["Checkbox 1", "Checkbox 2"]}
        />
      </StoreProvider>
    );
    expect(wrapper.find("input").length).toBe(2);
  });

  it("Checkbox onChange 1", () => {
    const wrapper = mount(
      <StoreProvider>
        <Field
          name="change-checkbox"
          type="checkbox"
          options={["Checkbox 1", "Checkbox 2"]}
        />
      </StoreProvider>
    );

    expect(wrapper.find("input").length).toBe(2);
    const checkbox = wrapper.find("input").at(0);
    expect(checkbox.prop("value")).toEqual("Checkbox 1");
    expect(checkbox.prop("checked")).toEqual(false);
    checkbox.instance().checked = true;
    checkbox.simulate("change");
    // checkbox.simulate("change", { target: { value: "Checkbox 1", checked: true } });
    // expect(setState).toHaveBeenCalledWith("Checkbox 1");
    expect(setState).toHaveBeenCalledTimes(2);
  });

  it("Checkbox onChange 1", () => {
    const wrapper = mount(
      <StoreProvider>
        <Field
          name="change-checkbox"
          type="checkbox"
          options={["Checkbox 1", "Checkbox 2", "Checkbox 3"]}
          defaultValue={["Checkbox 1", "Checkbox 2"]}
        />
      </StoreProvider>
    );

    expect(wrapper.find("input").length).toBe(3);
    const checkbox1 = wrapper.find("input").at(0);
    const checkbox2 = wrapper.find("input").at(1);
    const checkbox3 = wrapper.find("input").at(2);
    expect(checkbox1.prop("value")).toEqual("Checkbox 1");
    expect(checkbox1.prop("checked")).toEqual(false);
    checkbox1.instance().checked = true;
    checkbox1.simulate("change");
    // checkbox.simulate("change", { target: { value: "Checkbox 1", checked: true } });
    // expect(setState).toHaveBeenCalledWith("Checkbox 1");
    expect(setState).toHaveBeenCalledTimes(2);

    expect(checkbox2.prop("value")).toEqual("Checkbox 2");
    expect(checkbox2.prop("checked")).toEqual(false);
    checkbox2.instance().checked = true;
    checkbox2.simulate("change");
    expect(setState).toHaveBeenCalledTimes(3);

    expect(checkbox3.prop("value")).toEqual("Checkbox 3");
    expect(checkbox3.prop("checked")).toEqual(false);
    checkbox3.instance().checked = true;
    checkbox3.simulate("change");
    expect(setState).toHaveBeenCalledTimes(4);

    checkbox1.instance().checked = false;
    checkbox1.simulate("change");
    expect(setState).toHaveBeenCalledTimes(5);
  });

  it("Checkbox onChange 2", () => {
    const wrapper = mount(
      <StoreProvider>
        <Field label="Checkbox Label" name="change-checkbox" type="checkbox" />
      </StoreProvider>
    );

    expect(wrapper.find("input").length).toBe(1);
    const checkbox = wrapper.find("input").at(0);
    // expect(checkbox.prop("checked")).toEqual(false);
    checkbox.instance().checked = true;
    checkbox.simulate("change");
    // checkbox.simulate("change", { target: { value: "Checkbox 1", checked: true } });
    expect(setState).toHaveBeenCalledWith(true);
    expect(setState).toHaveBeenCalledTimes(2);
    checkbox.instance().checked = false;
    checkbox.simulate("change");
    expect(setState).toHaveBeenCalledWith(false);
    expect(setState).toHaveBeenCalledTimes(3);
  });
});
