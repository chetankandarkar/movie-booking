import React, { useEffect, useState } from "react";
import {useParams } from "react-router-dom";
import { Button, Container, Form, Modal } from "react-bootstrap";
import TopbarAdmin from "./Navadmin";
import axios from "axios";
import superagent from "superagent";
import Cookies from "universal-cookie";
import { Link, Navigate, useNavigate } from "react-router-dom";
// const [noOfTickets, setNoOfTickets] = useState("");
// const [seatNumber, setseatNumber] = useState("");

export default function AddMovie() {

  const cookies = new Cookies();
  const token = cookies.get('accessToken');
  const loginId = cookies.get('username');
  const isLoggedIn = cookies.get('roles');

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

//   const [movieName, setMovieName] = useState("");
//   const [theatreName, setTheatreName] = useParams();


  const [movie, setMovie] = useState({
    movieName: "",
    theatreName: "",
    noOfTicketsAvailable: "",
    ticketsStatus: "",
  });

  const { movieName, theatreName, noOfTicketsAvailable, ticketsStatus } =movie;

  const onInputChange = (e) => {
    setMovie({ ...movie, [e.target.name]: e.target.value });
  };

  let navigate=useNavigate()


const onSubmit = async (e) => {
    e.preventDefault();
    await axios.post(`http://localhost:8081/api/v1.0/moviebooking/savemovie` , movie);
    setShow(true);
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
    <>{isLoggedIn == 'ROLE_ADMIN' ?
      <>
        <TopbarAdmin />

        <div className="container">
      <div className='row'>
        <div className='col-md-6 offset-md-3 border rounded p4 mt-2 shadow'>
          <h2 className='text-center m-4'>Add Movie</h2>
        
        
        <form onSubmit={(e) => onSubmit(e)}>

        {/* ------------------ */}
        <div className='mb-3'>
            <label htmlFor='movieName' className="form-label">Movie Name</label>
            <input type={"text"} className="form-control" placeholder='Enter Movie Name' name='movieName'
            value={movieName}
            onChange={(e)=>onInputChange(e)}
            />
          </div>
          {/* ------------------ */}
          <div className='mb-3'>
            <label htmlFor='theatreName' className="form-label">Theatre Name</label>
            <input type={"text"} className="form-control" placeholder='Enter Theatre Name' name='theatreName'
            value={theatreName}
            onChange={(e)=>onInputChange(e)}
            />
          </div>
          {/* ------------------ */}
          <div className='mb-3'>
            <label htmlFor='noOfTicketsAvailable' className="form-label">Available Tickets</label>
            <input type={"text"} className="form-control" placeholder='Enter Available Tickets' name='noOfTicketsAvailable'
            value={noOfTicketsAvailable}
            onChange={(e)=>onInputChange(e)}
            />
          </div>
          {/* ------------------ */}
          <div className='mb-3'>
            <label htmlFor='ticketsStatus' className="form-label">Tickets Status</label>
            <input type={"text"} className="form-control" placeholder='Enter Tickets Status' name='ticketsStatus'
            value={ticketsStatus}
            onChange={(e)=>onInputChange(e)}
            />
          </div>

          <div className='mb-3'>
          <button type="submit" className='btn btn-primary mx-5'>Add Movie</button>
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
          <Modal.Title>Movie Added Successfully</Modal.Title>
        </Modal.Header>
        <Modal.Body>

            <div className="ml-5">
            <b>Movie Name: </b>  {movieName} <br/>
            <b>Theatre Name: </b> {theatreName} <br/>
            <b>No. Of Tickets: </b>{noOfTicketsAvailable} <br/>
            <b>Seat Number: </b> {ticketsStatus} <br/>
            </div>
            <br/>

        </Modal.Body>
        <Modal.Footer>
        <Link to="/homeadmin" className="btn btn-primary">Back to Home</Link>
        </Modal.Footer>
      </Modal>

        </> : <Navigate to='/login' />
    }
    
    </>
    
  )
}