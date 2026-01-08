import React from "react";

interface PasswordInputProps {
    label: string;
    value: string;
    onChange: (v: string) => void;
    show: boolean;
    toggle: () => void;
}

export default function PasswordInput({
                                          label,
                                          value,
                                          onChange,
                                          show,
                                          toggle,
                                      }: PasswordInputProps) {
    return (
        <div className="w-full">
            <label className="block text-sm text-gray-700 mb-1">
                {label}
            </label>

            <div className="relative h-12 border border-gray-300 rounded-lg focus-within:ring-2 focus-within:ring-[#0F766E]">
                <input
                    type={show ? "text" : "password"}
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    className="w-full h-full px-3 pr-10 text-sm text-gray-800 outline-none rounded-lg"
                />

                <button
                    type="button"
                    onClick={toggle}
                    className="absolute inset-y-0 right-0 px-3 text-gray-500 hover:text-[#0F766E]"
                >
                    {show ? (
                        // œil barré
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M13.875 18.825A10.05 10.05 0 0112 19c-5.523 0-10-4.477-10-10a9.96 9.96 0 012.929-7.071M6.343 6.343A8 8 0 0112 4c5.523 0 10 4.477 10 10a9.96 9.96 0 01-4.293 8.293M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                        </svg>
                    ) : (
                        // œil
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                            />
                        </svg>
                    )}
                </button>
            </div>
        </div>
    );
}
