
interface SelectFieldProps {
    label: string;
    name: string;
    value: string | number;
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    options: { label: string; value: string | number }[];
}

export const SelectField = ({
    label,
    name,
    value,
    onChange,
    options,
}: SelectFieldProps) => {

    return (
        <div className="flex flex-col">
            <label htmlFor={name} className="text-sm font-medium mb-1">
                {label}:
            </label>
            <select
                id={name}
                name={name}
                value={value ?? ''}
                onChange={onChange}
                className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
                <option value="">Seleccione una opción</option>
                {options.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                        {opt.label}
                    </option>
                ))}
            </select>
        </div>
    );
};
