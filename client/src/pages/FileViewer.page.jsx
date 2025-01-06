import { useParams } from 'react-router-dom';

const FileViewer = () => {
    const { filePath } = useParams();
    const fileUrl = `${import.meta.env.VITE_BACKEND_URL}uploads/${filePath}`;

    return (
        <div className="file-viewer">
            <iframe
                src={fileUrl}
                title="File Viewer"
                className='fixed top-0 left-0 h-full w-full border-0 z-50'
            ></iframe>
        </div>
    );
};

export default FileViewer;