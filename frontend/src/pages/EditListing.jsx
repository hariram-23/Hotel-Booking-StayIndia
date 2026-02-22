import { useState, useEffect } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import axios from '../config/axios';

export default function EditListing() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    location: '',
    country: ''
  });
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState({});
  const { user } = useAuth();
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  
  // Check if user came from admin dashboard
  const fromAdmin = location.state?.fromAdmin || (user?.role === 'admin');

  useEffect(() => {
    fetchListing();
  }, [id]);

  const fetchListing = async () => {
    try {
      const res = await axios.get(`/api/listings/${id}`);
      const listing = res.data;
      setFormData({
        title: listing.title,
        description: listing.description,
        price: listing.price,
        location: listing.location,
        country: listing.country
      });
      if (listing.image?.url) setPreview(listing.image.url);
      setLoading(false);
    } catch (err) {
      setError('Failed to load listing');
      setLoading(false);
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    } else if (formData.title.trim().length < 5) {
      newErrors.title = 'Title must be at least 5 characters';
    }
    
    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    } else if (formData.description.trim().length < 20) {
      newErrors.description = 'Description must be at least 20 characters';
    }
    
    if (!formData.price) {
      newErrors.price = 'Price is required';
    } else if (isNaN(formData.price) || Number(formData.price) < 100) {
      newErrors.price = 'Price must be at least ₹100';
    } else if (Number(formData.price) > 1000000) {
      newErrors.price = 'Price cannot exceed ₹10,00,000';
    }
    
    if (!formData.location.trim()) {
      newErrors.location = 'Location is required';
    }
    
    if (!formData.country.trim()) {
      newErrors.country = 'Country is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: '' });
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        setError('Please select an image file');
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        setError('Image size must be less than 5MB');
        return;
      }
      setImage(file);
      setPreview(URL.createObjectURL(file));
      setError('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!validateForm()) {
      setError('Please fix the errors below');
      return;
    }

    try {
      const data = new FormData();
      Object.keys(formData).forEach(key => data.append(key, formData[key]));
      if (image) data.append('image', image);

      await axios.put(`/api/listings/${id}`, data, {
        withCredentials: true,
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      setSuccess('Listing updated successfully!');
      const redirectPath = fromAdmin ? '/admin/dashboard' : `/listings/${id}`;
      setTimeout(() => navigate(redirectPath), 1500);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update listing');
    }
  };

  const handleBack = () => {
    if (fromAdmin) {
      navigate('/admin/dashboard');
    } else {
      navigate(`/listings/${id}`);
    }
  };

  const handleCancel = () => {
    if (fromAdmin) {
      navigate('/admin/dashboard');
    } else {
      navigate(`/listings/${id}`);
    }
  };

  if (!user) {
    navigate('/login');
    return null;
  }

  if (loading) return <div className="container" style={{ padding: '48px' }}>Loading...</div>;

  return (
    <div className="container" style={styles.container}>
      <div style={styles.formWrapper}>
        <div style={styles.headerSection}>
          <button onClick={handleBack} style={styles.backButton}>
            ← Back
          </button>
          <h1 style={styles.title}>Edit Listing</h1>
        </div>

        {error && <div className="alert alert-error">{error}</div>}
        {success && <div className="alert alert-success">{success}</div>}

        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.field}>
            <label style={styles.label}>Title *</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="input"
            />
            {errors.title && <span style={styles.errorText}>{errors.title}</span>}
          </div>

          <div style={styles.field}>
            <label style={styles.label}>Description *</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="input"
              rows="4"
            />
            {errors.description && <span style={styles.errorText}>{errors.description}</span>}
            <span style={styles.charCount}>{formData.description.length} characters</span>
          </div>

          <div style={styles.row}>
            <div style={styles.field}>
              <label style={styles.label}>Price per night (₹) *</label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                className="input"
                min="100"
              />
              {errors.price && <span style={styles.errorText}>{errors.price}</span>}
            </div>

            <div style={styles.field}>
              <label style={styles.label}>Location *</label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="input"
              />
              {errors.location && <span style={styles.errorText}>{errors.location}</span>}
            </div>
          </div>

          <div style={styles.field}>
            <label style={styles.label}>Country *</label>
            <input
              type="text"
              name="country"
              value={formData.country}
              onChange={handleChange}
              className="input"
            />
            {errors.country && <span style={styles.errorText}>{errors.country}</span>}
          </div>

          <div style={styles.field}>
            <label style={styles.label}>Image (Max 5MB)</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="input"
            />
            {preview && <img src={preview} alt="Preview" style={styles.preview} />}
          </div>

          <div style={styles.buttonGroup}>
            <button type="button" onClick={handleCancel} className="btn btn-secondary">
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              Update Listing
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

const styles = {
  container: {
    paddingTop: '48px',
    paddingBottom: '48px'
  },
  formWrapper: {
    maxWidth: '600px',
    margin: '0 auto'
  },
  headerSection: {
    marginBottom: '32px'
  },
  backButton: {
    display: 'inline-block',
    color: '#717171',
    fontSize: '14px',
    marginBottom: '16px',
    transition: 'color 0.2s',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    padding: 0
  },
  title: {
    fontSize: '32px',
    fontWeight: 'bold'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px'
  },
  field: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    flex: 1
  },
  row: {
    display: 'flex',
    gap: '16px'
  },
  label: {
    fontSize: '14px',
    fontWeight: '600'
  },
  errorText: {
    color: '#E61E4D',
    fontSize: '12px',
    marginTop: '4px'
  },
  charCount: {
    fontSize: '12px',
    color: '#717171',
    textAlign: 'right'
  },
  buttonGroup: {
    display: 'flex',
    gap: '12px',
    marginTop: '8px'
  },
  preview: {
    width: '100%',
    maxHeight: '300px',
    objectFit: 'cover',
    borderRadius: '8px',
    marginTop: '8px'
  }
};
