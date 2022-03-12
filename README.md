# react-component-stack

React.js based Table & Form components.

## Example

Form example form inputs:

```js
import React from "react";

// *https://www.registers.service.gov.uk/registers/country/use-the-api*
import fetch from "cross-fetch";

import logo from "./logo.svg";
import "./App.css";
import { Form as FormComponent } from "react-component-stack";

function sleep(delay = 0) {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
}

const fields = [
  {
    name: "autocomplete",
    type: "autocomplete",
    label: "Autocomplete with dynamic list",
    required: true,
    options: async (brandData) => {
      if (brandData) {
        const response = await fetch(
          "https://country.register.gov.uk/records.json?page-size=5000"
        );
        await sleep(1e3); // For demo purposes.
        const countries = await response.json();
        const formattedResponse = Object.keys(countries).map(
          (key) => countries[key].item[0]
        );
        const results = formattedResponse.filter((obj) => {
          return Object.keys(obj).reduce((acc, curr) => {
            return acc || obj[curr].toLowerCase().includes(brandData);
          }, false);
        });
        return results;
      }

      return [];
    },
    optionKey: "country",
    optionValue: "name",
  },
  {
    name: "text",
    type: "text",
    label: "Text",
    placeholder: "Text",
    required: true,
  },
  {
    name: "textarea",
    type: "textarea",
    label: "Textarea",
    placeholder: "Textarea",
    required: true,
  },
  {
    name: "number",
    type: "number",
    label: "Number",
    placeholder: "Number",
    required: true,
  },
  {
    name: "range",
    type: "range",
    label: "range",
    placeholder: "range",
    required: true,
    min: 0,
    max: 10,
  },
  {
    name: "select",
    type: "select",
    label: "select",
    placeholder: "select",
    required: true,
    options: ["India", "Australia"],
  },
  {
    name: "checkbox",
    type: "checkbox",
    label: "checkbox",
    placeholder: "checkbox",
    required: true,
    options: [
      { value: "chk1", label: "Checkbox 1" },
      { value: "chk2", label: "Checkbox 2" },
    ],
  },
  {
    name: "radio",
    type: "radio",
    label: "radio",
    placeholder: "radio",
    required: true,
    options: [
      { value: "opt1", label: "Option 1" },
      { value: "opt2", label: "Option 2" },
    ],
  },
];

const buttons = [{ type: "submit", label: "Create", color: "secondary" }];

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      <FormComponent
        novalidate={true}
        fields={fields}
        buttons={buttons}
        onSubmit={(formData) => {
          console.log("Form onSubmit", formData);
        }}
      />
    </div>
  );
}

export default App;
```

Form Section Fields:

```js
import React from "react";

import logo from "./logo.svg";
import "./App.css";
import { Form as FormComponent } from "react-component-stack";

const fields = [
  {
    name: "address",
    type: "section",
    label: "Address",
    required: true,
    fields: [
      {
        name: "line_1",
        type: "text",
        label: "Address Line 1",
        placeholder: "Address Line 1",
        required: true,
      },
      {
        name: "line_2",
        type: "text",
        label: "Address Line 2",
        placeholder: "Address Line 2",
        required: true,
      },
      {
        name: "city",
        type: "text",
        label: "City",
        placeholder: "City",
        required: true,
      },
      {
        name: "state",
        type: "text",
        label: "State",
        placeholder: "State",
        required: true,
      },
      {
        name: "country",
        type: "select",
        label: "Country",
        placeholder: "Country",
        required: true,
        options: ["India", "Australia"],
      },
    ],
  },
  {
    name: "list",
    type: "section",
    label: "List",
    required: true,
    multiple: true,
    fields: [
      {
        name: "name",
        type: "text",
        label: "List Name",
        placeholder: "List Name",
        required: true,
      },
      {
        name: "content",
        type: "text",
        label: "Content",
        placeholder: "Content",
        required: true,
      },
    ],
  },
];

const buttons = [{ type: "submit", label: "Create", color: "secondary" }];

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      <FormComponent
        novalidate={true}
        fields={fields}
        buttons={buttons}
        onSubmit={(formData) => {
          console.log("Form onSubmit", formData);
        }}
      />
    </div>
  );
}

export default App;
```

Table example:

```js
import React from "react";

import logo from "./logo.svg";
import "./App.css";
import { Table as TableComponent } from "react-component-stack";

const tableData = {
  columns: [
    { name: "name", label: "Name", type: "text", sort: true, filter: true },
    { name: "status", label: "Status", type: "text", sort: true, filter: true },
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
  rowsCount: 3,
};

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      <TableComponent {...tableData} />
    </div>
  );
}

export default App;
```
