import LandingScreen from '@/components/home/LandingScreen';
import ListOfDoctors from '@/components/home/ListOfDoctors';
import CheckAppointment from '@/components/shared/CheckAppointment';
import PatientForm from '@/components/shared/patientForm';

const App = () => {
  return (
    <>
      <LandingScreen />
      <ListOfDoctors />
      <PatientForm />
      <CheckAppointment />
    </>
  )
}

export default App;