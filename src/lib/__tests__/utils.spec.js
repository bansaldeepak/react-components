import {
  isDefined,
  isEmpty,
  isArray,
  isFunction,
  isMobile,
  isPromise,
  times,
  getUniqueArray,
  getValueFromJson,
  isObject,
} from "../index";

describe("Utils/isDefined", () => {
  it("False Case", () => {
    const unDefinedVar = undefined;
    const unDefinedResult = isDefined(unDefinedVar);

    expect(unDefinedResult).toBe(false);
  });

  it("True Case", () => {
    const definedVar = "defined";
    const definedResult = isDefined(definedVar);

    expect(definedResult).toBe(true);
  });
});

describe("Utils/isEmpty", () => {
  it("True Case 1", () => {
    const emptyVar = "";
    const emptyResult = isEmpty(emptyVar);

    expect(emptyResult).toBe(true);
  });

  it("True Case 2", () => {
    const emptyVar = null;
    const emptyResult = isEmpty(emptyVar);

    expect(emptyResult).toBe(true);
  });

  it("True Case 3", () => {
    const emptyVar = undefined;
    const emptyResult = isEmpty(emptyVar);

    expect(emptyResult).toBe(true);
  });

  it("False Case", () => {
    const emptyVar = "test";
    const emptyResult = isEmpty(emptyVar);

    expect(emptyResult).toBe(false);
  });
});

describe("Utils/isArray", () => {
  it("False Case", () => {
    const arrayVar = "";
    const arrayResult = isArray(arrayVar);

    expect(arrayResult).toBe(false);
  });

  it("True Case", () => {
    const arrayVar = [];
    const arrayResult = isArray(arrayVar);

    expect(arrayResult).toBe(true);
  });
});

describe("Utils/isFunction", () => {
  it("False Case", () => {
    const functionVar = "";
    const functionResult = isFunction(functionVar);

    expect(functionResult).toBe(false);
  });

  it("True Case", () => {
    const functionVar = () => {};
    const functionResult = isFunction(functionVar);

    expect(functionResult).toBe(true);
  });
});

describe("Utils/isMobile", () => {
  it("True Case", () => {
    const isMobileResult = isMobile();

    expect(isMobileResult).toBe(true);
  });
});

describe("Utils/isPromise", () => {
  it("False Case", () => {
    const functionVar = () => {};
    const functionResult = isPromise(functionVar);

    expect(functionResult).toBe(false);
  });

  it("True Case", () => {
    const functionVar = new Promise(() => {});
    const functionResult = isPromise(functionVar);

    expect(functionResult).toBe(true);
  });
});

describe("Utils/times", () => {
  it("Run Times", () => {
    const functionVar = () => "test";
    const functionResult = times(5, functionVar);

    expect(isArray(functionResult)).toBe(true);
    expect(functionResult.length).toBe(5);
  });
});

describe("Utils/getUniqueArray", () => {
  it("Run getUniqueArray", () => {
    const arrayVar = [
      {
        name: "test",
      },
      {
        name: "test2",
      },
      {
        name: "test3",
      },
      {
        name: "test4",
      },
      {
        name: "test2",
      },
      {
        name: "test3",
      },
    ];
    const getUniqueArrayResult = getUniqueArray(arrayVar, "name");

    expect(isArray(getUniqueArrayResult)).toBe(true);
    expect(getUniqueArrayResult.length).toBe(4);
  });
});

describe("Utils/getValueFromJson", () => {
  it("Run getValueFromJson 1", () => {
    const jsonObj = {
      name: "Components",
      language: "JavaScript",
      tags: undefined,
      components: [
        {
          name: "form",
        },
        {
          name: "table",
        },
      ],
    };
    const path1 = "name";
    const path2 = "language";
    const path3 = "components.0.name";
    const path4 = "components.1.name";
    const path5 = "version";
    const path6 = "components.2.name";
    const path7 = "tags";
    const getValueFromJsonResult1 = getValueFromJson(jsonObj, path1);
    const getValueFromJsonResult2 = getValueFromJson(jsonObj, path2);
    const getValueFromJsonResult3 = getValueFromJson(jsonObj, path3);
    const getValueFromJsonResult4 = getValueFromJson(jsonObj, path4);
    const getValueFromJsonResult5 = getValueFromJson(jsonObj, path5);
    const getValueFromJsonResult6 = getValueFromJson(jsonObj, path6);
    const getValueFromJsonResult7 = getValueFromJson(jsonObj, path7);

    expect(getValueFromJsonResult1).toBe("Components");
    expect(getValueFromJsonResult2).toBe("JavaScript");
    expect(getValueFromJsonResult3).toBe("form");
    expect(getValueFromJsonResult4).toBe("table");
    expect(getValueFromJsonResult5).toBeUndefined();
    expect(getValueFromJsonResult6).toBeUndefined();
    expect(getValueFromJsonResult7).toBeUndefined();
  });

  it("Run getValueFromJson 2", () => {
    const jsonObj = "";
    const path1 = "name";
    const getValueFromJsonResult1 = getValueFromJson(jsonObj, path1);

    expect(getValueFromJsonResult1).toBeUndefined();
  });

  it("Run getValueFromJson 3", () => {
    const jsonObj = {};
    const path1 = undefined;
    const getValueFromJsonResult1 = getValueFromJson(jsonObj, path1);

    expect(getValueFromJsonResult1).toBeUndefined();
  });
});

describe("Utils/isObject", () => {
  it("False Case", () => {
    const objVar1 = null;
    const objResult1 = isObject(objVar1);

    const objVar2 = "";
    const objResult2 = isObject(objVar2);

    expect(objResult1).toBe(false);
    expect(objResult2).toBe(false);
  });

  it("True Case", () => {
    const objVar = {};
    const objResult = isObject(objVar);

    expect(objResult).toBe(true);
  });
});
