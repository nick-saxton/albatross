import classNames from 'classnames';
import { Field } from 'formik';
import React from 'react';

const TextField = ({ label, name, type, smallLabel, ...otherProps }) => (
  <Field name={name}>
    {({ field, meta }) => (
      <div className="field">
        <label
          htmlFor={name}
          className={classNames('label', { 'is-small': smallLabel })}
        >
          {label}
        </label>
        <div className="control">
          <input
            className={classNames('input', {
              'is-danger': meta.touched && meta.error
            })}
            id={name}
            type={type}
            {...field}
            {...otherProps}
          />
        </div>
        {meta.touched && meta.error && (
          <p className="help is-danger">{meta.error}</p>
        )}
      </div>
    )}
  </Field>
);

export default TextField;
