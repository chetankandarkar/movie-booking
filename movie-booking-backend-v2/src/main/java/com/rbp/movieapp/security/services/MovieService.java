package com.rbp.movieapp.security.services;

import com.rbp.movieapp.models.Movie;
import com.rbp.movieapp.models.Ticket;
import com.rbp.movieapp.repository.MovieRepository;
import com.rbp.movieapp.repository.TicketRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MovieService {

    @Autowired
    private MovieRepository movieRepository;
    @Autowired
    private TicketRepository ticketRepository;

    public List<Movie> getAllMovies() {
        return movieRepository.findAll();
    }

    public List<Movie> getMovieByName(String movieName) {
        return movieRepository.findByMovieName(movieName);
    }

    public List<Ticket> findSeats(String movieName, String theatreName) {
        return ticketRepository.findSeats(movieName,theatreName);
    }

    public List<Movie> findAvailableTickets(String movieName, String theatreName) {
        return movieRepository.findAvailableTickets(movieName,theatreName);
    }

    public void saveTicket(Ticket ticket) {
        ticketRepository.save(ticket);
    }
    
//    public void saveTicket(Ticket ticket) {
//        updateTicket(ticket.getMovieName(),ticket.getNoOfTickets());
//        ticketRepository.save(ticket);
//
//    }
//    
//    public void updateTicket(String movieName,int numberOfTickets) {
//        Movie movieDetails = movieRepository.findBMovieName(movieName).get();
//            int availableTickets = movieDetails.getNoOfTicketsAvailable() - numberOfTickets;
//            movieDetails.setNoOfTicketsAvailable(availableTickets);
//            movieRepository.save(movieDetails);
//        }
    

    public void saveMovie(Movie movie) {
        movieRepository.save(movie);
    }

    public List<Ticket> getAllBookedTickets(String movieName) {
        return ticketRepository.findByMovieName(movieName);
    }

    public List<Movie> findByMovieName(String movieName) {
        return movieRepository.findByMovieName(movieName);
    }

    public void deleteByMovieName(String movieName) {
        movieRepository.deleteByMovieName(movieName);
    }
}
