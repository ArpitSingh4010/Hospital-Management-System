import React, { useContext, useState } from "react";
import { Context } from "../main";
import { Navigate, useNavigate } from "react-router-dom";
import { enqueueSnackbar } from "notistack";
import axios from "axios";
import API_BASE_URL from "../config/api";

const AddNewAdmin = () => {
  const { isAuthenticated, setIsAuthenticated } = useContext(Context);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [aadharNumber, setAadharNumber] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
  const [password, setPassword] = useState("");

  const navigateTo = useNavigate();

  const handleAddNewAdmin = async (e) => {
    e.preventDefault();
    
    // Validation
    if (!firstName || !lastName || !email || !phone || !aadharNumber || !dob || !gender || !password) {
      enqueueSnackbar("Please fill all required fields!", { variant: "error" });
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      enqueueSnackbar("Please enter a valid email address!", { variant: "error" });
      return;
    }

    // Phone validation (10 digits)
    if (phone.length !== 10) {
      enqueueSnackbar("Phone number must be 10 digits!", { variant: "error" });
      return;
    }

    // Aadhar validation (12 digits)
    if (aadharNumber.length !== 12) {
      enqueueSnackbar("Aadhar number must be 12 digits!", { variant: "error" });
      return;
    }

    // Password validation
    if (password.length < 8) {
      enqueueSnackbar("Password must be at least 8 characters!", { variant: "error" });
      return;
    }

    try {
      const { data } = await axios.post(
        `${API_BASE_URL}/api/v1/user/admin/add`,
        { firstName, lastName, email, phone, aadharNumber, dob, gender, password },
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );
      
      enqueueSnackbar(data.message || "Admin Added Successfully!", { variant: "success" });
      setIsAuthenticated(true);
      navigateTo("/");
      
      // Reset form
      setFirstName("");
      setLastName("");
      setEmail("");
      setPhone("");
      setAadharNumber("");
      setDob("");
      setGender("");
      setPassword("");
    } catch (error) {
      enqueueSnackbar(error.response?.data?.message || "Failed to add admin!", { variant: "error" });
    }
  };

  if (!isAuthenticated) {
    return <Navigate to={"/login"} />;
  }

  return (
    <section className="page">
      <div className="add-admin-container">
        <div className="admin-header">
          <img src="/logo.png" alt="logo" className="logo" />
          <h1 className="form-title">Add New Admin</h1>
          <p className="form-subtitle">Register a new administrator to the system</p>
        </div>

        <form onSubmit={handleAddNewAdmin} className="admin-form">
          <div className="form-row">
            <div className="input-group">
              <label>First Name *</label>
              <input
                type="text"
                placeholder="Enter first name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
            </div>
            <div className="input-group">
              <label>Last Name *</label>
              <input
                type="text"
                placeholder="Enter last name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="form-row">
            <div className="input-group">
              <label>Email *</label>
              <input
                type="email"
                placeholder="Enter email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="input-group">
              <label>Phone Number *</label>
              <input
                type="tel"
                placeholder="10-digit phone number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                maxLength="10"
                required
              />
            </div>
          </div>

          <div className="form-row">
            <div className="input-group">
              <label>Aadhar Number *</label>
              <input
                type="tel"
                placeholder="12-digit Aadhar number"
                value={aadharNumber}
                onChange={(e) => setAadharNumber(e.target.value)}
                maxLength="12"
                required
              />
            </div>
            <div className="input-group">
              <label>Date of Birth *</label>
              <input
                type="date"
                value={dob}
                onChange={(e) => setDob(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="form-row">
            <div className="input-group">
              <label>Gender *</label>
              <select 
                value={gender} 
                onChange={(e) => setGender(e.target.value)}
                required
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div className="input-group">
              <label>Password *</label>
              <input
                type="password"
                placeholder="Minimum 8 characters"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                minLength="8"
                required
              />
            </div>
          </div>

          <div className="form-actions">
            <button type="submit" className="submit-btn">
              <span>Add Admin</span>
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default AddNewAdmin;