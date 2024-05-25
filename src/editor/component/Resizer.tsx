import React, { useState } from "react";

export default function Resizer({value, setValue, status, setStatus}: {value: number, setValue: React.Dispatch<React.SetStateAction<number>>, status: boolean, setStatus: React.Dispatch<React.SetStateAction<boolean>>}) {
    const [startLoc, setStartLoc] = useState<number>(0);

    return <>
        <div className="resizer" onMouseDown={(e: React.MouseEvent<HTMLDivElement>) => {
            const root = document.getElementById("root")
            if (!root) return;

            setStatus(true);
            setStartLoc(e.currentTarget.offsetLeft);

            // root.addEventListener("mousemove", )
        }} onMouseUp={(e: React.MouseEvent<HTMLDivElement>) => {
            if (!status) {
                return
            }
            setValue(value + e.currentTarget.offsetLeft - startLoc);
            setStatus(false);

            const root = document.getElementById("root")
            if (!root) return;

            // root.removeEventListener("mousemove", )
        }}>

        </div>
    </>
}