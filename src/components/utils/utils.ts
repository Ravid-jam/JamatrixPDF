import { useEffect } from "react";

export const numberToWords = (num: number): string => {
    if (num === 0) return "Zero";

    const ones: string[] = [
        "", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine",
        "Ten", "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen", "Sixteen",
        "Seventeen", "Eighteen", "Nineteen"
    ];

    const tens: string[] = [
        "", "", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"
    ];

    const scales: string[] = ["", "Thousand", "Lakh", "Crore"];

    const convertBelowThousand = (n: number): string => {
        if (n === 0) return "";
        if (n < 20) return ones[n];
        if (n < 100) return tens[Math.floor(n / 10)] + (n % 10 ? " " + ones[n % 10] : "");
        return ones[Math.floor(n / 100)] + " Hundred" + (n % 100 ? " " + convertBelowThousand(n % 100) : "");
    };

    let result = "";
    const parts: number[] = [];


    parts.push(num % 1000);
    num = Math.floor(num / 1000);
    parts.push(num % 100);
    num = Math.floor(num / 100);
    parts.push(num % 100);
    num = Math.floor(num / 100);
    parts.push(num);

    for (let i = parts.length - 1; i >= 0; i--) {
        if (parts[i] > 0) {
            result += (result ? " " : "") + convertBelowThousand(parts[i]) + (scales[i] ? " " + scales[i] : "");
        }
    }

    return result.trim();
};


export const useDisableNumberInputScroll = () => {
    useEffect(() => {
        const handleWheel = (e: any) => {
            e.preventDefault();
        };

        const numberInputs = document.querySelectorAll('input[type="number"]');

        numberInputs.forEach((input) => {
            input.addEventListener("wheel", handleWheel, { passive: false });
        });

        return () => {
            numberInputs.forEach((input) => {
                input.removeEventListener("wheel", handleWheel);
            });
        };
    });
};



export function calculatePercentage(totalValue: number, taxValue: number) {
    if (totalValue === 0) {
        return "";
    }
    if (typeof totalValue !== "number" || typeof taxValue !== "number") {
        return "Invalid input. Please provide numeric values.";
    }
    const percentage = (taxValue / totalValue) * 100;
    return percentage.toFixed(2) + "%";
}