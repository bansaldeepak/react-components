import { validate } from "../index";

describe("validate/required", () => {
  const fieldProps = {
    required: true,
  };
  it("Default False Case", () => {
    const { error, errorMessage } = validate(fieldProps, "");

    expect(error).toBe(true);
    expect(errorMessage).toBe("Please enter a value!");
  });

  it("Select False Case", () => {
    const { error, errorMessage } = validate(
      { type: "select", ...fieldProps },
      ""
    );

    expect(error).toBe(true);
    expect(errorMessage).toBe("Please select an option!");
  });

  it("True Case", () => {
    const { error, errorMessage } = validate(fieldProps, "test@test.com");

    expect(error).toBe(false);
  });
});

describe("validate/email", () => {
  const fieldProps = {
    type: "email",
  };
  it("False Case", () => {
    const { error, errorMessage } = validate(fieldProps, "test");

    expect(error).toBe(true);
    expect(errorMessage).toBe("Value must be a valid email");
  });

  it("True Case", () => {
    const { error, errorMessage } = validate(fieldProps, "test@test.com");

    expect(error).toBe(false);
  });
});

describe("validate/url", () => {
  const fieldProps = {
    type: "url",
  };
  it("False Case", () => {
    const { error, errorMessage } = validate(fieldProps, "test");

    expect(error).toBe(true);
    expect(errorMessage).toBe("Value must be a valid url");
  });

  it("True Case", () => {
    const { error, errorMessage } = validate(fieldProps, "www.opensource.com");

    expect(error).toBe(false);
  });
});

describe("validate/decimal", () => {
  const fieldProps = {
    type: "decimal",
  };
  it("False Case", () => {
    const { error, errorMessage } = validate(fieldProps, "test");

    expect(error).toBe(true);
    expect(errorMessage).toBe("Value must be a valid decimal");
  });

  it("True Case", () => {
    const { error, errorMessage } = validate(fieldProps, "2.2");

    expect(error).toBe(false);
  });
});

describe("validate/boolean", () => {
  const fieldProps = {
    type: "boolean",
  };
  it("False Case", () => {
    const { error, errorMessage } = validate(fieldProps, "test");

    expect(error).toBe(true);
    expect(errorMessage).toBe("Value must be a boolean");
  });

  it("True Case", () => {
    const { error, errorMessage } = validate(fieldProps, "true");

    expect(error).toBe(false);
  });
});

describe("validate/switch", () => {
  const fieldProps = {
    type: "switch",
  };
  it("False Case", () => {
    const { error, errorMessage } = validate(fieldProps, "test");

    expect(error).toBe(true);
    expect(errorMessage).toBe("Value must be a boolean");
  });

  it("True Case", () => {
    const { error, errorMessage } = validate(fieldProps, "true");

    expect(error).toBe(false);
  });
});

describe("validate/postal", () => {
  const fieldProps = {
    type: "postal",
  };
  it("False Case", () => {
    const { error, errorMessage } = validate(fieldProps, "test");

    expect(error).toBe(true);
    expect(errorMessage).toBe("Value must be a postal code");
  });

  it("True Case", () => {
    const { error, errorMessage } = validate(fieldProps, "151301");

    expect(error).toBe(false);
  });
});

describe("validate/date", () => {
  const fieldProps = {
    type: "date",
    format: "YYYY/MM/DD",
  };
  it("False Case 1", () => {
    const { error, errorMessage } = validate(fieldProps, "test");

    expect(error).toBe(true);
    expect(errorMessage).toBe("Value must be a valid date");
  });

  it("False Case 2", () => {
    const { error, errorMessage } = validate(fieldProps, "28/06/2020");

    expect(error).toBe(true);
    expect(errorMessage).toBe("Value must be a valid date");
  });

  it("False Case 3", () => {
    const { error, errorMessage } = validate({ type: "date" }, "test");

    expect(error).toBe(true);
    expect(errorMessage).toBe("Value must be a valid date");
  });

  it("True Case 1", () => {
    const { error } = validate(fieldProps, "2020/06/28");

    expect(error).toBe(false);
  });

  it("True Case 2", () => {
    const { error } = validate({ type: "date" }, "2020/06/28");

    expect(error).toBe(false);
  });
});

