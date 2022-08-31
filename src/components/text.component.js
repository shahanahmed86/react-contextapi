import React from 'react';
import PropTypes from 'prop-types';
import TextFieldInput from '@mui/material/TextField';

export const TextField = ({ fullWidth, type, disabled, error, label, name, defaultValue }) => {
	return (
		<TextFieldInput
			fullWidth={fullWidth}
			type={type}
			disabled={disabled}
			error={!!error}
			label={label}
			name={name}
			defaultValue={defaultValue}
			helperText={error ? error : error}
		/>
	);
};

TextField.propTypes = {
	fullWidth: PropTypes.bool.isRequired,
	type: PropTypes.oneOf(['text', 'password']).isRequired,
	disabled: PropTypes.bool,
	error: PropTypes.string,
	label: PropTypes.string.isRequired,
	name: PropTypes.string.isRequired,
	defaultValue: PropTypes.string
};

TextField.defaultProps = {
  fullWidth: true,
	disabled: false,
	type: 'text'
};
