import axios from "axios";
import { Label, TextInput } from "flowbite-react";
import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';

export default function EditAppointment() {

  const {id} = useParams();

    const [formData, setFormData] = useState({})
    const [services, setServices] = useState([]);
    const [beauticians, setBeauticians] = useState([]);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({...formData, [e.target.id]: e.target.value})
    }

    console.log(formData);

    useEffect(() => {
      const fetchEmployees = async () => {
          try {
              const response = await axios.get(`/api/appointment?appointmentId=${id}`);
              setFormData(response.data[0]);
          } catch (error) {
              console.error(error);
          }
      };
      fetchEmployees();
  }, [id]);


    const handleSubmit = (e) => {
        e.preventDefault();
        try {

            const response = axios.put(`/api/appointment/${id}`, formData)
            console.log(response);
            Swal.fire({
                title: 'Success!',
                text: 'Appointment has been updated successfully!',
                icon: 'success',
                confirmButtonText: 'OK'
            }).then((result) => {
                if (result.isConfirmed) {
                    navigate('/dashboard?tab=profile');
                }
            });
            
        } catch (error) {
            console.error(error);
            Swal.fire({
                title: 'Error!',
                text: 'Failed to update appointment. Please try again.',
                icon: 'error',
                confirmButtonText: 'OK'
            });
        }
    }    

    useEffect(() => {
        axios.get('/api/service').then(response => {
            setServices(response.data);
        }).catch(error => {
            console.error(error);
        });
        axios.get('/api/employee').then(response => {
            setBeauticians(response.data);
        }).catch(error => {
            console.error(error);
        });
    }, []);

  return (
    <div className="flex max-w-md flex-col gap-4 mx-auto mt-14 mb-14 p-4 rounded-md bg-slate-100 shadow-lg">
            <h1 className="text-3xl font-bold text-center text-gray-800">Book an Appointment</h1>

            <div>
                <Label htmlFor="name" value="Name" />
                <TextInput id="name" type="text" sizing="md" value={formData.name} readOnly />
            </div>
            <div>
                <Label htmlFor="email" value="Email" />
                <TextInput id="email" type="email" sizing="md" value={formData.email} readOnly />
            </div>
            <div>
                <Label htmlFor="service" value="Select Service" />
                <select id="service" className="form-select block w-full" onChange={handleChange} value={formData.service}>
                    <option value="">Select Service</option>
                    {services.map(service => (
                        <option key={service._id} value={service.ServiceName}>{service.ServiceName}</option>
                    ))}
                </select>
            </div>
            <div>
                <Label htmlFor="beautician" value="Select Beautician" />
                <select id="beautician" className="form-select block w-full" onChange={handleChange} value={formData.beautician}>
                    <option value="">Select Beautician</option>
                    {beauticians.map(beautician => (
                        <option key={beautician._id} value={beautician.EmployeeName}>{beautician.EmployeeName}</option>
                    ))}
                </select>
            </div>
            <div>
                <Label htmlFor="selectedDate" value="Select Date" />
                <TextInput value={formData.selectedDate} id="selectedDate" type="date" sizing="md" onChange={handleChange} />
            </div>
            <div>
                <Label htmlFor="time" value="Select Time" />
                <TextInput id="time" type="time" sizing="md" onChange={handleChange} value={formData.time}/>
            </div>

            <div className="flex justify-between">
                <Link to="/dashboard?tab=profile">
                    <button className="w-full rounded-md bg-blue-500 px-4 py-2 text-white">Back</button>
                </Link>

                <Link>                
                    <button onClick={handleSubmit} className="w-full rounded-md bg-blue-500 px-4 py-2 text-white">Book Appointment</button>
                </Link>

            </div>
        </div>
  )
}

