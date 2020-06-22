import React from 'react';

// *https://www.registers.service.gov.uk/registers/country/use-the-api*
import fetch from 'cross-fetch';

import logo from './logo.svg';
import './App.css';
import { Form as FormComponent, Table as TableComponent } from 'react-component-stack';

const tableData = {
  columns: [
    { name: 'name', label: 'Name', type: 'date', sort: true, filter: true },
    {
      name: 'status',
      label: 'Status',
      type: 'checkbox',
      sort: true,
      filter: true,
      options: [
        {
          label: 'Draft',
          value: 'Draft'
        },
        {
          label: 'Ready',
          value: 'Ready'
        },
        {
          label: 'Published',
          value: 'Published'
        }
      ]
    }
  ],
  rows: [
    {
      "id":"1",
      "name":"Draft Record",
      "status":"Draft",
    },
    {
      "id":"2",
      "name":"Ready Record",
      "status":"Ready"
    },
    {
      "id":"3",
      "name":"Published Record",
      "status":"Published"
    }
  ]
}

function sleep(delay = 0) {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
}

const fields = [
  {
    name: 'autocomplete', type: 'autocomplete', label: 'Autocomplete with dynamic list', required: true, options: (async (brandData) => {
      if (brandData) {
        const response = await fetch('https://country.register.gov.uk/records.json?page-size=5000');
        await sleep(1e3); // For demo purposes.
        const countries = await response.json();
        const formattedResponse = Object.keys(countries).map((key) => countries[key].item[0]);
        const results = formattedResponse.filter((obj) => {
          return Object.keys(obj).reduce((acc, curr) => {
            return acc || obj[curr].toLowerCase().includes(brandData);
          }, false);
        });
        return results;
      }

      return [];
    }), optionKey: 'country', optionValue: 'name'
  },
  {name: 'date', type: 'date', label: 'Date', placeholder: 'Date', required: true},
  {name: 'text', type: 'text', label: 'Text', placeholder: 'Text', required: true},
  {name: 'textarea', type: 'textarea', label: 'Textarea', placeholder: 'Textarea', required: true},
  {name: 'number', type: 'number', label: 'Number', placeholder: 'Number', required: true},
  {name: 'range', type: 'range', label: 'range', placeholder: 'range', required: true, min: 0, max: 10},
  {
    name: 'select',
    type: 'select',
    label: 'Country',
    placeholder: 'Country',
    required: true,
    options: ['India', 'Australia']
  },
  {
    name: 'multiselect',
    type: 'select',
    label: 'Multiselect',
    placeholder: 'Multiselect',
    required: true,
    options: ['India', 'Australia'],
    multiple: true
  },
  {name: 'switch', type: 'switch', label: 'switch', placeholder: 'switch', required: true},
  {name: 'boolean', type: 'boolean', label: 'boolean', placeholder: 'boolean', required: true},
  {name: 'checkbox1', type: 'checkbox', label: 'checkbox 1', placeholder: 'checkbox 1', required: true},
  {name: 'checkbox2', type: 'checkbox', label: 'checkbox 2', placeholder: 'checkbox 2', required: true, options: [{value: 'chk1', label: 'Checkbox 1'}, {value: 'chk2', label: 'Checkbox 2'}]},
  {name: 'toggle', type: 'toggle', label: 'toggle', placeholder: 'toggle', required: true, options: [{value: 'toggle1', label: 'toggle 1'}, {value: 'toggle2', label: 'toggle 2'}, {value: 'toggle3', label: 'toggle 3'}]},
  {name: 'radio', type: 'radio', label: 'radio', placeholder: 'radio', required: true, options: [{value: 'opt1', label: 'Option 1'}, {value: 'opt2', label: 'Option 2'}]},
  {name: 'text-multiple', type: 'text', label: 'Text', placeholder: 'Text', required: true, multiple: true},
  {
    name: 'address',
    type: 'nested',
    label: 'Address',
    required: true,
    fields: [
      {
        name: 'line_1',
        type: 'text',
        label: 'Address Line 1',
        placeholder: 'Address Line 1',
        required: true
      },
      {
        name: 'line_2',
        type: 'text',
        label: 'Address Line 2',
        placeholder: 'Address Line 2',
        required: true
      },
      {
        name: 'city',
        type: 'text',
        label: 'City',
        placeholder: 'City',
        required: true
      },
      {
        name: 'state',
        type: 'text',
        label: 'State',
        placeholder: 'State',
        required: true
      },
      {
        name: 'country',
        type: 'select',
        label: 'Country',
        placeholder: 'Country',
        required: true,
        options: ['India', 'Australia']
      },
    ]
  },
  {
    name: 'list',
    type: 'nested',
    label: 'List',
    required: true,
    multiple: true,
    fields: [
      {
        name: 'name',
        type: 'text',
        label: 'List Name',
        placeholder: 'List Name',
        required: true
      },
      {
        name: 'content',
        type: 'text',
        label: 'Content',
        placeholder: 'Content',
        required: true
      },
    ]
  }
];

const buttons = [{ type: 'submit', label: 'Create', color: 'secondary' }];

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      <FormComponent
        novalidate={true}
        data={
          {
            'text-multiple': [
              'Text 1',
              'Text 2'
            ]
          }
        }
        fields={fields}
        buttons={buttons}
        onSubmit={(formData) => {
          console.log('Form onSubmit', formData);
        }}
      />

      <TableComponent {...tableData} />
    </div>
  );
}

export default App;