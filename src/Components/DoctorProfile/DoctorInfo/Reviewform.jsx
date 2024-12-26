import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import {
  Grid,
  TextField,
  MenuItem,
  Button,
  Typography,
  Paper,
} from "@mui/material";
import Loader from "../../ReusableComp/Loader";

const ReportMessage = () => {
  const [formData, setFormData] = useState({
    subject: "",
    issue: "",
    detailedProblem: "",
  });
  const [loading, setLoading] = useState(false);

  const issueOptions = [
    "Appointment scheduling issues",
    "Payment gateway issues",
    "Technical glitch on the website",
    "Miscommunication with users",
    "Other",
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { subject, issue, detailedProblem } = formData;

    if (!subject.trim()) {
      toast.error("Subject is required!");
      return;
    }

    if (!issue) {
      toast.error("Please select an issue!");
      return;
    }

    if (!detailedProblem.trim()) {
      toast.error("Detailed problem is required!");
      return;
    }

    setLoading(true);

    try {
      const payload = {
        subject,
        issue,
        detailedProblem,
      };

      const token = localStorage.getItem("token"); // Get token from localStorage or session
      const headers = {
        Authorization: token ? `Bearer ${token}` : "", // Send the token if available
      };

      const response = await axios.post(
        "http://localhost:7000/admin/report",
        payload,
        { headers }
      );

      if (response.status === 200) {
        toast.success("Report sent successfully!");
        setFormData({ subject: "", issue: "", detailedProblem: "" });
      } else {
        toast.error("Failed to send report.");
      }
    } catch (error) {
      console.error("Error sending report:", error);
      toast.error("An error occurred while sending the report.");
    } finally {
      setLoading(false);
    }
  };

  return loading ? (
    <Loader /> // Render the Loader component when loading
  ) : (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      style={{
        minHeight: "100vh",
        backgroundColor: "#f4f6f8",
        padding: "1rem",
      }}
    >
      <Grid item xs={12} sm={10} md={8} lg={6}>
        <Paper
          elevation={3}
          style={{
            padding: "2rem",
            borderRadius: "8px",
            boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
          }}
        >
          <Typography
            variant="h4"
            align="center"
            gutterBottom
            style={{ color: "#1565c0", marginBottom: "1rem", fontWeight: 600 }}
          >
            Report Your Issues
          </Typography>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              {/* Subject Field */}
              <Grid item xs={12}>
                <TextField
                  label="Subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  fullWidth
                  variant="outlined"
                  placeholder="Enter subject"
                  required
                  InputProps={{ style: { fontSize: "1rem" } }}
                  InputLabelProps={{ style: { fontSize: "1rem" } }}
                />
              </Grid>

              {/* Issue Dropdown */}
              <Grid item xs={12}>
                <TextField
                  select
                  label="Select an Issue"
                  name="issue"
                  value={formData.issue}
                  onChange={handleChange}
                  fullWidth
                  variant="outlined"
                  required
                  InputProps={{ style: { fontSize: "1rem" } }}
                  InputLabelProps={{ style: { fontSize: "1rem" } }}
                >
                  <MenuItem value="">
                    <em>-- Select an Issue --</em>
                  </MenuItem>
                  {issueOptions.map((option, index) => (
                    <MenuItem key={index} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>

              {/* Detailed Problem Field */}
              <Grid item xs={12}>
                <TextField
                  label="Detailed Problem"
                  name="detailedProblem"
                  value={formData.detailedProblem}
                  onChange={handleChange}
                  multiline
                  rows={5}
                  fullWidth
                  variant="outlined"
                  placeholder="Describe the problem in detail"
                  required
                  InputProps={{ style: { fontSize: "1rem" } }}
                  InputLabelProps={{ style: { fontSize: "1rem" } }}
                />
              </Grid>

              {/* Submit Button */}
              <Grid item xs={12}>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  style={{
                    backgroundColor: "#1565c0",
                    color: "white",
                    fontSize: "1rem",
                    padding: "0.75rem",
                    borderRadius: "6px",
                  }}
                >
                  Send Report
                </Button>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default ReportMessage;
