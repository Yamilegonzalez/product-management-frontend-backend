import { Pencil } from 'lucide-react';

interface ItemRowProps {
    name: string;
    id: number;
    onEdit?: () => void;
    onSelect?: (id: number) => void;
    addNew?: () => void;
}

export const CategoryRow = ({ name, id = 0, onEdit, onSelect, addNew }: ItemRowProps) => {
    return (
        <>
            {addNew ? (
                <div className=" bg-yellow-400 hover:bg-yellow-500 transition cursor-pointer px-6 py-3 rounded-full hover:shadow-md mt-3 mb-3" onClick={addNew}>
                    <span
                        className="flex items-center gap-3 text-base font-semibold text-white "
                    >
                        Agregar
                    </span>
                </div>
            ) : (
                <div className="border rounded-xl p-4 shadow-md bg-white hover:shadow-lg transition-all duration-300 w-full max-w-sm mx-auto">
                    <div className="flex items-center justify-between h-[100px] p-4 rounded-lg border shadow-sm bg-gray-50">
                        <span
                            className="text-gray-800 text-base font-medium leading-snug break-words text-left max-w-[150px] cursor-pointer hover:underline"
                            onClick={() => onSelect?.(id)}
                        >
                            {name}
                        </span>

                        <div className="flex flex-col gap-2 shrink-0">
                            <button
                                onClick={onEdit}
                                className="p-2 bg-yellow-400 hover:bg-yellow-500 transition-colors duration-200 text-white rounded-full shadow-sm hover:shadow-md"
                                title="Editar"
                            >
                                <Pencil className="w-4 h-4" />
                            </button>
                        </div>
                        {/* <button
              onClick={onDelete}
              className="p-2 rounded-md bg-red-500 hover:bg-red-600 transition text-white"
              title="Eliminar"
            >
              <Trash2 className="w-4 h-4" />
            </button> */}
                    </div >
                </div >
            )}
        </>
    );

};
