import React from 'react';

const Input = ({ value, onChange, placeholder, disabled, autoFocus }) => {
    const [isFocused, setIsFocused] = React.useState(false);

    const styles = {
        wrapper: {
            position: 'relative',
            width: '100%',
            maxWidth: '600px',
        },
        input: {
            width: '100%',
            padding: '1.2rem 1.5rem',
            fontSize: '1rem',
            backgroundColor: 'rgba(21, 21, 30, 0.8)', // Darker background
            border: '1px solid rgba(255, 255, 255, 0.12)', // Subtle border
            borderRadius: '12px',
            color: '#ffffff',
            outline: 'none',
            transition: 'all 0.3s ease',
            backdropFilter: 'blur(12px)',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)',
            fontFamily: 'inherit',
            fontWeight: '400'
        },
        focus: {
            borderColor: 'rgba(138, 43, 226, 0.5)',
            boxShadow: '0 0 20px rgba(138, 43, 226, 0.2)',
            backgroundColor: 'rgba(25, 25, 35, 0.9)',
        }
    };

    return (
        <div style={styles.wrapper}>
            <input
                type="text"
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                disabled={disabled}
                autoFocus={autoFocus}
                style={{
                    ...styles.input,
                    ...(isFocused ? styles.focus : {})
                }}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
            />
        </div>
    );
};

export default Input;