describe("validate/float", () => {
  const fieldProps = {
    type: "float",
  };

  it("False Case 1", () => {
    const { error, errorMessage } = validate(fieldProps, "test");

    expect(error).toBe(true);
    expect(errorMessage).toBe("Value must be a float");
  });

  it("False Case 2", () => {
    const { error, errorMessage } = validate(
      { ...fieldProps, min: 2.22 },
      "1.02"
    );

    expect(error).toBe(true);
    expect(errorMessage).toBe("Value must be greater than 2.22");
  });

  it("False Case 3", () => {
    const { error, errorMessage } = validate(
      { ...fieldProps, min: 2.0, max: 5.0 },
      "1.02"
    );

    expect(error).toBe(true);
    expect(errorMessage).toBe("Value must be between 2 and 5");
  });

  it("False Case 4", () => {
    const { error, errorMessage } = validate(
      { ...fieldProps, max: 1.0 },
      "1.02"
    );

    expect(error).toBe(true);
    expect(errorMessage).toBe("Value must be less than 1");
  });

  it("True Case 1", () => {
    const { error, errorMessage } = validate(fieldProps, "10.2");
    expect(error).toBe(false);
  });

  it("True Case 2", () => {
    const { error, errorMessage } = validate(
      { min: "1.1", max: "10.1", ...fieldProps },
      "9.02"
    );

    expect(error).toBe(false);
  });

  it("True Case 3", () => {
    const { error, errorMessage } = validate(
      { min: "1.1", ...fieldProps },
      "1.2"
    );
    expect(error).toBe(false);
  });

  it("True Case 4", () => {
    const { error, errorMessage } = validate(
      { ...fieldProps, max: "20.0" },
      "10.2"
    );
    expect(error).toBe(false);
  });
});

describe("validate/integer", () => {
  const fieldProps = {
    type: "integer",
  };

  it("False Case 1", () => {
    const { error, errorMessage } = validate(fieldProps, "test");

    expect(error).toBe(true);
    expect(errorMessage).toBe("Value must be a integer");
  });

  it("False Case 2", () => {
    const { error, errorMessage } = validate({ ...fieldProps, min: 2 }, "1");

    expect(error).toBe(true);
    expect(errorMessage).toBe("Value must be greater than 2");
  });

  it("False Case 3", () => {
    const { error, errorMessage } = validate(
      { ...fieldProps, min: 2, max: 5 },
      "1"
    );

    expect(error).toBe(true);
    expect(errorMessage).toBe("Value must be between 2 and 5");
  });

  it("False Case 4", () => {
    const { error, errorMessage } = validate({ ...fieldProps, max: 1 }, "2");

    expect(error).toBe(true);
    expect(errorMessage).toBe("Value must be less than 1");
  });

  it("True Case 1", () => {
    const { error, errorMessage } = validate(fieldProps, "10");
    expect(error).toBe(false);
  });

  it("True Case 2", () => {
    const { error, errorMessage } = validate(
      { min: 1, max: 10, ...fieldProps },
      "9"
    );

    expect(error).toBe(false);
  });

  it("True Case 3", () => {
    const { error, errorMessage } = validate({ min: "1", ...fieldProps }, "1");
    expect(error).toBe(false);
  });

  it("True Case 4", () => {
    const { error, errorMessage } = validate(
      { ...fieldProps, max: "20" },
      "10"
    );
    expect(error).toBe(false);
  });
});

describe("validate/default", () => {
  it("False Case 1", () => {
    const { error, errorMessage } = validate({ min: 1, max: 10 }, "test");

    expect(error).toBe(true);
    expect(errorMessage).toBe("Value must be between 1 and 10");
  });

  it("True Case 1", () => {
    const { error, errorMessage } = validate({ min: 1, max: 10 }, "10");
    expect(error).toBe(false);
  });

  it("False Case 2", () => {
    const { error, errorMessage } = validate({ min: 2 }, "1");

    expect(error).toBe(true);
    expect(errorMessage).toBe("Value must be greater than 2");
  });

  it("True Case 2", () => {
    const { error, errorMessage } = validate({ min: 1 }, "9");

    expect(error).toBe(false);
  });

  it("False Case 3", () => {
    const { error, errorMessage } = validate({ max: 5 }, "6");

    expect(error).toBe(true);
    expect(errorMessage).toBe("Value must be less than 5");
  });

  it("True Case 3", () => {
    const { error, errorMessage } = validate({ max: 5 }, "1");
    expect(error).toBe(false);
  });

  it("False Case 4", () => {
    const { error, errorMessage } = validate(
      { minlength: 1, maxlength: 10 },
      ""
    );

    expect(error).toBe(true);
    expect(errorMessage).toBe("Characters length must be between 1 and 10");
  });

  it("True Case 5", () => {
    const { error, errorMessage } = validate(
      { minlength: 1, maxlength: 10 },
      "test"
    );
    expect(error).toBe(false);
  });

  it("False Case 5", () => {
    const { error, errorMessage } = validate({ minlength: 2 }, "t");

    expect(error).toBe(true);
    expect(errorMessage).toBe("Minimum length of charcters is 2");
  });

  it("True Case 5", () => {
    const { error, errorMessage } = validate({ minlength: 4 }, "test");

    expect(error).toBe(false);
  });

  it("False Case 6", () => {
    const { error, errorMessage } = validate({ maxlength: 5 }, "hello world");

    expect(error).toBe(true);
    expect(errorMessage).toBe("Maximum length of charcters is 5");
  });

  it("True Case 6", () => {
    const { error, errorMessage } = validate({ maxlength: 5 }, "hello");
    expect(error).toBe(false);
  });
});

