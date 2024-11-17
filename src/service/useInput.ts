import { useState } from 'react';

export default function useInput( defaultValue:string ) {
    const [value, setValue] = useState(defaultValue);

    const handleChange = (e) => {
        const newValue = e.target.value;
        setValue(newValue);
    };

    return { value, onChange: handleChange, setValue };
}