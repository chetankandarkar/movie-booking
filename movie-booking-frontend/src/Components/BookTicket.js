import React, { useEffect, useState } from "react";
import {useParams } from "react-router-dom";
import { Button, Container, Form, Modal } from "react-bootstrap";
import TopBar from "./Navbar";
import footer from "./footer";
import axios from "axios";
import superagent from "superagent";
import Cookies from "universal-cookie";
import { Link, Navigate, useNavigate } from "react-router-dom";
// const [noOfTickets, setNoOfTickets] = useState("");
// const [seatNumber, setseatNumber] = useState("");

export default function Try() {

  const cookies = new Cookies();
  const token = cookies.get('accessToken');
  const loginId = cookies.get('username');
  const isLoggedIn = cookies.get('roles');
  
  const {movieName}=useParams()
  const {theatreName}=useParams()

  const saveMovieName = movieName;
  const saveTheatreName = theatreName;
  const [errorMessage, setErrorMessage] = useState('');


  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

//   const [movieName, setMovieName] = useState("");
//   const [theatreName, setTheatreName] = useParams();


  const [movie, setMovie] = useState({
    loginId: loginId,
    movieName: saveMovieName,
    theatreName: saveTheatreName,
    noOfTickets: "",
    seatNumber: "",
  });

  const { noOfTickets, seatNumber } =movie;

  const onInputChange = (e) => {
    setMovie({ ...movie, [e.target.name]: e.target.value });
  };

  let navigate=useNavigate()


const onSubmit = async (e) => {
    e.preventDefault();

    try {
    await axios.post(`http://localhost:8081/api/v1.0/moviebooking/${movieName}/add` , movie);
    setShow(true);
  } catch(error) {
  // console.error(error);
  setErrorMessage("Kindly Book 1 Seat at a time");
  window.alert(errorMessage)
  }
};


  setTimeout(() => {
    window.alert(
      "Session about to expire in 10 seconds please logout and login again"
    );
    this.setState = {
      token: "",
      isLoggedIn: false,
    };
  }, 1000 * 60 * 29.9);

  return (
    <>{isLoggedIn ?
      <>
        <TopBar />

        <div className="container">
      <div className='row'>
        <div className='col-md-6 offset-md-3 border rounded p4 mt-2 shadow'>
          <h2 className='text-center m-4'>Book Ticket</h2>
        
        
        <form onSubmit={(e) => onSubmit(e)}>

        {/* ------------------ */}
          <div className='mb-3'>
            <label htmlFor='loginId' className="form-label">Login Id</label>
            <input type={"text"} disabled="disabled" className="form-control" placeholder='Enter your loginId' name='loginId'
            value={loginId}
            onChange={(e)=>onInputChange(e)}
            />
          </div>
        {/* ------------------ */}
          <div className='mb-3'>
            <label htmlFor='movieName' className="form-label">Movie Name</label>
            <input type={"text"} disabled="disabled" className="form-control" placeholder='Enter your movieName' name='movieName'
            value={movieName}
            onChange={(e)=>onInputChange(e)}
            />

          </div>
        {/* ------------------ */}
          <div className='mb-3'>
            <label htmlFor='theatreName' className="form-label">Theatre Name</label>
            <input type={"text"} disabled="disabled" className="form-control" placeholder='Enter theatreName' name='theatreName'
            value={theatreName}
            onChange={(e)=>onInputChange(e)}
            />
          </div>
          {/* ------------------ */}
          <div className='mb-3'>
            <label htmlFor='noOfTickets' className="form-label">Number Of Tickets</label>
            <input type={"number"} className="form-control" placeholder='Enter number of tickets' name='noOfTickets'
            value={noOfTickets}
            onChange={(e)=>onInputChange(e)}
            />
          </div>
          {/* ------------------ */}
          <div className='mb-3'>
            <label htmlFor='seatNumber' className="form-label">Seat Number</label>
            <input type={"text"} className="form-control" placeholder='Enter Seat Number here' name='seatNumber'
            value={seatNumber}
            onChange={(e)=>onInputChange(e)}
            />
          </div>

          <div className='mb-3'>
          <button type="submit" className='btn btn-primary mx-5'>Book Now</button>
          <Link className='btn btn-danger mx-2' to="/Home">Cancel</Link>
        </div>
        </form>
        </div>
      </div>
    </div>

    <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={true}
      >
        <Modal.Header>
          <Modal.Title>Movie Book Successfully ✅</Modal.Title>
        </Modal.Header>
        <Modal.Body>

            <div className="ml-5">
            <b>Movie Name: </b>  {saveMovieName} <br/>
            <b>Theatre Name: </b> {saveTheatreName} <br/>
            <b>No. Of Tickets: </b>{noOfTickets} <br/>
            <b>Seat Number: </b> {seatNumber} <br/>
            </div>
            <br/>
            Kindly check your mail to download ticket

        </Modal.Body>
        <Modal.Footer>
        <Link to="/home" className="btn btn-primary">Back to Home</Link>
        </Modal.Footer>
      </Modal>

        </> : <Navigate to='/login' />
    }
    
    </>
    
  )
}