describe("validate/pattern", () => {
  it("False Case 1", () => {
    const { error, errorMessage } = validate({ pattern: /^[0-9\b]+$/ }, "test");

    expect(error).toBe(true);
    expect(errorMessage).toBe("Value does not match given pattern");
  });

  it("True Case 1", () => {
    const { error, errorMessage } = validate({ pattern: /^[0-9\b]+$/ }, "10");
    expect(error).toBe(false);
  });
});

describe("validate/validate", () => {
  it("False Case 1", () => {
    const { error, errorMessage } = validate(
      {
        validate: (value) => {
          return value === "hello";
        },
      },
      "test"
    );

    expect(error).toBe(true);
    expect(errorMessage).toBe("Please provide valid value.");
  });

  it("True Case 1", () => {
    const { error, errorMessage } = validate(
      {
        validate: (value) => {
          return value === "hello";
        },
      },
      "hello"
    );
    expect(error).toBe(false);
  });
});

describe("validate/section", () => {
  it("False Case 1", () => {
    const { error, errorMessage } = validate(
      {
        type: "section",
        fields: [
          {
            name: "text",
            required: true,
          },
          {
            name: "number",
            required: true,
          },
        ],
      },
      "test"
    );

    expect(error).toBe(true);
    expect(errorMessage).toBe("Please fill section details!");
  });

  it("True Case 1", () => {
    const { error, errorMessage } = validate(
      {
        name: "section",
        type: "section",
        fields: [
          {
            name: "text",
          },
          {
            name: "number",
          },
        ],
      },
      {
        section: {
          text: "text",
          number: "number",
        },
      }
    );

    expect(error).toBe(false);
  });
});

describe("validate/multiple", () => {
  it("False Case 1", () => {
    const { error, errorMessage } = validate(
      {
        type: "email",
        multiple: true,
        required: true,
      },
      ""
    );

    expect(error).toBe(true);
    expect(errorMessage).toBe("Please enter a value!");
  });

  it("False Case 2", () => {
    const { error, errorMessage } = validate(
      {
        type: "email",
        multiple: true,
      },
      ["test1"]
    );

    expect(error).toBe(true);
    expect(errorMessage).toBe("Please enter a value!");
  });

  it("True Case", () => {
    const { error, errorMessage } = validate(
      {
        type: "email",
        multiple: true,
      },
      ["test1@test.com", "test2@test.com"]
    );

    expect(error).toBe(false);
  });

  it("False Case 3", () => {
    const { error, errorMessage } = validate(
      {
        type: "section",
        multiple: true,
        fields: [
          {
            name: "email",
            type: "email",
          },
          {
            name: "select",
            type: "select",
            options: ["Select 1", "Select 2"],
            required: true,
          },
          {
            name: "select2",
            type: "select",
            options: ["Select 1", "Select 2"],
            required: true,
            multiple: true,
          },
        ],
      },
      [
        {
          email: "test1",
          select: "",
        },
      ]
    );

    expect(error).toBe(true);
    expect(errorMessage).toBe("Please fill section details!");
  });

  it("True Case 3", () => {
    const { error, errorMessage } = validate(
      {
        type: "section",
        multiple: true,
        fields: [
          {
            name: "email",
            type: "email",
          },
          {
            name: "select",
            type: "select",
            options: ["Select 1", "Select 2"],
            required: true,
          },
          {
            name: "select2",
            type: "select",
            options: ["Select 1", "Select 2", "Select 3"],
            required: true,
            multiple: true,
          },
        ],
      },
      [
        {
          email: "test@test.com",
          select: "Select 1",
          select2: ["Select 1", "Select 3"],
        },
      ]
    );

    expect(error).toBe(false);
  });

  it("False Case 4", () => {
    const { error, errorMessage } = validate(
      {
        type: "section",
        multiple: true,
        required: true,
        fields: [
          {
            name: "email",
            type: "email",
          },
          {
            name: "select",
            type: "select",
            options: ["Select 1", "Select 2"],
            required: true,
          },
          {
            name: "select2",
            type: "select",
            options: ["Select 1", "Select 2"],
            required: true,
            multiple: true,
          },
        ],
      },
      []
    );

    expect(error).toBe(true);
    expect(errorMessage).toBe("Please fill section details!");
  });

  it("False Case 5", () => {
    const { error, errorMessage } = validate(
      {
        type: "section",
        multiple: true,
        required: true,
        fields: [
          {
            name: "email",
            type: "email",
          },
          {
            name: "select",
            type: "select",
            options: ["Select 1", "Select 2"],
            required: true,
          },
          {
            name: "select2",
            type: "select",
            options: ["Select 1", "Select 2"],
            required: true,
            multiple: true,
          },
        ],
      },
      [
        {
          email: "test1",
          select: "",
        },
      ]
    );

    expect(error).toBe(true);
    expect(errorMessage).toBe("Please fill section details!");
  });
});

// {
//   'text-multiple': [
//     'Text 1',
//     'Text 2'
//   ]
// }
