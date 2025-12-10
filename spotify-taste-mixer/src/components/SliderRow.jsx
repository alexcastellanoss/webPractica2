// Slider para MoodWidget.jsx
export default function SliderRow({ label, value, onChange }) {
    return (
        <div>
            <div className="flex justify-between mb-1">
                <div className="text-sm text-black">{label}</div>
                <div className="text-xs text-black">{value}</div>
            </div>
            {/* Slider que avisa al padre cuando cambia el valor */}
            <input
                type="range"
                min="0"
                max="100"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="w-full"
            />
        </div>
    );
}
