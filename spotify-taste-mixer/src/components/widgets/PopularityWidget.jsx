'use client';

// 3 botones predefinidos para popularidad
const PRESETS = [
    {
        id: 'underground',
        label: 'Underground',
        description: 'Joyas ocultas (0-50)',
        range: { min: 0, max: 50 },
    },
    {
        id: 'popular',
        label: 'Popular',
        description: 'Equilibrado (50-80)',
        range: { min: 50, max: 80 },
    },
    {
        id: 'mainstream',
        label: 'Mainstream',
        description: 'Hits muy conocidos (80-100)',
        range: { min: 80, max: 100 },
    },
];

// Seleccionar y ajustar la popularidad
export default function PopularityWidget({ popularityRange, onChangePopularity }) {
    const { min, max } = popularityRange;

    // Aplicar preset de popularidad (botón)
    function applyPreset(preset) {
        onChangePopularity({
            min: preset.range.min,
            max: preset.range.max,
        });
    }

    // Actualizar un campo específico de la popularidad (slider o input)
    function updateField(field, value) {
        const num = Number(value);
        if (Number.isNaN(num)) return;

        let newMin = field === 'min' ? num : min;
        let newMax = field === 'max' ? num : max;

        if (newMin < 0) newMin = 0;
        if (newMax > 100) newMax = 100;
        if (newMin > newMax) newMin = newMax;

        onChangePopularity({
            min: newMin,
            max: newMax,
        });
    }

    // Determinar si el rango actual coincide con algún preset, para resaltar el botón
    const currentPresetId = (() => {
        if (min === 0 && max === 50) return 'underground';
        if (min === 50 && max === 80) return 'popular';
        if (min === 80 && max === 100) return 'mainstream';
        return null;
    })();

    return (
        <div className="space-y-6">
            <p className="text-sm text-black">
                Elige el tipo de popularidad que prefieres o ajusta manualmente el rango (0-100).
            </p>

            {/*Botones de presets de popularidad*/}
            <div className="grid grid-cols-1 gap-2 md:grid-cols-3">
                {PRESETS.map((preset) => {
                    const isActive = currentPresetId === preset.id;
                    return (
                        <button
                            key={preset.id}
                            type="button"
                            onClick={() => applyPreset(preset)}
                            className={
                                'p-2 rounded-lg border text-left text-xs transition ' +
                                (isActive
                                    ? 'border-emerald-500 bg-emerald-100 text-black font-semibold'
                                    : 'border-gray-300 bg-white text-black hover:bg-gray-100')
                            }
                        >
                            <div className="text-sm">{preset.label}</div>
                            <div className="text-[0.7rem] text-gray-700">
                                {preset.description}
                            </div>
                        </button>
                    );
                })}
            </div>

            {/*Sliders e inputs para ajustar la popularidad*/}
            <div className="space-y-3">
                <div className="flex items-center gap-3">
                    <div className="flex flex-col flex-1">
                        <label className="text-sm text-black mb-1">
                            Popularidad mínima ({min})
                        </label>
                        <input
                            type="range"
                            min="0"
                            max="100"
                            value={min}
                            onChange={(e) => updateField('min', e.target.value)}
                            className="w-full"
                        />
                    </div>

                    <input
                        type="number"
                        min="0"
                        max="100"
                        value={min}
                        onChange={(e) => updateField('min', e.target.value)}
                        className="w-16 border border-gray-300 rounded px-2 py-1 text-sm text-black outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-300"
                    />
                </div>

                <div className="flex items-center gap-3">
                    <div className="flex flex-col flex-1">
                        <label className="text-sm text-black mb-1">
                            Popularidad máxima ({max})
                        </label>
                        <input
                            type="range"
                            min="0"
                            max="100"
                            value={max}
                            onChange={(e) => updateField('max', e.target.value)}
                            className="w-full"
                        />
                    </div>

                    <input
                        type="number"
                        min="0"
                        max="100"
                        value={max}
                        onChange={(e) => updateField('max', e.target.value)}
                        className="w-16 border border-gray-300 rounded px-2 py-1 text-sm text-black outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-300"
                    />
                </div>
            </div>

            <div className="text-sm text-black">
                <p className="font-semibold mb-1">Resumen de popularidad:</p>
                <p>
                    Rango: {min} - {max}
                </p>
                {currentPresetId && (
                    <p className="text-xs text-gray-700">
                        Preset: {PRESETS.find((p) => p.id === currentPresetId)?.label}
                    </p>
                )}
            </div>
        </div>
    );
}
