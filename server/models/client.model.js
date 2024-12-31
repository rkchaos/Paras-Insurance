import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
const saltRounds = 10;

const policySchema = new mongoose.Schema({
    policyId: {
        type: mongoose.Schema.Types.ObjectId, ref: 'Policy'
    },
    interestedIn: {
        type: Boolean
    }
});

const clientSchema = new mongoose.Schema({
    userType: {
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
            PINCODE: {
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
    financialDetails: {
        panCard: {
            type: String
        },
        aadhaarNo: {
            type: String
        },
        accountDetails: {
            accountNo: {
                type: String
            },
            ifscCode: {
                type: String
            },
            bankName: {
                type: String
            }
        }
    },
    KYC: {
        type: Boolean,
        default: false
    },
    employmentDetails: {
        companyName: {
            type: String
        },
        designation: {
            type: String
        },
        annualIncome: {
            type: Number
        }
    },
    leadDetails: {
        source: {
            type: String
        },
        interestLevel: {
            type: String
        },
        leadStage: {
            type: String
        },
        assignedTo: {
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
    interactionHistory: {
        type: [
            {
                type: {
                    type: String,
                },
                description: {
                    type: String,
                },
                timestamp: {
                    type: Date,
                    default: Date.now,
                }
            }
        ],
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

clientSchema.pre('save', async function (next) {
    if (this.isNew) {
        this.interactionHistory.push({
            type: 'Account Creation',
            description: 'Account created.',
        });
    }

    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, saltRounds);
    }

    next();
});

clientSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password);
}

clientSchema.methods.addInteraction = async function (type, description) {
    this.interactionHistory.push({
        type,
        description,
    });
    await this.save();
};

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

const Client = mongoose.model('Client', clientSchema);
export default Client;