import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import * as yup from 'yup';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import axios from 'axios';

interface FormData {
  name: string;
  email: string;
  phone: string;
  date: string;
  mathematics_mark: number;
  history_mark: number;
  science_mark: number;
  total_mark: number;
  status: string;
}

const schema = yup.object().shape({
  name: yup.string().required('Name is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  phone: yup.string().required('Phone number is required'),
  date: yup.string().required('Date is required'),
  mathematics_mark: yup
    .number()
    .required('Mathematics mark is required')
    .min(0, 'Minimum value is 0')
    .max(100, 'Maximum value is 100'),
  history_mark: yup
    .number()
    .required('History mark is required')
    .min(0, 'Minimum value is 0')
    .max(100, 'Maximum value is 100'),
  science_mark: yup
    .number()
    .required('Science mark is required')
    .min(0, 'Minimum value is 0')
    .max(100, 'Maximum value is 100'),
  total_mark: yup
    .number()
    .required('Total mark is required')
    .min(0, 'Minimum value is 0')
    .max(300, 'Maximum value is 300'),
  status: yup.string().required('Status is required'),
});

const MuiForms: React.FC = () => {
  const params = useParams<{ id: string }>();

  const initialFormData: FormData = {
    name: '',
    email: '',
    phone: '',
    date: '',
    mathematics_mark: 0,
    history_mark: 0,
    science_mark: 0,
    total_mark: 0,
    status: '',
  };

  const [formData, setFormData] = useState<FormData>(initialFormData);
  const navi = useNavigate();
  const [errors, setErrors] = useState<Partial<FormData>>({});

  useEffect(() => {
    if (params.id) {
      axios.get(`http://localhost:5000/list/${params.id}`).then((response) => {
        console.log(response.data);

        // Set the form values with the fetched data
        setFormData({
          name: response.data.name,
          email: response.data.email,
          phone: response.data.phone,
          date: response.data.date,
          mathematics_mark: response.data.mathematics_mark,
          history_mark: response.data.history_mark,
          science_mark: response.data.science_mark,
          total_mark: response.data.total_mark,
          status: response.data.status,
        });
      });
    }
  }, [params.id]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const createFormDataToAPI = async (data: FormData) => {
    try {
      const response = await fetch(`http://localhost:5000/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        console.log('Form data submitted successfully!', response.body);
      } else {
        console.error('Failed to submit form data:', response.status, response.statusText);
      }
    } catch (error) {
      console.error('An error occurred during the API call:', error);
    }
  };

  const submitFormDataToAPI = async (data: FormData) => {
    try {
      const response = await fetch(`http://localhost:5000/update/${params.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        console.log('Form data updated submitted successfully!', response.body);
      } else {
        console.error('Failed to submit form data:', response.status, response.statusText);
      }
    } catch (error) {
      console.error('An error occurred during the API call:', error);
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    navi('/list');

    try {
      await schema.validate(formData, { abortEarly: false });

      if (params.id) {
        await submitFormDataToAPI(formData);
      } else {
        await createFormDataToAPI(formData);
      }

      // Reset the form after successful submission
      setFormData(initialFormData);
      // setErrors({});
    } catch (validationErrors) {
    //   let newErrors: any = {};
    //   if (validationErrors.inner) {
    //     validationErrors.inner.forEach((error: yup.ValidationError) => {
    //       newErrors[error.path] = error.message;
    //     });
    //   }
    //   setErrors(newErrors);
    }
  };

  return (
    <div style={{ display: 'grid', placeItems: 'center', height: '100vh' }}>
      <form
        onSubmit={handleSubmit}
        style={{ width: '850px', gap: '1rem', padding: '2rem', border: '1px solid #ccc' }}
        className="App"
      >
        <TextField
          name="name"
          label="Name"
          value={formData.name}
          onChange={handleChange}
          error={!!errors.name}
          helperText={errors.name}
          style={{ margin: '0.5rem', padding: '0.5rem' }}
        />
        <TextField
          name="email"
          label="Email"
          value={formData.email}
          onChange={handleChange}
          error={!!errors.email}
          helperText={errors.email}
          style={{ margin: '0.5rem', padding: '0.5rem' }}
        />
        <TextField
          name="phone"
          label="Phone"
          value={formData.phone}
          onChange={handleChange}
          error={!!errors.phone}
          helperText={errors.phone}
          style={{ margin: '0.5rem', padding: '0.5rem' }}
        />
        <TextField
          name="date"
          type="date"
          label="Date"
          value={formData.date}
          onChange={handleChange}
          InputLabelProps={{ shrink: true }}
          error={!!errors.date}
          helperText={errors.date}
          style={{ margin: '0.5rem', padding: '0.5rem' }}
        />
        <TextField
          name="mathematics_mark"
          type="number"
          label="Mathematics Mark"
          value={formData.mathematics_mark}
          onChange={handleChange}
          error={!!errors.mathematics_mark}
          helperText={errors.mathematics_mark}
          style={{ margin: '0.5rem', padding: '0.5rem' }}
        />
        <TextField
          name="history_mark"
          type="number"
          label="History Mark"
          value={formData.history_mark}
          onChange={handleChange}
          error={!!errors.history_mark}
          helperText={errors.history_mark}
          style={{ margin: '0.5rem', padding: '0.5rem' }}
        />
        <TextField
          name="science_mark"
          type="number"
          label="Science Mark"
          value={formData.science_mark}
          onChange={handleChange}
          error={!!errors.science_mark}
          helperText={errors.science_mark}
          style={{ margin: '0.5rem', padding: '0.5rem' }}
        />
        <TextField
          name="total_mark"
          type="number"
          label="Total Mark"
          value={formData.total_mark}
          onChange={handleChange}
          error={!!errors.total_mark}
          helperText={errors.total_mark}
          style={{ margin: '0.5rem', padding: '0.5rem' }}
        />
        <TextField
          name="status"
          label="Status"
          value={formData.status}
          onChange={handleChange}
          error={!!errors.status}
          helperText={errors.status}
          style={{ margin: '0.5rem', padding: '0.5rem' }}
        />
        <Button type="submit" variant="contained" color="primary">
          Submit
        </Button>
      </form>
    </div>
  );
};

export default MuiForms;
