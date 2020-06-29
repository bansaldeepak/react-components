import { getInputProps } from "../index";

describe("properties/getInputProps 1", () => {
  const fieldProps = {
    data: {},
    min: 10,
    max: 200,
    step: 1,
    title: () => "title",
    minlength: 10,
    maxlength: 20,
    disabled: () => true,
    readonly: () => false,
    prefix: "Hi",
    suffix: "Bye",
    error: () => false,
    validate: () => false,
    label: "label",
    helptext: "helptext",
    helplink: "helplink",
    placeholder: "placeholder",
  };
  it("Default False Case", async () => {
    const props = await getInputProps(fieldProps);

    expect(props.title).toBe("title");
    expect(props.error).toBe(false);
    expect(props.validate).toBe(false);
    expect(props.label).toBe("label");
    expect(props.helptext).toBe("helptext");
    expect(props.helplink).toBe("helplink");
    expect(props.placeholder).toBe("placeholder");
    expect(props.InputProps.disabled).toBe(true);
    expect(props.InputProps.readOnly).toBe(false);
    expect(props.InputProps.startAdornment).toBe("Hi");
    expect(props.InputProps.endAdornment).toBe("Bye");
    expect(props.InputProps.inputProps.min).toBe(10);
    expect(props.InputProps.inputProps.max).toBe(200);
    expect(props.InputProps.inputProps.step).toBe(1);
    expect(props.InputProps.inputProps.title).toBe("title");
    expect(props.InputProps.inputProps.minLength).toBe(10);
    expect(props.InputProps.inputProps.maxLength).toBe(20);
  });
});

describe("properties/getInputProps 2", () => {
  const fieldProps = {
    data: {},
    min: 10,
    max: 200,
    step: 1,
    title: () => "title",
    minlength: 10,
    maxlength: 20,
    error: () => false,
    validate: () => false,
    label: "label",
    helptext: "helptext",
    helplink: "helplink",
    placeholder: "placeholder",
  };
  it("Default False Case", async () => {
    const props = await getInputProps(fieldProps);

    expect(props.title).toBe("title");
    expect(props.error).toBe(false);
    expect(props.validate).toBe(false);
    expect(props.label).toBe("label");
    expect(props.helptext).toBe("helptext");
    expect(props.helplink).toBe("helplink");
    expect(props.placeholder).toBe("placeholder");
    expect(props.InputProps.inputProps.min).toBe(10);
    expect(props.InputProps.inputProps.max).toBe(200);
    expect(props.InputProps.inputProps.step).toBe(1);
    expect(props.InputProps.inputProps.title).toBe("title");
    expect(props.InputProps.inputProps.minLength).toBe(10);
    expect(props.InputProps.inputProps.maxLength).toBe(20);
  });
});
