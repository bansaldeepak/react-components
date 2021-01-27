import React from "react";
import ReactDOM from "react-dom";
import { shallow, configure, mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { shallowToJson } from "enzyme-to-json";
import { act } from "react-dom/test-utils";

import Form from "../Form";

configure({ adapter: new Adapter() });

describe("Form", () => {
  const setState = jest.fn();
  const useStateSpy = jest.spyOn(React, "useState");
  useStateSpy.mockImplementation((init) => [init, setState]);

  it("snapshot testing", () => {
    let component;
    act(() => {
      component = shallow(
        <Form
          fields={[
            {
              name: "text-multiple",
              type: "text",
              label: "Text",
              placeholder: "Text",
              required: true,
              multiple: true,
            },
          ]}
          initialValues={{
            "text-multiple": ["Text 1", "Text 2"],
          }}
        />
      );
    });

    const tree = shallowToJson(component);
    expect(tree).toMatchSnapshot();
  });

  it("renders without crashing", () => {
    const wrapper = document.createElement("div");
    act(() => {
      ReactDOM.render(
        <Form
          fields={[
            {
              name: "text-multiple",
              type: "text",
              label: "Text",
              placeholder: "Text",
              required: true,
              multiple: true,
            },
          ]}
          initialValues={{
            "text-multiple": ["Text 1", "Text 2"],
          }}
        />,
        wrapper
      );
    });
    ReactDOM.unmountComponentAtNode(wrapper);
  });

  it("should set form", () => {
    const wrapper = mount(
      <Form
        fields={[
          {
            name: "text-multiple",
            type: "text",
            label: "Text",
            placeholder: "Text",
            required: true,
            multiple: true,
          },
        ]}
      />
    );
    expect(wrapper.find("input").length).toBe(1);
  });

  it("should set initialValues prop", () => {
    const wrapper = mount(
      <Form
        fields={[
          {
            name: "text-multiple",
            type: "text",
            label: "Text",
            placeholder: "Text",
            required: true,
            multiple: true,
          },
        ]}
        initialValues={{
          "text-multiple": ["Text 1", "Text 2"],
        }}
      />
    );

    expect(wrapper.find("input").length).toBe(2);
    expect(wrapper.find("input").at(0).prop("defaultValue")).toEqual("Text 1");
    expect(wrapper.find("input").at(0).prop("type")).toEqual("text");
    expect(wrapper.find("input").at(1).prop("defaultValue")).toEqual("Text 2");
    expect(wrapper.find("input").at(1).prop("type")).toEqual("text");
  });

  it("should simulate form submit", () => {
    let submitData;
    const wrapper = mount(
      <Form
        title="Form"
        fields={[
          {
            name: "text-multiple",
            type: "text",
            label: "Text",
            placeholder: "Text",
            required: true,
            multiple: true,
          },
        ]}
        initialValues={{
          "text-multiple": ["Text 1", "Text 2"],
        }}
        onSubmit={(formData) => {
          submitData = formData;
        }}
      />
    );

    expect(wrapper.find("input").length).toBe(2);
    const form = wrapper.find("form").at(0);
    form.simulate("submit");
    expect(setState).toHaveBeenCalledWith(true);
    expect(setState).toHaveBeenCalledTimes(1);
    expect(submitData["text-multiple"][0]).toEqual("Text 1");
    expect(submitData["text-multiple"][1]).toEqual("Text 2");
  });

  it("should set initialValues prop using function", () => {
    const wrapper = mount(
      <Form
        fields={[
          {
            name: "text-multiple",
            type: "text",
            label: "Text",
            placeholder: "Text",
            required: true,
            multiple: true,
          },
        ]}
        initialValues={() => ({
          "text-multiple": ["Text 1", "Text 2"],
        })}
      />
    );

    // expect(wrapper.find("input").length).toBe(2);
    // expect(wrapper.find("input").at(0).prop("type")).toEqual("text");
    // expect(wrapper.find("input").at(0).prop("defaultValue")).toEqual("Text 1");
    // expect(wrapper.find("input").at(1).prop("type")).toEqual("text");
    // expect(wrapper.find("input").at(1).prop("defaultValue")).toEqual("Text 2");
  });

  it("should simulate form submit with errors", () => {
    let formErrors;
    const wrapper = mount(
      <Form
        title="Form"
        fields={[
          {
            name: "email",
            type: "email",
            label: "Text",
            placeholder: "Text",
            required: true,
          },
        ]}
        onError={(errors) => {
          formErrors = errors;
        }}
      />
    );

    expect(wrapper.find("input").length).toBe(1);
    const form = wrapper.find("form").at(0);
    form.simulate("submit");
    expect(setState).toHaveBeenCalledWith(true);
    expect(setState).toHaveBeenCalledTimes(1);

    expect(formErrors.email.error).toBe(true);
    expect(formErrors.email.errorMessage).toEqual("Please enter a value!");
  });
});
