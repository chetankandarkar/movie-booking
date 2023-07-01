import React, { useEffect, useState } from "react";
import {useParams } from "react-router-dom";
import { Button, Container, Form, Modal } from "react-bootstrap";
import TopBar from "./Navbar";
import footer from "./footer";
import axios from "axios";
import superagent from "superagent";
import Cookies from "universal-cookie";
import { Link, Navigate } from "react-router-dom";

export default function HomePage() {

  const cookies = new Cookies();
  const token = cookies.get('accessToken');
  const username = cookies.get('username');
  const isLoggedIn = cookies.get('roles');

  const [movies, setMovies] = useState([]);

    const loadMovies = async () => {
        const result = await axios.get("http://localhost:8081/api/v1.0/moviebooking/all");
        setMovies(result.data);
    };

    useEffect(() => {
        loadMovies();
    }, []);

    // deleteuser
    const { movieName }=useParams();
    const { theatreName }=useState();

    //  const bookTicket = async (id)=> {
    //   await axios.delete(`http://localhost:8081/api/v1.0/moviebooking/${movieName}/add`);
    //   loadMovies();
    // };



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
        <h3 className="ml-5">Welcome back {username}</h3>
        <div className='container'>
        <div className='py-4'>
        <table className="table border shadow">
  <thead>
    <tr>
      <th scope="col">Id</th>
      <th scope="col">Movie</th>
      <th scope="col">Theatre</th>
      <th scope="col">Available Tickets</th>
      <div className="col-md-6 offset-md-1">
      <th scope="col">Action</th>
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
                    <Link className="btn btn-primary mx-2" to={`/bookticket/${movie.movieName}/${movie.theatreName}`}>Book Ticket</Link>
                </td>
                
            </tr>
        ))
    }
  </tbody>
</table>
        </div>
    </div>
    
        {/* <br />
        <br />
        <div className="d-flex flex-column mt-5 mt-md-0 flex-md-row text-center text-md-start justify-content-between bg-primary text-white px-3 py-3 mb-0">
          Copyright © 2023 moviebooking.com All rights reserved.
        </div> */}
      </> : <Navigate to='/login' />
    }
    </>
    
  )
}
