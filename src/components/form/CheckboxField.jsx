import { Field } from 'formik';
import React from 'react';

const CheckboxField = ({ label, name }) => (
  <Field name={name}>
    {({ field }) => (
      <div className="field">
        <div className="control">
          <label
            htmlFor={name}
            className="checkbox label"
            style={{
              height: '2em',
              display: 'flex',
              alignItems: 'center'
            }}
          >
            <input type="checkbox" name={name} id={name} {...field} />
            &nbsp;{label}
          </label>
        </div>
      </div>
    )}
  </Field>
);

export default CheckboxField;
