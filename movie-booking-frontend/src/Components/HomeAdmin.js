import React, { useEffect, useState } from "react";
import {useParams } from "react-router-dom";
import { Button, Container, Form, Modal } from "react-bootstrap";
import TopbarAdmin from "./Navadmin";
import footer from "./footer";
import axios from "axios";
import superagent from "superagent";
import Cookies from "universal-cookie";
import { Link, Navigate } from "react-router-dom";

export default function HomeAdmin() {

  const cookies = new Cookies();
  const token = cookies.get('accessToken');
  const username = cookies.get('username');
  const isLoggedIn = cookies.get('roles');

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [movies, setMovies] = useState([]);

    const loadMovies = async () => {
        const result = await axios.get("http://localhost:8081/api/v1.0/moviebooking/all");
        setMovies(result.data);
    };

    useEffect(() => {
        loadMovies();
    }, []);


    const [cancelMovie, setCancelMovie] = useState("");

    const handleClick = (movieName) => {
        setShow(true);
        setCancelMovie(movieName);
    }

    // deleteuser
    const { movieName }=useParams();
    const { theatreName }=useState();

    const deleteMovie = async (cancelMovie)=> {
        await axios.delete(`http://localhost:8081/api/v1.0/moviebooking/${cancelMovie}/delete`);
        loadMovies();
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
        <h3 className="ml-5">Welcome back Admin {username}</h3>
        <div className='container'>
        <div className='py-4'>
        <table className="table border shadow">
  <thead>
    <tr>
      <th scope="col">Id</th>
      <th scope="col">Movie</th>
      <th scope="col">Theatre</th>
      <th scope="col">Available Tickets</th>
      <div className="col-md-6 offset-md-2">
      <th scope="col" >Action</th>
      </div>
    </tr>
  </thead>
  <tbody>
    
    {
        movies.map((movie, index)=> (
            <tr>
                <th scope="row" key={index}>
                    {index + 1}
                </th>
                <td>{movie.movieName}</td>
                <td>{movie.theatreName}</td>
                <td>{movie.noOfTicketsAvailable}</td>
                <td>
                    <Link className="btn btn-warning mx-2" to={`/checktickets/${movie.movieName}`}>Check Tickets</Link>
                    <button className="btn btn-danger mx-2" onClick={() => handleClick(movie.movieName)}>Delete Movie</button>
                </td>
                
            </tr>
        ))
    }
  </tbody>
</table>
        </div>
    </div>
    
    <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={true}
      >
        <Modal.Header>
          <Modal.Title>Alert!</Modal.Title>
        </Modal.Header>
        <Modal.Body>

            <div className="ml-5">
            <b> Do you really want to delete {cancelMovie} movie ?</b>
            </div>
        </Modal.Body>
        <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
            No
          </Button>
          <Button onClick={() => deleteMovie(cancelMovie)} href='/homeadmin'>
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
      </> : <Navigate to='/*' />
    }
    </>
    
  )
}
