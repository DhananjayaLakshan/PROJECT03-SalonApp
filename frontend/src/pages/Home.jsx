
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="flex justify-center items-center h-96 bg-cover bg-center bg-fixed " style={{backgroundImage: 'url("./images/userbg.jpg")'}}>
      <div className="bg-white bg-opacity-15 p-14 rounded-lg shadow-lg backdrop-filter backdrop-blur-xl ">
        <p className="text-black">Contact Number: 077 028 6216</p><br />
        <p className="text-black">Address: 4B/3L, Raddoluwa, Sri Lanka</p><br />
        <p className="text-black">Email: salonwasana.raddoluwa@gmail.com</p>

        <div className='mt-8'>
          <Link to="/bookService" className="p-3 bg-green-600 hover:bg-green-700 rounded-lg text-white">BOOK NOW</Link>
        </div>
      </div>
    </div>
  );
}
