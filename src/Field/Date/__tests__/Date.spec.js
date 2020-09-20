import React from "react";
import { shallow, configure, mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { shallowToJson } from "enzyme-to-json";
import Date from "../Date";

configure({ adapter: new Adapter() });

describe("Date", () => {
  const setState = jest.fn();
  const useStateSpy = jest.spyOn(React, "useState");
  useStateSpy.mockImplementation((init) => [init, setState]);

  it("Render Date with default options", () => {
    const component = shallow(<Date name="date" />);
    const tree = shallowToJson(component);
    expect(tree).toMatchSnapshot();
  });

  it("Date onChange", function () {
    const wrapper = mount(<Date name="date" />, { attachTo: document.body });

    expect(wrapper.find("input").length).toBe(1);
    const dateField = wrapper.find("input").at(0);
    // dateField.prop('onFocus')();
    // dateField.simulate("change", { target: { value: "opt" } });
    console.log('dateField.prop("value")', dateField.prop("value"));
    dateField.simulate("change");

    console.log(
      "MuiPickersModal-dialogRoot",
      wrapper.find(".MuiPickersModal-dialogRoot").length
    );

    if (wrapper.find(".MuiPickersModal-dialogRoot").length > 0) {
      const dateDialog = wrapper.find(".MuiPickersModal-dialogRoot").at(0);

      console.log(
        "MuiButton-textPrimary",
        dateDialog.find(".MuiButton-textPrimary").length
      );
      const dateDialogButton = dateDialog.find(".MuiButton-textPrimary").at(1);

      console.log(
        "MuiPickersCalendar-week",
        dateDialog.find(".MuiPickersCalendar-week").length
      );
      const dateWeek = dateDialog.find(".MuiPickersCalendar-week").at(2);

      console.log(
        "MuiPickersDay-day",
        dateWeek.find(".MuiPickersDay-day").length
      );
      const dateDay = dateWeek.find(".MuiPickersDay-day").at(0);

      console.log("MuiPickersDay-day", dateDay.find("p").length);
      const dateDayText = dateWeek.find("p").at(0);
      console.log("dateDayText", dateDayText.prop("children"));

      dateDay.simulate("click");
      dateDialogButton.simulate("click");

      // expect(setState).toHaveBeenCalledWith("New Value");
      // expect(setState).toHaveBeenCalledTimes(1);

      console.log('dateField.prop("value")', dateField.prop("value"));
      console.log("dateField.props()", dateField.props());
      // expect(setState).toHaveBeenCalledWith("Checkbox 1");
      // expect(setState).toHaveBeenCalledTimes(2);
    } else {
      console.log("Picker Didn't open");
    }
  });
});
