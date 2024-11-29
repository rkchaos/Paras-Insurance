import 'dotenv/config';
import cors from 'cors';
import express from 'express';
import methodOverride from 'method-override';

const app = express();
const PORT = 8080;

// Middleware setup
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(methodOverride('_method'));

import connection from './database.js';
connection();

const corsOptions = {
    origin: true,
    credentials: true,
    optionsSuccessStatus: 200,
}
app.use(cors(corsOptions));

// import Client from './models/client.model.js';
import clientRoutes from './routes/client.route.js';
app.use('/client', clientRoutes);

// app.get('/', async (req, res) => {
//     console.log('req');
//     // await Client.create({
//     //     "user_type": "Client/Lead",
//     //     "personalDetails": {
//     //         "firstName": "John",
//     //         "lastName": "Doe",
//     //         "dob": "1985-06-15",
//     //         "gender": "Male",
//     //         "contact": {
//     //             "email": "john.doe@example.com",
//     //             "phone": "+91-9876543210"
//     //         },
//     //         "address": {
//     //             "street": "456 DEF Lane",
//     //             "city": "Pune",
//     //             "state": "Maharashtra",
//     //             "zipcode": "411001",
//     //             "country": "India"
//     //         },
//     //         "nominee": {
//     //             "name": "nominee_name",
//     //             "dob": "nominee_dob",
//     //             "relationship": "nominee_relation",
//     //             "phone": "nominee_phone"
//     //         }
//     //     },
//     //     "financial_details": {
//     //         "pan_card": "ABCDE1234F",
//     //         "aadhaar_number": "123456789012",
//     //         "account_details": {
//     //             "account_number": "987654321012",
//     //             "ifsc_code": "HDFC0001234",
//     //             "bank_name": "HDFC Bank"
//     //         }
//     //     },
//     //     "KYC": true,
//     //     "employment_details": {
//     //         "company_name": "Tech Solutions",
//     //         "designation": "Software Engineer",
//     //         "annual_income": 1200000
//     //     },
//     //     "lead_details": {
//     //         "source": "Website",
//     //         "interest_level": "High",
//     //         "lead_stage": "current_stage",
//     //         "assigned_to": "client_id",
//     //         "priority": "High",
//     //         "notes": [
//     //             {
//     //                 "note_id": "N002",
//     //                 "date": "2024-11-20",
//     //                 "description": "Lead is interested in Health Insurance."
//     //             }
//     //         ]
//     //     },
//     //     "interaction_history": [
//     //         {
//     //             "interaction_id": "INT001",
//     //             "date": "2024-11-15T10:30:00Z",
//     //             "interaction_type": "Call",
//     //             "description": "Discussed policy features and benefits."
//     //         }
//     //     ],
//     //     "notes": [
//     //         {
//     //             "note_id": "N001",
//     //             "date": "2024-11-20",
//     //             "description": "Client requested to update email address."
//     //         }
//     //     ]
//     // });
//     res.sendStatus(200);
// });

app.listen(PORT, () => {
    console.log(`Server working on PORT ${PORT}.`);
});