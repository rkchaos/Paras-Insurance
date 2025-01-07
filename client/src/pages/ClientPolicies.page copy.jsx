import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { tailChase } from 'ldrs';
import { Download } from '@mui/icons-material';
import Spreadsheet from 'react-spreadsheet';
import * as XLSX from 'xlsx';
// importing api end-points
import { fetchPoliciesData } from '../api';
// importing contexts
import { ClientContext } from "../contexts/Client.context";
// importing components
import Footer from "../components/Footer";

const ClientPolicies = () => {
    const { id } = useParams();

    const { condenseClientInfo } = useContext(ClientContext);

    const [isLoadingClientPolicies, setIsLoadingClientPolicies] = useState(true);
    const [isUnauthorisedAction, setIsUnauthorisedAction] = useState(false);
    const [isClientPoliciesFound, setIsClientPoliciesFound] = useState(true);
    const [clientPolicies, setClientPolicies] = useState(true);
    const [clientName, setClientName] = useState('');

    const getClientPolicies = async () => {
        try {
            const { data } = await fetchPoliciesData({ clientId: id });
            const { clientPolicies, clientFirstName, clientLastName } = data;
            setClientPolicies(clientPolicies);
            if (clientLastName) {
                setClientName(`${clientFirstName} ${clientLastName}`);
            } else {
                setClientName(`${clientFirstName}`);
            }
            setIsLoadingClientPolicies(false);
        } catch (error) {
            const { status } = error;
            const errorMessage = error?.response?.data?.message;
            if (status === 400 && errorMessage === 'Unauthorised action.') {
                setIsLoadingClientPolicies(false);
                setIsUnauthorisedAction(true);
            } else if (status === 404 && errorMessage === 'No client found.') {
                setIsLoadingClientPolicies(false);
                setIsClientPoliciesFound(false);
            } else {
                console.error(error);
            }
        }
    }
    useEffect(() => {
        window.scrollTo(0, 0);
        getClientPolicies();
    }, [id]);

    tailChase.register();

    const handleDownloadExcel = () => {
        const worksheetData = selectedCompanyPolicies.map((row) =>
            Array.isArray(row) ? row.map((cell) => (cell.value ? cell.value : cell)) : row
        );
        const worksheet = XLSX.utils.aoa_to_sheet(worksheetData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
        XLSX.writeFile(workbook, 'Quotation.xlsx');
    };
    
    const repeatedFields = (n, field) => {
        const elements = [];
        for (let index = 0; index < n; index++) {
            elements.push(
                ...Object.entries(field.children).map(([key, childField]) => {
                    if (selectedPolicy.data[`${index + 1}${childField.name}`] == null || selectedPolicy.data[`${index + 1}${childField.name}`] == '' || selectedPolicy.data[`${index + 1}${childField.name}`] == 'Self') {
                        return null;
                    } else {
                        return (
                            <p className='ml-4' key={`${index}-${key}`}>
                                <strong>{childField.label}</strong>: {selectedPolicy.data[`${index + 1}${childField.name}`]}
                            </p>
                        );
                    }
                })
            );
        }
        return elements;
    };
    const [isCompanyPolicySelected, setIsCompanyPolicySelected] = useState(false);
    const [selectedCompanyPolicies, setSelectedCompanyPolicies] = useState([]);
    const selectCompanyPolicies = (availablePolicies) => {
        setIsCompanyPolicySelected(true);
        console.log(selectedCompanyPolicies);
        setSelectedCompanyPolicies(availablePolicies);
    }
    const [policies, setPolicies] = useState([]);
    const [isPolicySelected, setIsPolicySelected] = useState(false);
    const [selectedPolicy, setSelectedPolicy] = useState({});
    const selectPolicy = (policyData) => {
        setIsPolicySelected(true);
        setSelectedPolicy(policyData);
    }

    return (
        <div>
            {isLoadingClientPolicies ?
                <div className='min-h-screen flex justify-center items-center'>
                    <l-tail-chase size='40' speed='1.75' color='#111827' />
                </div>
                :
                isUnauthorisedAction ?
                    <div className="flex flex-col justify-center items-center my-16">
                        <lord-icon
                            src='https://cdn.lordicon.com/dicvhxpz.json'
                            trigger='morph'
                            stroke='bold' state='morph-cross'
                            colors='primary:#111827,secondary:#111827'
                            style={{ width: '250px', height: '250px' }}
                        />
                        <p className='text-3xl font-semibold text-gray-900'>Unauthorised action performed</p>
                    </div>
                    :
                    !isClientPoliciesFound ?
                        <div className="flex flex-col justify-center items-center my-16">
                            <lord-icon
                                src="https://cdn.lordicon.com/hwjcdycb.json"
                                trigger="hover"
                                colors='primary:#111827,secondary:#111827'
                                style={{ width: '250px', height: '250px' }}
                            />
                            <p className='text-3xl font-semibold text-gray-900'>No client found</p>
                        </div>
                        :
                        <div className='py-4 sm:px-16 bg-gray-200'>
                            <h1 className='text-3xl text-center font-bold mb-6'>
                                {id !== condenseClientInfo._id && (
                                    condenseClientInfo.role?.toLowerCase() === 'superadmin' ||
                                    condenseClientInfo.role?.toLowerCase() === 'admin'
                                ) ? `${clientName}'s Policies` : 'My Policies'}
                            </h1>
                            <pre>
                                {JSON.stringify(clientPolicies, undefined, 2)}
                            </pre>
                        </div>
            }
            <Footer />
        </div>
    )
}

export default ClientPolicies;