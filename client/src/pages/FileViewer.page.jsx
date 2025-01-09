import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
// importing pages
import PageNotFound from './PageNotFound.page';
// importing components
import Footer from '../components/Footer';

const FileViewer = () => {
    const { filePath } = useParams();
    const [fileExists, setFileExists] = useState(true);

    useEffect(() => {
        const checkFileExists = async () => {
            try {
                const fileUrl = `${import.meta.env.VITE_BACKEND_URL}uploads/${filePath}`;
                const response = await fetch(fileUrl);
                if (!response.ok) {
                    setFileExists(false);
                }
            } catch (error) {
                setFileExists(false);
            }
        };

        if (filePath) {
            checkFileExists();
        } else {
            setFileExists(false);
        }
    }, [filePath]);

    if (!fileExists) return <div><PageNotFound /><Footer /></div>;

    const fileUrl = `${import.meta.env.VITE_BACKEND_URL}uploads/${filePath}`;

    return (
        <div className="file-viewer bg-gray-600 w-[100vw] h-[100vh] fixed inset-0 flex justify-center items-center !z-[1000]">
            <iframe
                src={fileUrl}
                title="File Viewer"
                className="h-full w-full"
            />
        </div>
    );
};

export default FileViewer;
