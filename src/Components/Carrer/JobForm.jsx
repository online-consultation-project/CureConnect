import React, { useState } from "react";
import { TextField, Button, Grid, Box, Typography, Input } from "@mui/material";
import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaWhatsapp,
} from "react-icons/fa";
import { MdOutlineEmail, MdLink } from "react-icons/md";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import axios from "axios"; // Import axios

const JobForm = () => {
  const initialFormData = {
    firstName: "",
    lastName: "",
    email: "",
    mobile: "",
    street: "",
    city: "",
    state: "",
    zip: "",
    country: "",
    linkedin: "",
    photo: null,
    resume: null,
    certification: null,
    educationalDetails: [],
  };

  const [formData, setFormData] = useState(initialFormData);
  const [educationForms, setEducationForms] = useState([
    {
      institute: "",
      major: "",
      degree: "",
      durationStartMonth: "",
      durationStartYear: "",
      durationEndMonth: "",
      durationEndYear: "",
    },
  ]);

  const handleChange = (e, index) => {
    const { name, value } = e.target;
    const updatedEducationForms = [...educationForms];
    updatedEducationForms[index][name] = value;
    setEducationForms(updatedEducationForms);
  };

  const handleAddEducation = () => {
    if (educationForms.length < 3) {
      setEducationForms([
        ...educationForms,
        {
          educationLevel: "",
          institute: "",
          major: "",
          degree: "",
          durationStartMonth: "",
          durationStartYear: "",
          durationEndMonth: "",
          durationEndYear: "",
        },
      ]);
    }
  };

  const handleRemoveEducation = (index) => {
    const updatedEducationForms = educationForms.filter((_, i) => i !== index);
    setEducationForms(updatedEducationForms);
  };

  const handleClearSection = (section) => {
    setFormData((prevData) => {
      const newFormData = { ...prevData };
      switch (section) {
        case "basicInfo":
          newFormData.firstName = "";
          newFormData.lastName = "";
          newFormData.email = "";
          newFormData.mobile = "";
          break;
        case "address":
          newFormData.street = "";
          newFormData.city = "";
          newFormData.state = "";
          newFormData.zip = "";
          newFormData.country = "";
          break;
        case "professional":
          newFormData.jobTitle = "";
          newFormData.skills = "";
          break;
        case "social":
          newFormData.linkedin = "";
          break;
        case "attachment":
          newFormData.photo = null;
          newFormData.resume = null;
          newFormData.certification = null;
          break;
        default:
          break;
      }
      return newFormData;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const formDataToSend = new FormData();
    formDataToSend.append("firstName", formData.firstName);
    formDataToSend.append("lastName", formData.lastName);
    formDataToSend.append("email", formData.email);
    formDataToSend.append("mobile", formData.mobile);
    formDataToSend.append("street", formData.street);
    formDataToSend.append("city", formData.city);
    formDataToSend.append("state", formData.state);
    formDataToSend.append("zip", formData.zip);
    formDataToSend.append("country", formData.country);
    formDataToSend.append("linkedin", formData.linkedin);
  
    // Attach files
    if (formData.photo) formDataToSend.append("photo", formData.photo);
    if (formData.resume) formDataToSend.append("resume", formData.resume);
    if (formData.certification) formDataToSend.append("certification", formData.certification);
  
    // Ensure only non-empty educational details are included
    const filteredEducationForms = educationForms.filter(
      (edu) => edu.institute && edu.major && edu.degree
    );
  
    // Convert to JSON string
    formDataToSend.append("educationalDetails", JSON.stringify(filteredEducationForms));
  
    try {
      const response = await axios.post(
        "http://localhost:8000/api/jobapplication/submitform",
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response.data);
    } catch (error) {
      console.error("Error submitting form", error);
    }
  };
  
  

  return (
    <div>
      <div
        className="relative w-full bg-cover bg-center h-64 flex items-center mb-10 justify-center"
        style={{
          backgroundImage:
            "url('https://source.unsplash.com/1600x900/?office')",
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="text-center text-white relative z-10">
          <p className="text-lg font-semibold">Cure Connect | Full time</p>
          <h1 className="text-3xl font-bold">
            Full Stack Developer (0.6 months - 1 year)
          </h1>
          <p className="mt-2">Coimbatore, India | Posted on 01/23/2025</p>

          {/* Social Media Icons */}
          <div className="mt-4 flex justify-center gap-4 text-white">
            <FaFacebookF className="cursor-pointer hover:text-gray- text-xl" />
            <FaTwitter className="cursor-pointer hover:text-gray- text-xl" />
            <FaLinkedinIn className="cursor-pointer hover:text-gray- text-xl" />
            <FaWhatsapp className="cursor-pointer hover:text-gray- text-xl" />
            <MdOutlineEmail className="cursor-pointer hover:text-gray- text-xl" />
            <MdLink className="cursor-pointer hover:text-gray- text-xl" />
          </div>
        </div>
      </div>

      <div className="py-4">
        <Box
          sx={{
            maxWidth: 900,
            margin: "auto",
            padding: 4,
            border: "2px solid gray",
            borderRadius: "8px",
          }}
        >
          <Typography variant="h4" align="center" gutterBottom sx={{ pb: 3 }}>
            Personal Information Form
          </Typography>

          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              {/* Basic Info Section */}
              <div className="w-full justify-between flex gap-10 py-5">
                <p className="text-2xl font-medium">Basic Information</p>
                <Button
                  variant="outlined"
                  onClick={() => handleClearSection("basicInfo")}
                  className="ml-auto"
                >
                  Clear
                </Button>
              </div>

              <Grid item xs={12} sm={6}>
                <TextField
                  label="First Name"
                  name="firstName"
                  value={formData.firstName}
                  onChange={(e) =>
                    setFormData({ ...formData, firstName: e.target.value })
                  }
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Last Name"
                  name="lastName"
                  value={formData.lastName}
                  onChange={(e) =>
                    setFormData({ ...formData, lastName: e.target.value })
                  }
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Mobile"
                  name="mobile"
                  value={formData.mobile}
                  onChange={(e) =>
                    setFormData({ ...formData, mobile: e.target.value })
                  }
                  fullWidth
                />
              </Grid>

              {/* Address Info Section */}
              <div className="w-full justify-between flex gap-10 py-8">
                <p className="text-2xl font-medium">Address Information</p>
                <Button
                  variant="outlined"
                  onClick={() => handleClearSection("address")}
                  className="ml-auto"
                >
                  Clear
                </Button>
              </div>

              <Grid item xs={12}>
                <TextField
                  label="Street"
                  name="street"
                  value={formData.street}
                  onChange={(e) =>
                    setFormData({ ...formData, street: e.target.value })
                  }
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="City"
                  name="city"
                  value={formData.city}
                  onChange={(e) =>
                    setFormData({ ...formData, city: e.target.value })
                  }
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="State/Province"
                  name="state"
                  value={formData.state}
                  onChange={(e) =>
                    setFormData({ ...formData, state: e.target.value })
                  }
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Zip/Postal Code"
                  name="zip"
                  value={formData.zip}
                  onChange={(e) =>
                    setFormData({ ...formData, zip: e.target.value })
                  }
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Country"
                  name="country"
                  value={formData.country}
                  onChange={(e) =>
                    setFormData({ ...formData, country: e.target.value })
                  }
                  fullWidth
                />
              </Grid>

              {/* Educational Details Section */}
              <div className="w-full flex gap-10 py-8">
                <p className="text-2xl font-medium">Educational Details</p>
                <Grid item xs={12} sx={{ textAlign: "right" }}>
                  <Button
                    variant="outlined"
                    onClick={handleAddEducation}
                    disabled={educationForms.length >= 3}
                  >
                    Add Form
                  </Button>
                </Grid>
              </div>

              {/* Educational Forms */}
              {educationForms.map((education, index) => (
                <Grid container spacing={2} key={index}>
                  {/* Remove button for second and third forms */}
                  {educationForms.length > 1 && (
                    <Grid
                      item
                      xs={12}
                      sx={{ display: "flex", justifyContent: "flex-end" }}
                    >
                      <Button
                        variant="outlined"
                        color="error"
                        onClick={() => handleRemoveEducation(index)}
                      >
                        Remove
                      </Button>
                    </Grid>
                  )}

                  <Grid item xs={12}>
                    <FormControl fullWidth>
                      <InputLabel>Education Level</InputLabel>
                      <Select
                        name="educationLevel"
                        value={education.educationLevel}
                        onChange={(e) => handleChange(e, index)}
                      >
                        <MenuItem value="Xth Standard">Xth Standard</MenuItem>
                        <MenuItem value="11th">11th</MenuItem>
                        <MenuItem value="UG">UG</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      label="Institute/School"
                      name="institute"
                      value={education.institute}
                      onChange={(e) => handleChange(e, index)}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      label="Major/Department"
                      name="major"
                      value={education.major}
                      onChange={(e) => handleChange(e, index)}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      label="Degree"
                      name="degree"
                      value={education.degree}
                      onChange={(e) => handleChange(e, index)}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      label="Start Month"
                      name="durationStartMonth"
                      value={education.durationStartMonth}
                      onChange={(e) => handleChange(e, index)}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      label="Start Year"
                      name="durationStartYear"
                      value={education.durationStartYear}
                      onChange={(e) => handleChange(e, index)}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      label="End Month"
                      name="durationEndMonth"
                      value={education.durationEndMonth}
                      onChange={(e) => handleChange(e, index)}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      label="End Year"
                      name="durationEndYear"
                      value={education.durationEndYear}
                      onChange={(e) => handleChange(e, index)}
                      fullWidth
                    />
                  </Grid>
                </Grid>
              ))}

              {/* Social Media Links Section */}
              <div className="w-full justify-between flex gap-10 py-8">
                <p className="text-2xl font-medium">Social Media Links</p>
                <Button
                  variant="outlined"
                  onClick={() => handleClearSection("social")}
                  className="ml-auto"
                >
                  Clear
                </Button>
              </div>

              <Grid item xs={12}>
                <TextField
                  label="LinkedIn"
                  name="linkedin"
                  value={formData.linkedin}
                  onChange={(e) =>
                    setFormData({ ...formData, linkedin: e.target.value })
                  }
                  fullWidth
                />
              </Grid>

              {/* Attachment Info Section */}
              <div className="w-full justify-between flex gap-10 py-8">
                <p className="text-2xl font-medium">Attachment Information</p>
                <Button
                  variant="outlined"
                  onClick={() => handleClearSection("attachment")}
                  className="ml-auto"
                >
                  Clear
                </Button>
              </div>

              <Grid item xs={12} sm={6}>
                <Input
                  accept="image/*"
                  type="file"
                  onChange={(e) =>
                    setFormData({ ...formData, photo: e.target.files[0] })
                  }
                  name="photo"
                  fullWidth
                  required
                />
                <Typography variant="body2" sx={{ mt: 1 }}>
                  Photo *
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Input
                  accept=".pdf,.doc,.docx"
                  type="file"
                  onChange={(e) =>
                    setFormData({ ...formData, resume: e.target.files[0] })
                  }
                  name="resume"
                  fullWidth
                  required
                />
                <Typography variant="body2" sx={{ mt: 1 }}>
                  Resume *
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Input
                  accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                  type="file"
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      certification: e.target.files[0],
                    })
                  }
                  name="certification"
                  fullWidth
                  required
                />
                <Typography variant="body2" sx={{ mt: 1 }}>
                  Certification *
                </Typography>
              </Grid>

              <Grid item xs={12} sx={{ textAlign: "center", mt: 2 }}>
                <Button variant="contained" color="primary" type="submit">
                  Submit
                </Button>
              </Grid>
            </Grid>
          </form>
        </Box>
      </div>
    </div>
  );
};

export default JobForm;
