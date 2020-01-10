import classNames from 'classnames';
import { Field } from 'formik';
import React from 'react';

const SelectField = ({ label, name, options }) => (
  <Field name={name}>
    {({ field, meta }) => (
      <div className="field">
        <label htmlFor={name} className="label">
          {label}
        </label>
        <div className="control">
          <div
            className={classNames('select', {
              'is-danger': meta.touched && meta.error
            })}
          >
            <select id={name} {...field}>
              {options.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>
        {meta.touched && meta.error && (
          <p className="help is-danger">{meta.error}</p>
        )}
      </div>
    )}
  </Field>
);

export default SelectField;
