const PolicyModal = ({ companyPolicies, isOpen, onClose, onSend }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white rounded-lg p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                <h2 className="text-2xl font-bold mb-4">
                    Available policies ({companyPolicies.length})
                </h2>

                {companyPolicies.length === 0 ? (
                    <p className="text-center text-gray-500 my-4">No policy found</p>
                ) : (
                    companyPolicies.map((policy, index) => (
                        <div key={index} className="mb-6 p-4 border border-gray-200 rounded-lg">
                            <h3 className="text-xl font-semibold mb-2">{policy.policyName}</h3>
                            <p className="mb-2"><strong>Company:</strong> {policy.companyName}</p>
                            <p className="mb-2"><strong>Type:</strong> {policy.policyType}</p>
                            <p className="mb-2"><strong>Description:</strong> {policy.policyDescription}</p>
                            <p className="mb-2"><strong>Features:</strong></p>
                            <ul className="list-disc pl-5 mb-2">
                                {policy.policyFeatures.split(',').map((feature, i) => (
                                    <li key={i}>{feature.trim()}</li>
                                ))}
                            </ul>
                            <p className="mb-2"><strong>Coverage Amount:</strong> ${policy.coverageAmount.toLocaleString()}</p>
                            <p className="mb-2"><strong>Coverage Type:</strong> {policy.coverageType}</p>
                            <p className="mb-2"><strong>Premium Amount:</strong> ${policy.premiumAmount.toLocaleString()}</p>
                            <p><strong>Premium Type:</strong> {policy.premiumType}</p>
                        </div>
                    ))
                )}

                <div className="flex justify-end mt-4">
                    <button
                        onClick={onClose}
                        className="bg-gray-300 hover:bg-gray-400 text-black font-bold py-2 px-4 rounded mr-2"
                    >
                        Close
                    </button>
                    <button
                        onClick={onSend}
                        disabled={companyPolicies.length === 0}
                        className={`${companyPolicies.length === 0
                            ? 'bg-gray-300 cursor-not-allowed'
                            : 'bg-blue-500 hover:bg-blue-700'
                            } text-white font-bold py-2 px-4 rounded`}
                    >
                        Send
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PolicyModal;
// const App = () => {
//     const [isModalOpen, setIsModalOpen] = useState(false);
//     const [policies, setPolicies] = useState([
//         {
//             "companyName": "Test",
//             "policyName": "travels",
//             "policyType": "travel",
//             "policyDescription": "sdcsd",
//             "policyFeatures": "sd,\nsdc\nsd,cs\nsd",
//             "coverageAmount": 10000,
//             "coverageType": "sdcs",
//             "premiumAmount": 45000,
//             "premiumType": "scsdcsd"
//         },
//         {
//             "companyName": "Test 2",
//             "policyName": "travel insurance",
//             "policyType": "travel",
//             "policyDescription": "desciption init",
//             "policyFeatures": "this,\nis comma seprated,\nor is it?",
//             "coverageAmount": 45000,
//             "coverageType": "everything",
//             "premiumAmount": 600000,
//             "premiumType": "xl"
//         }
//     ]);

//     const handleOpenModal = () => setIsModalOpen(true);
//     const handleCloseModal = () => setIsModalOpen(false);
//     const handleSend = () => {
//         // Implement send functionality here
//         console.log('Sending policies...');
//         handleCloseModal();
//     };

//     return (
//         <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center p-4">
//             <h1 className="text-3xl font-bold mb-4">Policy Viewer</h1>
//             <button
//                 onClick={handleOpenModal}
//                 className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
//             >
//                 View Policies
//             </button>
//             <PolicyModal
//                 policies={policies}
//                 isOpen={isModalOpen}
//                 onClose={handleCloseModal}
//                 onSend={handleSend}
//             />
//         </div>
//     );
// };

// export default App;