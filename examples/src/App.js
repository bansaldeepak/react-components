import React from "react";

// *https://www.registers.service.gov.uk/registers/country/use-the-api*
import fetch from "cross-fetch";

import logo from "./logo.svg";
import "./App.css";
import { Form as FormComponent } from "react-component-stack";
import { Table as TableComponent } from "react-component-stack";

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
    options: ["Opt1", "Opt2", "Opt3", "Chk1", "Cho", "cha", "abc", "12345"],
    // options: (async (brandData) => {
    //   if (brandData) {
    //     const response = await fetch('https://country.register.gov.uk/records.json?page-size=5000');
    //     await sleep(1e3); // For demo purposes.
    //     const countries = await response.json();
    //     const formattedResponse = Object.keys(countries).map((key) => countries[key].item[0]);
    //     const results = formattedResponse.filter((obj) => {
    //       return Object.keys(obj).reduce((acc, curr) => {
    //         return acc || obj[curr].toLowerCase().includes(brandData);
    //       }, false);
    //     });
    //     return results;
    //   }

    //   return [];
    // }),
    // optionKey: 'country', optionValue: 'name'
  },
  {
    name: "date",
    type: "date",
    label: "Date",
    placeholder: "Date",
    required: true,
  },
  // {name: 'text', type: 'text', label: 'Text', placeholder: 'Text', required: true, description: 'This is text field'},
  // {name: 'email', type: 'email', label: 'Email', placeholder: 'Email', required: true},
  // {name: 'url', type: 'url', label: 'URL', placeholder: 'URL', required: true},
  // {name: 'default1'},
  // {name: 'default2', defaultValue:['Default Text 1', 'Default Text 2'], multiple: true},
  // {name: 'default3', options: ["Option 1", "Option 2"]},
  // {name: 'default4', options: ["Option 1", "Option 2"], multiple: true},
  // {name: 'textarea', type: 'textarea', label: 'Textarea', placeholder: 'Textarea', required: true},
  // {name: 'number', type: 'number', label: 'Number', placeholder: 'Number', required: true},
  // {name: 'range', type: 'range', label: 'range', placeholder: 'range', required: true, min: 0, max: 10},
  {
    name: "select1",
    type: "select",
    label: "Select 1",
    placeholder: "Select 1",
    required: true,
    options: ["India", "Australia"],
  },
  {
    name: "select2",
    type: "select",
    label: "Select 2",
    placeholder: "Select 2",
    required: true,
    options: () => ["Select 1", "Select 2"],
  },
  // {name: 'checkbox', type: 'checkbox', label: 'checkbox 1', placeholder: 'checkbox 1', required: true, options: ["Checkbox 1", "Checkbox 2"]},
  // {
  //   name: 'multiselect',
  //   type: 'select',
  //   label: 'Multiselect',
  //   placeholder: 'Multiselect',
  //   required: true,
  //   options: ['India', 'Australia'],
  //   multiple: true
  // },
  // {name: 'switch', type: 'switch', label: 'switch', placeholder: 'switch', required: true},
  // {name: 'boolean', type: 'boolean', label: 'boolean', placeholder: 'boolean', required: true},
  // {name: 'checkbox1', type: 'checkbox', label: 'checkbox 1', placeholder: 'checkbox 1', required: true},
  {
    name: "checkbox2",
    type: "checkbox",
    label: "checkbox 2",
    placeholder: "checkbox 2",
    required: true,
    options: [
      { value: "chk1", label: "Checkbox 1" },
      { value: "chk2", label: "Checkbox 2" },
    ],
    dependencies: {
      chk1: [
        {
          name: "chk1-text",
          type: "text",
          label: "chk1-text",
          required: true,
        },
      ],
      chk2: [
        {
          name: "chk2-text",
          type: "text",
          label: "chk2-text",
          required: true,
        },
      ],
      "*": [
        {
          name: "checkbox-all-text",
          type: "text",
          label: "checkbox-all-text",
          required: true,
        },
      ],
    },
  },
  // {name: 'toggle', type: 'toggle', label: 'toggle', placeholder: 'toggle', required: true, options: [{value: 'toggle1', label: 'toggle 1'}, {value: 'toggle2', label: 'toggle 2'}, {value: 'toggle3', label: 'toggle 3'}]},
  // {
  //   name: 'radio', type: 'radio', label: 'radio', placeholder: 'radio', required: true, options: [{value: 'opt1', label: 'Option 1'}, {value: 'opt2', label: 'Option 2'}],
  //   dependencies: {
  //     'opt1': [
  //       {
  //         name: 'opt1-text',
  //         type: 'text',
  //         label: 'opt1-text',
  //         required: true
  //       }
  //     ],
  //     'opt2': [
  //       {
  //         name: 'opt2-text',
  //         type: 'text',
  //         label: 'opt2-text',
  //         required: true
  //       }
  //     ],
  //     '*': [
  //       {
  //         name: 'radio-all-text',
  //         type: 'text',
  //         label: 'radio-all-text',
  //         required: true
  //       }
  //     ]
  //   }
  // },
  // {
  //   name: 'address',
  //   type: 'section',
  //   label: 'Address',
  //   required: true,
  //   fields: [
  //     {
  //       name: 'line_1',
  //       type: 'text',
  //       label: 'Address Line 1',
  //       placeholder: 'Address Line 1',
  //       required: true
  //     },
  //     {
  //       name: 'line_2',
  //       type: 'text',
  //       label: 'Address Line 2',
  //       placeholder: 'Address Line 2',
  //       required: true
  //     },
  //     {
  //       name: 'city',
  //       type: 'text',
  //       label: 'City',
  //       placeholder: 'City',
  //       required: true
  //     },
  //     {
  //       name: 'state',
  //       type: 'text',
  //       label: 'State',
  //       placeholder: 'State',
  //       required: true
  //     },
  //     {
  //       name: 'country',
  //       type: 'select',
  //       label: 'Country',
  //       placeholder: 'Country',
  //       required: true,
  //       options: ['India', 'Australia']
  //     },
  //   ]
  // },
  // {name: 'text-multiple', type: 'text', label: 'Text', placeholder: 'Text', required: true, multiple: true},
  // {name: 'text-multiple2', type: 'text', label: 'text-multiple2', placeholder: 'text-multiple2', required: true, multiple: true},
  // {
  //   name: 'list',
  //   type: 'section',
  //   label: 'List',
  //   required: true,
  //   multiple: true,
  //   fields: [
  //     {
  //       name: 'name',
  //       type: 'text',
  //       label: 'List Name',
  //       placeholder: 'List Name',
  //       required: true
  //     },
  //     {
  //       name: 'content',
  //       type: 'text',
  //       label: 'Content',
  //       placeholder: 'Content',
  //       required: true
  //     },
  //   ]
  // }
];

// const buttons = [{ type: 'submit', label: 'Create', color: 'secondary' }];

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      <TableComponent {...tableData} />
      <FormComponent
        novalidate={true}
        initialValues={() => {
          return {
            "text-multiple": ["Text 1", "Text 2"],
          };
        }}
        fields={fields}
        onSubmit={(formData) => {
          console.log("Form onSubmit", formData);
        }}
        onError={(formError) => {
          console.log("Form onError", formError);
        }}
      />
    </div>
  );
}

export default App;
