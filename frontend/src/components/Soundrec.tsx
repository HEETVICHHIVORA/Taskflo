import { useRef, useState } from "react";

function SoundRecorder() {
    const audio = useRef<Blob[]>([]);
    const [recordings, setRecordings] = useState<string[]>([]);
    const [pointer, setPointer] = useState("0");
    const mediaRecorderRef = useRef<MediaRecorder | null>(null);
    async function startRec() {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            const mediaRecorder = new MediaRecorder(stream);
            setPointer("1");
            mediaRecorder.ondataavailable = (e: BlobEvent) => {
                if (e.data.size > 0) {
                    audio.current.push(e.data);
                }
            };

            mediaRecorder.onstop = () => {
                const audioBlob = new Blob(audio.current, { type: 'audio/wav' });
                const audioUrl = URL.createObjectURL(audioBlob);
                setRecordings((prev) => [...prev, audioUrl]);
                audio.current = []; // Clear the recorded data
                setPointer("0");
            };

            mediaRecorderRef.current = mediaRecorder;
            mediaRecorder.start();
        } catch (e) {
            console.error(e);
        }
    }
    function stopRec() {
        if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
            mediaRecorderRef.current.stop();
        }
    }

    return (
        <div>
            <div className="flex justify-center">
            <button className="border-gray-800	p-2 bg-slate-300 m-3" onClick={startRec}>START</button>
            <button className="border-gray-800	p-2 bg-slate-300 m-3" onClick={stopRec}>STOP</button>
            </div>
            {pointer === "1" && <div className="blinking-recording-button text-white bg-red-500 p-2 m-3 rounded font-bold">Recording...</div>}

            
            <div>
            {recordings.map((recUrl, index) => (
                <div key={index}>
                    <audio controls src={recUrl} />
                </div>
            ))}
            </div>
           
        </div>
    );
}

export default SoundRecorder;
