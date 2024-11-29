import Client from '../models/client.model.js';

const cookiesOptions = {
    httpOnly: true,
    secure: true,
    sameSite: 'None'
};

const condenseClientInfo = (client) => {
    const clientSessionObj = {
        _id: client._id,
        firstName: client.personalDetails.firstName,
        lastName: client.personalDetails.lastName,
        email: client.personalDetails.contact.email,
        phone: client.personalDetails.contact.phone,
    };
    return clientSessionObj;
}

const generateAccessAndRefreshTokens = async (client) => {
    try {
        const accessToken = await client.generateAccessToken();
        const refreshToken = await client.generateRefreshToken();

        client.refreshToken = refreshToken;
        await client.save({ validateBeforeSave: false });

        return { accessToken, refreshToken };
    } catch (error) { return null }
}

const register = async (req, res) => {
    console.log(req.body);
    try {
        const { firstName, lastName, email, phone, password } = req.body;

        const isClientEmailUnique = await Client.findOne({ 'personalDetails.contact.email': email });
        if (isClientEmailUnique) return res.status(400).json({ message: 'Email already registered. Login' });

        const isClientPhoneUnique = await Client.findOne({ 'personalDetails.contact.phone': phone });
        if (isClientPhoneUnique) return res.status(400).json({ message: 'Phone already registered. Login' });

        const newClient = await Client.create({
            user_type: 'Lead',
            password: password,
            personalDetails: {
                firstName: firstName,
                lastName: lastName,
                contact: {
                    email: email,
                    phone: phone
                },
            }
        });

        const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(newClient);
        const clientInfo = condenseClientInfo(newClient);

        res.status(200)
            .cookie('accessToken', accessToken, cookiesOptions)
            .cookie('refreshToken', refreshToken, cookiesOptions)
            .json(clientInfo);
    } catch (error) {
        console.log(error);
        res.status(503).json({ message: 'Network error. Try agin' });
    }
}

const login = async (req, res) => {
    try {
        const { emailOrPhone, password } = req.body;
        const checkForEmail = await Client.findOne({ 'personalDetails.contact.email': emailOrPhone });
        const checkForPhone = await Client.findOne({ 'personalDetails.contact.phone': emailOrPhone });
        if (!checkForEmail && !checkForPhone) return res.status(404).json({ message: 'No such client found' });

        let existingClient;
        if (checkForEmail) existingClient = checkForEmail;
        if (checkForPhone) existingClient = checkForPhone;

        const isPasswordCorrect = await existingClient.isPasswordCorrect(password);
        if (!isPasswordCorrect) return res.status(400).json({ message: 'Invalid credentials' });

        const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(existingClient);
        const clientInfo = condenseClientInfo(existingClient);

        res.status(200)
            .cookie('accessToken', accessToken, cookiesOptions)
            .cookie('refreshToken', refreshToken, cookiesOptions)
            .json(clientInfo);
    } catch (error) { res.status(503).json({ message: 'Network error. Try again' }) }
}

const logout = async (req, res) => {
    try {
        Client.findByIdAndUpdate(
            req.client._id,
            {
                $set: { refreshToken: undefined }
            }
        );
        res.status(200)
            .clearCookie('accessToken', cookiesOptions)
            .clearCookie('refreshToken', cookiesOptions)
            .json({ message: 'Successfully logged out' });
    } catch (error) { res.status(503).json({ message: 'Network error. Try again' }) }
}

export {
    register,
    login,
    logout
};