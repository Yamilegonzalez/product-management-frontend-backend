import { useState, useEffect } from 'react';

interface InputFieldProps {
    label: string;
    name: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    value: any;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    type: string;
    onValidityChange?: (isValid: boolean) => void;
}

const allowedHostnames = [
    'm.mdasedia-amazon.com',
    'cdn1.coppel.com',
    'cdn-images.dzcdn.net',
    'archive.org',
    'm.media-amazon.com'
];

export const InputField = ({ label, name, value, onChange, type = 'text', onValidityChange }: InputFieldProps) => {
    const [isValidUrl, setIsValidUrl] = useState(true);

    useEffect(() => {
        if (type === 'url' && onValidityChange) {
            try {
                const url = new URL(value);
                const isValid = allowedHostnames.includes(url.hostname);
                setIsValidUrl(isValid);
                onValidityChange(isValid);
            } catch {
                setIsValidUrl(false);
                onValidityChange(false);
            }
        }
    }, [value, type, onValidityChange]);

    return (
        <div className="flex flex-col">
            <label htmlFor={name} className="text-sm font-medium mb-1">
                {label}:
            </label>
            <input
                type={type}
                id={name}
                name={name}
                value={value ?? ''}
                onChange={onChange}
                placeholder={label}
                className={`border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 ${type === 'url' && !isValidUrl
                    ? 'border-red-500 focus:ring-red-400'
                    : 'border-gray-300 focus:ring-blue-400'
                    }`}
            />
            {type === 'url' && !isValidUrl && (
                <span className="text-xs text-red-500 mt-1">
                    URL inválida o no permitida.
                </span>
            )}
        </div>
    );
};
