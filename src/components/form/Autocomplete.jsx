import classNames from 'classnames';
import { Field } from 'formik';
import React, { useMemo, useRef, useState } from 'react';

const Autocomplete = ({ label, multiple, name, options }) => {
  const [active, setActive] = useState(false);
  const [activeOptionIndex, setActiveOptionIndex] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedOptions, setSelectedOptions] = useState([]);

  const inputRef = useRef(null);

  const availableOptions = useMemo(() => {
    return options
      .filter(option => {
        return (
          selectedOptions.findIndex(selectedOption => {
            return selectedOption.value === option.value;
          }) === -1
        );
      })
      .filter(option => {
        return (
          option.label.toLowerCase().indexOf(searchTerm.toLowerCase()) >= 0
        );
      });
  }, [options, searchTerm, selectedOptions]);

  const handleBlur = () => {
    setTimeout(() => {
      setActive(false);
      setActiveOptionIndex(0);
    }, 50);
  };

  const handleChange = event => {
    setSearchTerm(event.target.value);
    setActiveOptionIndex(0);
    setActive(true);
  };

  const handleDelete = value => {
    setSelectedOptions(
      selectedOptions.filter(option => option.value !== value)
    );
  };

  const handleKeyDown = event => {
    switch (event.keyCode) {
      case 13: // Enter
        setSelectedOptions([
          ...selectedOptions,
          availableOptions[activeOptionIndex]
        ]);
        setActiveOptionIndex(0);
        setSearchTerm('');
        break;

      case 27: // Escape
        setActive(false);
        setSearchTerm('');
        break;

      case 38: // Up arrow
        if (activeOptionIndex > 0) {
          setActiveOptionIndex(activeOptionIndex - 1);
        }
        break;

      case 40: // Down arrow
        if (!active) {
          setActive(true);
        } else if (activeOptionIndex < availableOptions.length - 1) {
          setActiveOptionIndex(activeOptionIndex + 1);
        }
        break;

      default:
        break;
    }
  };

  return (
    <Field name={name}>
      {({ field, form: { setFieldTouched, setFieldValue }, meta }) => (
        <>
          <div className="field">
            {label && <label className="label">{label}</label>}
            <div className="control">
              <div
                className={classNames('dropdown', {
                  'is-active': active,
                  'is-up':
                    inputRef.current &&
                    document.documentElement.clientHeight -
                      inputRef.current.getBoundingClientRect().top <
                      150
                })}
                style={{ width: '100%' }}
              >
                <div className="dropdown-trigger" style={{ width: '100%' }}>
                  <input
                    className={classNames('input', {
                      'is-danger': meta.touched && meta.error
                    })}
                    ref={inputRef}
                    type="text"
                    value={searchTerm}
                    onBlur={() => {
                      handleBlur();
                      setFieldTouched(name, true);
                    }}
                    onChange={handleChange}
                    onKeyDown={handleKeyDown}
                    onFocus={() => setActive(true)}
                  />
                  <select
                    className="is-hidden"
                    multiple={multiple}
                    value={selectedOptions.map(option => option.value)}
                    {...field}
                  />
                </div>
                <div className="dropdown-menu">
                  {availableOptions.length > 0 && (
                    <div
                      className="dropdown-content"
                      style={{
                        maxHeight: '225px',
                        overflow: 'auto'
                      }}
                    >
                      {availableOptions.map((option, index) => (
                        <a
                          className={classNames('dropdown-item', {
                            'is-active': index === activeOptionIndex
                          })}
                          key={index}
                          onClick={() => {
                            setSelectedOptions([...selectedOptions, option]);
                            setFieldValue(name, [...field.value, option.value]);
                          }}
                        >
                          {option.label}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
            {meta.touched && meta.error && (
              <p className="help is-danger">{meta.error}</p>
            )}
          </div>
          {multiple && selectedOptions.length > 0 && (
            <div
              className="field is-grouped is-grouped-multiline"
              style={{
                width: `${inputRef.current.clientWidth}px`
              }}
            >
              {selectedOptions
                .sort((a, b) => a.label.localeCompare(b.label))
                .map(option => (
                  <Tag
                    key={option.value}
                    text={option.label}
                    onDelete={() => {
                      handleDelete(option.value);
                      const indexToRemove = field.value.indexOf(option.value);
                      setFieldValue(name, [
                        ...field.value.slice(0, indexToRemove),
                        ...field.value.slice(indexToRemove + 1)
                      ]);
                    }}
                  />
                ))}
            </div>
          )}
        </>
      )}
    </Field>
  );
};

const Tag = ({ text, onDelete }) => (
  <div className="control">
    <div className="tags has-addons">
      <span className="tag is-link">{text}</span>
      <button
        className="tag is-delete"
        onClick={onDelete}
        style={{ border: 'none', cursor: 'pointer' }}
      />
    </div>
  </div>
);

Autocomplete.defaultProps = {
  options: []
};

export default Autocomplete;
