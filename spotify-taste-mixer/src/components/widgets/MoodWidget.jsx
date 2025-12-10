'use client';

import SliderRow from "../SliderRow";

// 4 botones predefinidos para moods
const PRESETS = [
    {
        id: 'happy',
        label: 'Happy',
        description: 'Energético y positivo',
        values: { energy: 80, valence: 90, danceability: 70, acousticness: 20 },
    },
    {
        id: 'sad',
        label: 'Sad',
        description: 'Tranquilo y melancólico',
        values: { energy: 30, valence: 20, danceability: 30, acousticness: 60 },
    },
    {
        id: 'energetic',
        label: 'Energetic',
        description: 'Muy movido y bailable',
        values: { energy: 90, valence: 70, danceability: 90, acousticness: 10 },
    },
    {
        id: 'calm',
        label: 'Calm',
        description: 'Suave y relajado',
        values: { energy: 25, valence: 60, danceability: 40, acousticness: 70 },
    },
];

// Seleccionar y ajustar el mood
export default function MoodWidget({ moodConfig, onChangeMood }) {
    const { label, energy, valence, danceability, acousticness } = moodConfig;

    // Aplicar preset de mood (botón)
    function applyPreset(preset) {
        onChangeMood({
            label: preset.id,
            ...preset.values,
        });
    }

    // Actualizar un campo específico del mood (slider)
    function updateField(field, value) {
        const num = Number(value);
        if (Number.isNaN(num)) return;

        onChangeMood({
            ...moodConfig,
            [field]: num,
        });
    }

    return (
        <div className="space-y-6">
            <p className="text-sm text-black">
                Elige un mood general o ajusta manualmente los sliders.
            </p>

            {/*Botones de presets de mood*/}
            <div className="grid grid-cols-2 gap-2 md:grid-cols-4">
                {PRESETS.map((preset) => {
                    const isActive = label === preset.id;
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

            {/*Sliders para ajustar el mood*/}
            <div className="space-y-4">
                <SliderRow
                    label="Energy"
                    value={energy}
                    onChange={(v) => updateField('energy', v)}
                />
                <SliderRow
                    label="Valence (feliz/triste)"
                    value={valence}
                    onChange={(v) => updateField('valence', v)}
                />
                <SliderRow
                    label="Danceability"
                    value={danceability}
                    onChange={(v) => updateField('danceability', v)}
                />
                <SliderRow
                    label="Acousticness"
                    value={acousticness}
                    onChange={(v) => updateField('acousticness', v)}
                />
            </div>

            <div className="text-sm text-black">
                <p className="font-semibold mb-1">Resumen del mood:</p>
                <ul className="list-disc list-inside text-sm">
                    <li>Energy: {energy}</li>
                    <li>Valence: {valence}</li>
                    <li>Danceability: {danceability}</li>
                    <li>Acousticness: {acousticness}</li>
                </ul>
            </div>
        </div>
    );
}
