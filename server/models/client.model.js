import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
const saltRounds = 10;

const policySchema = new mongoose.Schema({
    policy_id: {
        type: mongoose.Schema.Types.ObjectId, ref: "Policy"
    },
    interested_in: {
        type: Boolean
    }
});

const clientSchema = new mongoose.Schema({
    user_type: {
        type: String
    },
    password: {
        type: String
    },
    refreshToken: { 
        type: String 
    },
    personalDetails: {
        firstName: {
            type: String
        },
        lastName: {
            type: String
        },
        dob: {
            type: Date
        },
        gender: {
            type: String
        },
        contact: {
            email: {
                type: String
            },
            phone: {
                type: String
            }
        },
        address: {
            street: {
                type: String
            },
            city: {
                type: String
            },
            state: {
                type: String
            },
            zipcode: {
                type: String
            },
            country: {
                type: String
            }
        },
        nominee: {
            name: {
                type: String
            },
            dob: {
                type: String
            },
            relationship: {
                type: String
            },
            phone: {
                type: String
            }
        }
    },
    financial_details: {
        pan_card: {
            type: String
        },
        aadhaar_number: {
            type: String
        },
        account_details: {
            account_number: {
                type: String
            },
            ifsc_code: {
                type: String
            },
            bank_name: {
                type: String
            }
        }
    },
    KYC: {
        type: Boolean
    },
    employment_details: {
        company_name: {
            type: String
        },
        designation: {
            type: String
        },
        annual_income: {
            type: Number
        }
    },
    lead_details: {
        source: {
            type: String
        },
        interest_level: {
            type: String
        },
        lead_stage: {
            type: String
        },
        assigned_to: {
            type: String
        },
        priority: {
            type: String
        },
        notes: {
            type: mongoose.Schema.Types.Array,
            default: []
        }
    },
    interaction_history: {
        type: mongoose.Schema.Types.Array,
        default: []
    },
    policies: {
        type: [policySchema]
    },
    notes: {
        type: mongoose.Schema.Types.Array,
        default: []
    }
}, { timestamps: true });

clientSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();

    this.password = await bcrypt.hash(this.password, saltRounds);
    next();
});

clientSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password);
}

clientSchema.methods.generateAccessToken = async function () {
    return await jwt.sign(
        { _id: this._id },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: process.env.ACCESS_TOKEN_EXPIRY }
    );
}

clientSchema.methods.generateRefreshToken = async function () {
    return await jwt.sign(
        { _id: this._id },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: process.env.REFRESH_TOKEN_EXPIRY }
    );
}
const Client = mongoose.model("Client", clientSchema);
export default Client;