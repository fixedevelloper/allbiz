import { useState } from "react";


export default function RouletteWheelTest() {
    const [spinning, setSpinning] = useState(false);
    const [rotation, setRotation] = useState(0);
    const [result, setResult] = useState(null);

    const spinWheel = () => {
        if (spinning) return;

        setSpinning(true);

        // Génère un nombre entre 1 et 12
        const randomNumber = Math.floor(Math.random() * 12) + 1;

        // Angle par section
        const anglePerItem = 360 / 12;

        // Calcul rotation finale
        const extraSpins = 5 * 360; // tours complets
        const finalAngle =
            extraSpins + (12 - randomNumber) * anglePerItem;

        setRotation(finalAngle);

        setTimeout(() => {
            setResult(randomNumber);
            setSpinning(false);
        }, 4000);
    };

    return (
        <div className="roulette-container">
            <div className="wheel-wrapper">
                <div
                    className="wheel"
                    style={{ transform: `rotate(${rotation}deg)` }}
                >
                    {[...Array(12)].map((_, i) => (
                        <div key={i} className="segment">
                            {i + 1}
                        </div>
                    ))}
                </div>
                <div className="pointer">▲</div>
            </div>

            <button
                onClick={spinWheel}
                className="btn btn-warning mt-3"
                disabled={spinning}
            >
                {spinning ? "⏳ En cours..." : "🎰 Lancer la roulette"}
            </button>

            {result && (
                <h4 className="mt-3">
                    Résultat : <strong>{result}</strong>
                </h4>
            )}
        </div>
    );
}
