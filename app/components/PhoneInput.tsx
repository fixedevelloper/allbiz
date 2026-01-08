import React, { useState } from "react";

type Country = {
    code: string;
    name: string;
    flag: string;
};

const COUNTRIES = [
    {
        code: "+229",
        name: "Benin",
        flag: "/flags/bn.png",
    },
    {
        code: "+225",
        name: "Côte d’Ivoire",
        flag: "/flags/ci.png",
    },
    {
        code: "+237",
        name: "Cameroun",
        flag: "/flags/cm.png",
    },

    {
        code: "+221",
        name: "Sénégal",
        flag: "/flags/sn.png",
    },

];

interface PhoneInputProps {
    value: string;
    countryCode: string;
    onChange: (phone: string) => void;
    onCountryChange: (code: string) => void;
    label?: string;
}

export default function PhoneInput({
                                       value,
                                       countryCode,
                                       onChange,
                                       onCountryChange,
                                       label = "Numéro de téléphone",
                                   }: PhoneInputProps) {
    const [open, setOpen] = useState(false);
    const selectedCountry = COUNTRIES.find(c => c.code === countryCode)!;

    return (
        <div className="w-full relative">
            {label && (
                <label className="block text-sm text-gray-700 mb-1">
                    {label}
                </label>
            )}

            <div className="flex h-12 border border-gray-300 rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-[#014d74]">

                {/* Country selector */}
                <button
                    type="button"
                    onClick={() => setOpen(!open)}
                    className="flex items-center gap-2 px-3 bg-gray-100 border-r border-gray-300 text-sm"
                >
                    <img
                        src={selectedCountry.flag}
                        alt={selectedCountry.name}
                        className="w-5 h-5 rounded-full"
                    />
                    <span className='text-blue-700'>{selectedCountry.code}</span>
                </button>

                {/* Phone input */}
                <input
                    type="tel"
                    placeholder="6XXXXXXXX"
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    className="flex-1 px-3 text-sm outline-none text-gray-800"
                />
            </div>

            {/* Dropdown */}
            {open && (
                <div className="absolute z-20 mt-1 w-full bg-white border border-gray-300 rounded-lg shadow-lg overflow-hidden">
                    {COUNTRIES.map((c) => (
                        <button
                            key={c.code}
                            type="button"
                            onClick={() => {
                                onCountryChange(c.code);
                                setOpen(false);
                            }}
                            className="flex items-center gap-3 px-4 py-2 w-full hover:bg-gray-100 text-sm"
                        >
                            <img src={c.flag} alt={c.name} className="w-5 h-5 rounded-full" />
                            <span className="flex-1 text-gray-800">{c.name}</span>
                            <span className="text-gray-500">{c.code}</span>
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}
