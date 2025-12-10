export default function SliderRow({ label, value, onChange }) {
    return (
        <div>
            <div className="flex justify-between mb-1">
                <span className="text-sm text-black">{label}</span>
                <span className="text-xs text-black">{value}</span>
            </div>
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
