import classNames from 'classnames';
import { Field } from 'formik';
import React, { useMemo, useState } from 'react';

const Autocomplete = ({ label, multiple, name, options }) => {
  const [inputValue, setInputValue] = useState('');
  const [inputFocused, setInputFocused] = useState(false);

  const optionLabelsByValue = useMemo(() => {
    return options.reduce((byValue, option) => {
      byValue[option.value] = option.label;
      return byValue;
    }, {});
  }, [options]);

  const isActive = inputValue || inputFocused;

  return (
    <Field name={name}>
      {({ field, form: { setFieldValue, setTouched, touched }, meta }) => (
        <div className="field">
          <label className="label" htmlFor={`${name}_input`}>
            {label}
          </label>
          <div className="control" style={{ display: 'flex' }}>
            <div
              className={classNames('dropdown', {
                'is-active': isActive
              })}
              style={{ marginRight: '10px' }}
            >
              <div className="dropdown-trigger">
                <input
                  type="text"
                  className={classNames('input', {
                    'is-danger': meta.touched && meta.error
                  })}
                  id={`${name}_input`}
                  value={inputValue}
                  onBlur={() => {
                    setTouched({ ...touched, [name]: true });
                    setTimeout(() => setInputFocused(false), 10);
                  }}
                  onChange={e => setInputValue(e.target.value)}
                  onFocus={() => setInputFocused(true)}
                />
                <select
                  multiple={multiple}
                  style={{ display: 'none' }}
                  {...field}
                />
              </div>
              <div className="dropdown-menu">
                <div
                  className="dropdown-content"
                  style={{ maxHeight: '220px', overflowY: 'auto' }}
                >
                  {options
                    .filter(option => {
                      return (
                        (inputValue.length === 0 ||
                          option.label
                            .toLowerCase()
                            .indexOf(inputValue.toLowerCase()) !== -1) &&
                        field.value.indexOf(option.value) === -1
                      );
                    })
                    .map(option => (
                      <a
                        className="dropdown-item"
                        key={option.value}
                        onClick={() => {
                          setFieldValue('tournaments', [
                            ...field.value,
                            option.value
                          ]);
                        }}
                      >
                        {option.label}
                      </a>
                    ))}
                </div>
              </div>
            </div>
            <div
              className="field is-grouped is-grouped-multiline"
              style={{ alignItems: 'center', maxWidth: '50%' }}
            >
              {field.value.map(selectedOption => (
                <div className="control" key={selectedOption}>
                  <div
                    className="tags has-addons"
                    onClick={() => {
                      const indexToRemove = field.value.indexOf(selectedOption);
                      setFieldValue('tournaments', [
                        ...field.value.slice(0, indexToRemove),
                        ...field.value.slice(indexToRemove + 1)
                      ]);
                    }}
                  >
                    <span className="tag" key={selectedOption}>
                      {optionLabelsByValue[selectedOption]}
                    </span>
                    <a className="tag is-delete"></a>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {meta.touched && meta.error && (
            <p className="help is-danger">{meta.error}</p>
          )}
        </div>
      )}
    </Field>
  );
};

Autocomplete.defaultProps = {
  options: []
};

export default Autocomplete;
