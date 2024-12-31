import Company from "../models/company.model.js";

const createCompany = async (req, res) => {
    try {
        console.log(req.body);
        const company = new Company(req.body);
        await company.save();
        res.status(201).json({ company });
    } catch (error) {
        console.log(error);
        res.status(503).json({ message: 'Network error. Try agin' });
    }
}

const fetchAllCompanies = async (req, res) => {
    try {
        const companies = await Company.find();
        res.status(200).json(companies);
    } catch (error) {
        console.log(error);
        res.status(503).json({ message: 'Network error. Try agin' });
    }
}

const updateCompany = async (req, res) => {
    try {
        const updatedCompany = await Company.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedCompany) return res.status(404).json({ message: 'Company not found' });
        res.status(200).json(updatedCompany);
    } catch (error) {
        console.log(error);
        res.status(503).json({ message: 'Network error. Try agin' });
    }
}

const deleteCompany = async (req, res) => {
    try {
        const deletedCompany = await Company.findByIdAndDelete(req.params.id);
        if (!deletedCompany) return res.status(404).json({ message: 'Company not found' });
        res.status(200).json(deletedCompany);
    } catch (error) {
        console.log(error);
        res.status(503).json({ message: 'Network error. Try agin' });
    }
}

const addCompanyPolicy = async (req, res) => {
    try {
        const company = await Company.findById(req.params.companyId);
        if (!company) return res.status(404).json({ message: 'Company not found' });
        company.policies.push(req.body);
        await company.save();
        res.status(201).json(company);
    } catch (error) {
        console.log(error);
        res.status(503).json({ message: 'Network error. Try agin' });
    }
}

const deleteCompanyPolicy = async (req, res) => {
    try {
        const company = await Company.findById(req.params.companyId);
        if (!company) return res.status(404).json({ message: 'Company not found' });

        company.policies.id(req.params.policyId).remove();
        await company.save();
        res.status(200).json(company);
    } catch (error) {
        console.log(error);
        res.status(503).json({ message: 'Network error. Try agin' });
    }
}

export {
    createCompany,
    fetchAllCompanies,
    updateCompany,
    deleteCompany,
    addCompanyPolicy,
    deleteCompanyPolicy,
}