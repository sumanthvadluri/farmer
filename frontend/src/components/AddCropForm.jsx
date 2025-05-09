import React from 'react'

const AddCropForm = () => {
  return (
    <div><form className="crop-form" onSubmit={handleSubmit}>
    <div className="form-section">
        <h3>Basic Crop Details</h3>
        <label>Crop Name:</label>
        <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Enter crop name" />
        <label>Category:</label>
        <select name="category" value={formData.category} onChange={handleChange}>
            <option>Fruits</option>
            <option>Vegetables</option>
            <option>Grains</option>
            <option>Pulses</option>
        </select>
        <label>Variety:</label>
        <input type="text" name="variety" value={formData.variety} onChange={handleChange}  placeholder="Enter crop variety" />
        <label>Quantity Available:</label>
        <input type="text" name="quantity" value={formData.quantity} onChange={handleChange}  placeholder="Enter quantity" />
        <label>Price per Unit:</label>
        <input type="number" name="price" value={formData.price} onChange={handleChange}  placeholder="Enter price" />
        <label>Harvest Date:</label>
        <input type="date" name="harvestDate" value={formData.harvestDate} onChange={handleChange} />
    </div>

    <div className="form-section">
        <h3>Quality & Certification</h3>
        <label>Crop Grade/Quality:</label>
        <input type="text" name="quality" value={formData.quality} onChange={handleChange}  placeholder="Enter grade (A, B, etc.)" />
        <label>Organic:</label>
        <input type="checkbox" name="organic" checked={formData.organic} onChange={handleChange} />
        <label>Certification (if any):</label>
        <input type="text" name="certification" value={formData.certification} onChange={handleChange} placeholder="Enter certification details" />
        <label>Pesticide Usage Details:</label>
        <textarea name="pesticideUsage" value={formData.pesticideUsage} onChange={handleChange} placeholder="Enter pesticide usage details"></textarea>
    </div>

    <div className="form-section">
        <h3>Location & Delivery</h3>
        <label>Farmer's Location:</label>
        <input type="text" name="location" value={formData.location} onChange={handleChange} placeholder="Enter district, state" />
        <label>Delivery Options:</label>
        <select name="deliveryOption" value={formData.deliveryOption} onChange={handleChange}>
            <option>Self-pickup</option>
            <option>Farmer delivery</option>
            <option>Third-party logistics</option>
        </select>
        <label>Shipping Charges:</label>
        <input type="number" name="shippingCharges" value={formData.shippingCharges} onChange={handleChange} placeholder="Enter shipping cost (if any)" />
    </div>

    <div className="form-section">
        <h3>Contact & Payment Details</h3>
        <label>Farmer's Name:</label>
        <input type="text" name="farmerName" value={formData.farmerName} onChange={handleChange} placeholder="Enter your name" />
        <label>Phone Number / WhatsApp:</label>
        <input type="text" name="phone" value={formData.phone} onChange={handleChange} placeholder="Enter phone number" />
        <label>Preferred Contact Method:</label>
        <select name="contactMethod" value={formData.contactMethod} onChange={handleChange}>
            <option>Call</option>
            <option>Message</option>
            <option>WhatsApp</option>
        </select>
        <label>Payment Method Accepted:</label>
        <select name="paymentMethod" value={formData.paymentMethod} onChange={handleChange}>
            <option>UPI</option>
            <option>Bank Transfer</option>
            <option>Cash on Delivery</option>
        </select>
    </div>

    <div className="form-actions">
        <button type="button" className="cancel-btn" onClick={() => setShowModal(false)}>Cancel</button>
        <button type="submit" className="submit-btn">{editingIndex !== null ? "Update" : "Submit"}</button>
    </div>
</form></div>
  )
}

export default AddCropForm;