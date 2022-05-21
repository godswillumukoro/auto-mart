import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createCar } from '../features/cars/carSlice';

function CarForm() {
  const [text, setText] = useState('');

  const dispatch = useDispatch();

  const onSubmit = (e) => {
    e.preventDefault();

    dispatch(createCar({ text }));
    setText('');
  };

  return (
    <section className="form">
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="text">Post new Car</label>
          <input
            type="text"
            name="text"
            id="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </div>
        <div className="form-group">
          <button className="btn btn-block" type="submit">
            Post Car
          </button>
        </div>
      </form>
    </section>
  );
}

export default CarForm;
