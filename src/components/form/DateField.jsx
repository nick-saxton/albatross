import classNames from 'classnames';
import { Field } from 'formik';
import React from 'react';

const DateField = ({ label, name }) => {
  return (
    <Field name={name}>
      {({ field, meta }) => (
        <div className="field">
          <label htmlFor={name} className="label">
            {label}
          </label>
          <div className="control">
            <input
              className={classNames('input', {
                'is-danger': meta.touched && meta.error
              })}
              type="date"
              id={name}
              {...field}
            />
          </div>
          {meta.touched && meta.error && (
            <p className="help is-danger">{meta.error}</p>
          )}
        </div>
      )}
    </Field>
  );
};

export default DateField;
