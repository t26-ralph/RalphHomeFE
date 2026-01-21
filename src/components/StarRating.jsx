export default function StarRating({ value = 0, onChange }) {
    return (
        <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
                <button
                    key={star}
                    type="button"
                    onClick={() => onChange(star)}
                    className={`text-2xl transition
            ${star <= value ? "text-yellow-400" : "text-gray-300"}
            hover:scale-110`}
                >
                    ★
                </button>
            ))}
        </div>
    );
}
