import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import CarForm from '../components/carForm.jsx';
import CarItem from '../components/CarItem';
import Spinner from '../components/Spinner';
import { getCars, reset } from '../features/cars/carSlice';

function Dashboard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { cars, isLoading, isError, message } = useSelector(
    (state) => state.cars
  );

  useEffect(() => {
    if (isError) {
      console.log(message);
    }

    if (!user) {
      navigate('/login');
    }

    dispatch(getCars());
    return () => {
      dispatch(reset());
    };
  }, [user, navigate, isError, message, dispatch]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <h1>All Cars</h1>
      <section className="heading">
        <span className="leading-text">Hello {user && user.name} 👋🏽</span>
      </section>
      <CarForm />
      <section className="content">
        {cars.length > 0 ? (
          <div className="cars">
            {cars.map((car) => (
              <CarItem key={car._id} car={car} />
            ))}
          </div>
        ) : (
          <span className="leading-text">No cars have been posted</span>
        )}
      </section>
    </>
  );
}

export default Dashboard;
