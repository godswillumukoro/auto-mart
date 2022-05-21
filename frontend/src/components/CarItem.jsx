import { useDispatch } from 'react-redux';
import { deleteCar } from '../features/cars/carSlice';

function CarItem({ car }) {
  const dispatch = useDispatch();

  return (
    <div className="car">
      <div>{new Date(car.createdAt).toLocaleString('en-US')}</div>
      <h2>{car.text}</h2>
      <button
        type="button"
        onClick={() => dispatch(deleteCar(car._id))}
        className="close"
      >
        X
      </button>
    </div>
  );
}

export default CarItem;
