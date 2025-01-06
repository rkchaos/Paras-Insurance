const PageNotFound = () => {
    return (
        <div className="flex flex-col justify-center items-center my-16">
            <lord-icon
                src="https://cdn.lordicon.com/lltgvngb.json"
                trigger="in" delay="100"
                stroke="bold" state="in-reveal"
                colors="primary:#111827,secondary:#111827"
                style={{ width: '250px', height: '250px' }}
            />
            <p className="text-3xl font-semibold text-gray-900">Page Not Found</p>
        </div>
    );
}

export default PageNotFound;