import {ChangeEvent, useState} from "react";
import axios from "axios";

export const Upload = () => {
    const [file, setFile] = useState<null | File>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setFile(e.target.files[0]);
        }
    };

    const uploadFile = async () => {
        if (!file) return;

        const formData = new FormData();
        formData.append("file", file);
        setLoading(true);

        try {
            const response = await axios.post("http://localhost:8000/upload", formData);
            const data = await response.data;
            console.log(data);
        } catch (error) {
            console.error("Error uploading file: ", (error as Error).message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="font-[sans-serif] max-w-md mx-auto">
            <label className="text-base text-gray-500 font-semibold mb-2 block">Upload file</label>
            <input
                type="file"
                onChange={onChange}
                className="w-full text-white font-semibold text-sm bg-slate-700 border file:cursor-pointer cursor-pointer file:border-0 file:py-3 file:px-4 file:mr-4 file:bg-blue-800 file:hover:bg-blue-500 file:text-white rounded"
            />
            <p className="text-xs text-gray-400 mt-2">Only PDF Files are Allowed.</p>
            <button
                onClick={uploadFile}
                className="mt-3 px-4 py-2 bg-blue-800 hover:bg-blue-500 text-white rounded"
                disabled={loading}
            >
                {loading ? "Uploading..." : "Upload"}
            </button>
        </div>
    );
};