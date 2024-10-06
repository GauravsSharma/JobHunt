import { UserModel } from "../models/User.js";
import bcryptjs from "bcryptjs"
import jwt from "jsonwebtoken"
import { v2 as cloudinary } from "cloudinary"
import { getDataUrl } from "../utils/dataUri.js";
export const register = async (req, res) => {
  try {
    const { email, password, phoneNumber, role, fullname } = req.body;
    const file = req.file;
    const fileUri = getDataUrl(file);
    if (!role) {
      return res.status(400).json({
        success: false,
        message: "Role is required"
      })
    }
    let user = await UserModel.findOne({ email })
    if (user) {
      return res.status(400).json({
        success: false,
        message: "User already exists"
      })
    }
    user = await UserModel.findOne({ phoneNumber })
    if (user) {
      return res.status(400).json({
        success: false,
        message: "This phone number is already in use."
      })
    }
    const myCloud = await cloudinary.uploader.upload(fileUri.content, {
      folder: "user_avatar"
    })

    const hashedPassword = await bcryptjs.hash(password, 10);
    user = await UserModel.create({
      fullname,
      email,
      password: hashedPassword,
      phoneNumber,
      role,
    })
    user.profile.profilePhoto = {
      public_id: myCloud.public_id,
      url: myCloud.secure_url
    }
    await user.save();
    return res.status(201).json({
      success: true,
      message: "Register Success"
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error
    })
  }
}
export const loadUser = async (req, res) => {
  try {
    const user = await UserModel.findById(req.userId)
    return res.status(200).json({
      success: true,
      user
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    })
  }
}
export const login = async (req, res) => {
  try {
    const { email, password, role } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Something is missing"
      });
    }

    let user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found"
      });
    }

    if (role !== user.role) {
      return res.status(400).json({
        success: false,
        message: "Cannot find user associated with this role"
      });
    }

    const isMatchPassword = await bcryptjs.compare(password, user.password);
    if (!isMatchPassword) {
      return res.status(400).json({
        success: false,
        message: "Incorrect password"
      });
    }

    const tokenData = {
      userId: user._id
    };

    const token = await jwt.sign(tokenData, process.env.SECRET_KEY, {
      expiresIn: "30d"
    });

    return res.status(200).cookie("token", token, {
      maxAge: 30 * 24 * 60 * 60 * 1000,
      httpOnly: true
    }).json({
      success: true,
      user, token
    });
  } catch (error) {
    console.error(error); // Log the error for debugging
    res.status(500).json({
      success: false,
      message: "Internal server error"
    });
  }
};
export const logout = async (req, res) => {
  try {
    return res.status(200).cookie("token", "", { maxAge: 0 }).json({
      success: true,
      message: "Logout success"
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    })
  }
}
export const updateProfile = async (req, res) => {
  try {
    const { fullname, email, phoneNumber, bio, skills, education, project } = req.body;
    const parsedEducation = education ? JSON.parse(education) : null;
    const parsedProject = project ? JSON.parse(project) : null;
    const file = req.file;  // This should be a file object
    const skillArray = skills?.split(",") || [];
    const user = await UserModel.findById(req.userId);
    
    if (fullname) user.fullname = fullname;
    if (email) user.email = email;
    if (phoneNumber) user.phoneNumber = phoneNumber;
    if (skills) user.profile.skills = skillArray;
    if (bio) user.profile.bio = bio;
    if (education) {
      // console.log(education);
      user.profile.education.push(
        {
          education_level: parsedEducation.education_level,
          education_name: parsedEducation.education_name,
          start_date:parsedEducation.start_date,
          end_date:parsedEducation.end_date?parsedEducation.end_date:null
        }
    )}
    if (project) {
      console.log(parsedProject);
      user.profile.projects.push({
        title: parsedProject.title,
        description: parsedProject.description,
        live_link: parsedProject.live_link,
        github_link: parsedProject.github_link,
      })
    }
    // Handle file upload if present
    if (file) {
      const fileUri = getDataUrl(file)
      const myCloud = await cloudinary.uploader.upload(fileUri.content, {
        folder: "user_resume", // Specify raw for non-image files like PDFs
      },)
      user.profile.resume = {
        public_id: myCloud.public_id,
        url: myCloud.secure_url
      };
      user.profile.resumeOriginalName = file.originalname;
    }

    await user.save();

    return res.status(200).json({
      message: "Profile updated",
      success: true,
      user
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error.message || "An error occurred"
    });
  }
};
export const getUserById = async (req, res) => {
  try {
    const userId = req.params.id;
    // log(`userid->${userId} user._id->${req.userId}`)
    let user = await UserModel.findById(req.userId);
    if (user.role === "student") {
      return res.status(401).json({
        success: false,
        message: "Student cannot see other's profile !"
      })
    }
    user = await UserModel.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      })
    }
    return res.status(200).json({
      success: true,
      user
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    })
  }
}
export const getUsernameAndProfilePhoto = async (req, res) => {
  try {
    const userId = req.params.id;
    // log(`userid->${userId} user._id->${req.userId}`)
    let user = await UserModel.findById(userId);
    const userNameAndProfilePhoto = {
      fullname:user.fullname,
      url:user.profile.profilePhoto.url
    }
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      })
    }
    return res.status(200).json({
      success: true,
      userNameAndProfilePhoto
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    })
  }
}
