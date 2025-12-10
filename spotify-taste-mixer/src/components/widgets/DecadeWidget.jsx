'use client';

const DECADES = ['1950', '1960', '1970', '1980', '1990', '2000', '2010', '2020'];

export default function DecadeWidget({ selectedDecades, onChangeSelectedDecades }) {
    function isSelected(decade) {
        return selectedDecades.includes(decade);
    }

    function toggleDecade(decade) {
        let newSelection;

        if (isSelected(decade)) {
            newSelection = selectedDecades.filter((d) => d !== decade);
        } else {
            newSelection = [...selectedDecades, decade];
        }

        onChangeSelectedDecades(newSelection);
    }

    return (
        <div className="space-y-4">
            <p className="text-sm text-black">
                Selecciona una o varias décadas.
            </p>

            <div className="flex flex-wrap gap-2">
                {DECADES.map((decade) => (
                    <button
                        key={decade}
                        type="button"
                        onClick={() => toggleDecade(decade)}
                        className={
                            'px-3 py-1 rounded-full text-xs border transition ' +
                            (isSelected(decade)
                                ? 'border-emerald-500 bg-emerald-100 text-black'
                                : 'border-gray-300 bg-white text-black hover:bg-gray-100')
                        }
                    >
                        {decade}s
                    </button>
                ))}
            </div>

            {selectedDecades.length > 0 && (
                <div>
                    <h3 className="text-sm font-semibold text-black mb-1">
                        Década/s seleccionada/s:
                    </h3>
                    <ul className="text-sm text-black list-disc list-inside">
                        {selectedDecades.map((decadas) => (
                            <li key={decadas}>{decadas}s</li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}
