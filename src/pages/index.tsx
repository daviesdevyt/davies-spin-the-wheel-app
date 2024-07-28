import { useEffect, useRef, useState } from "react";
import SEO from "@/components/SEO";

const segments = ["100", "20", "5", "10", "1000", "0", "50", "1"];

export default function Home() {
    const [rotateWheel, setRotateWheel] = useState<number>(0);
    const wheelRef = useRef<HTMLDivElement>(null);
    const [spinning, setSpinning] = useState<boolean>(false);

    const handleClick = () => {
        // Generate a random rotation angle between 0 and 3600 degrees
        const newRotation = rotateWheel + Math.ceil(Math.random() * 3600);
        setSpinning(true);
        setRotateWheel(newRotation);
    };

    useEffect(() => {
        const handleTransitionEnd = () => {
            if (wheelRef.current) {
                // Calculate the index of the segment the pointer lands on
                const totalSegments = segments.length;
                const rotationPerSegment = 360 / totalSegments;
                const normalizedRotation = (rotateWheel ?? 0) % 360; // Ensure angle is between 0 and 359 degrees

                // Determine the segment index using a more accurate approach
                const segmentIndex = Math.floor((normalizedRotation + rotationPerSegment / 2) / rotationPerSegment) % totalSegments;

                // Log the value that the pointer lands on
                const value = segments[segmentIndex];
                setSpinning(false);
                console.log(`The pointer lands on: ${value}`);
            }
        };

        if (wheelRef.current) {
            wheelRef.current.addEventListener("transitionend", handleTransitionEnd);
        }

        // Cleanup event listener on component unmount
        return () => {
            if (wheelRef.current) {
                wheelRef.current.removeEventListener("transitionend", handleTransitionEnd);
            }
        };
    }, [rotateWheel]);

    return (
        <main className="h-screen">
            <SEO title="Home" />
            <h1 className=" pt-6 text-center text-5xl font-bold text-white">DAVIES SPIN-THE-WHEEL APP</h1>
            <div className="flex h-[90vh] w-full  items-center justify-center">
                <div className="container">
                    <button disabled={spinning} className={`spinBtn ${spinning && "cursor-not-allowed"}`} onClick={handleClick}>
                        Spin
                    </button>
                    <div ref={wheelRef} className="wheel" style={{ transform: `rotate(${rotateWheel}deg)` }}>
                        <div className="number number--one">
                            <span>100</span>
                        </div>
                        <div className="number number--two">
                            <span>1</span>
                        </div>
                        <div className="number number--three">
                            <span>50</span>
                        </div>
                        <div className="number number--four">
                            <span>0</span>
                        </div>
                        <div className="number number--five">
                            <span>1000</span>
                        </div>
                        <div className="number number--six">
                            <span>10</span>
                        </div>
                        <div className="number number--seven ">
                            <span>5</span>
                        </div>
                        <div className="number number--eight">
                            <span>20</span>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
