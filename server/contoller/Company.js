import { CompanyModel } from "../models/Company.js";
import { UserModel } from "../models/User.js";
import { v2 as cloudinary } from "cloudinary"
import { getDataUrl } from "../utils/dataUri.js";

export const registerCompany = async (req, res) => {
    try {
        const user = await UserModel.findById(req.userId);
        if(user.role!=="recruiter"){
            return res.status(400).json({
                success: false,
                message: "Student cannot create a company !"
            })
        }
        const { name, description, website, location } = req.body;
        if (!name) {
            return res.status(400).json({
                success: false,
                message: "Name is required to register a company"
            })
        }
        let company = await CompanyModel.findOne({ name });
        if (company) {
            return res.status(400).json({
                success: false,
                message: "This company is already register"
            })
        }

        company = await CompanyModel.create({
            name,
            description: description || "",
            website: website || "",
            location: location || "",
            userId: req.userId,
        });
        await company.save()
        return res.status(201).json({
            success: false,
            message: "Company created",
            company
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}
export const getCompany = async (req, res) => {
    try {
        const companies = await CompanyModel.find({ userId: req.userId });
        if (!companies) {
            return res.status(200).json({
                success: true,
                companies: []
            })
        }
        return res.status(200).json({
            success: true,
            companies
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}
export const getCompanyById = async (req, res) => {
    try {
        const companyId = req.params.id;
        const company = await CompanyModel.findById(companyId)
        if (!company) {
            return res.status(400).json({
                success: false,
                message: "No such company found"
            })
        }
        return res.status(200).json({
            success: true,
            company
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}
export const updateCompany = async (req, res) => {
    try {
        const companyId = req.params.id;
        if (!companyId) {
            return res.status(400).json({
                success: false,
                message: "Company Id is required"
            })
        }
        const { name, description, website, location, logo } = req.body;
        let company = await CompanyModel.findById(companyId);
        const file = req.file;
        if(file){
            const fileUri = getDataUrl(file);
            const myCloud = await cloudinary.uploader.upload(fileUri.content, {
                folder: "user_avatar"
            })
            company.logo = {
                public_id:myCloud.public_id,
                url:myCloud.secure_url
            }
        }
        if (name) {
            company.name = name;
        }
        if (description) {
            company.description = description;
        }
        if (website) {
            company.website = website;
        }
        if (location) {
            company.location = location;
        }
        await company.save()
        return res.status(200).json({
            success: false,
            message: "Company updated",
            company
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}