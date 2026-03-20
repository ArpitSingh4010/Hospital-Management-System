import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { enqueueSnackbar } from "notistack";
import { Context } from "../main";
import { Navigate } from "react-router-dom";
import API_BASE_URL from "../config/api";

const Messages = () => {
  const [messages, setMessages] = useState([]);
  const { isAuthenticated } = useContext(Context);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(
          `${API_BASE_URL}/api/v1/message/receive`,
          { withCredentials: true }
        );
        setMessages(data.messages);
      } catch (error) {
        console.log(error.response?.data?.message);
        enqueueSnackbar(error.response?.data?.message || "Failed to fetch messages!", { variant: "error" });
      } finally {
        setLoading(false);
      }
    };
    fetchMessages();
  }, []);

  if (!isAuthenticated) {
    return <Navigate to={"/login"} />;
  }

  return (
    <section className="page messages-page">
      <div className="messages-header">
        <h1>📧 Messages</h1>
        <p className="messages-subtitle">View all messages from patients and visitors</p>
      </div>

      <div className="messages-container">
        {loading ? (
          <div className="loading-spinner">
            <div className="spinner"></div>
            <p>Loading messages...</p>
          </div>
        ) : messages && messages.length > 0 ? (
          <div className="messages-grid">
            {messages.map((element) => {
              return (
                <div className="message-card" key={element._id}>
                  <div className="message-header-badge">
                    <span className="message-icon">💬</span>
                    <span className="message-status">New</span>
                  </div>
                  
                  <div className="message-details">
                    <div className="detail-row">
                      <span className="detail-label">👤 Name:</span>
                      <span className="detail-value">{element.firstName} {element.lastName}</span>
                    </div>
                    
                    <div className="detail-row">
                      <span className="detail-label">📧 Email:</span>
                      <span className="detail-value">{element.email}</span>
                    </div>
                    
                    <div className="detail-row">
                      <span className="detail-label">📱 Phone:</span>
                      <span className="detail-value">{element.phone}</span>
                    </div>
                    
                    <div className="message-content">
                      <span className="detail-label">💬 Message:</span>
                      <p className="message-text">{element.message}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="no-messages">
            <div className="no-messages-icon">📭</div>
            <h2>No Messages Yet!</h2>
            <p>There are no messages to display at the moment.</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default Messages;