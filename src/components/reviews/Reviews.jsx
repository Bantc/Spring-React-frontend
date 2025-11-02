import { useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";

import ReviewForm from "../reviewForm/ReviewForm";
import api from '../../api/axiosConfig';

import React from 'react'

import './Reviews.css';

const Reviews = ({getMovieData, movie, reviews, setReviews}) => {
    const revText = useRef();
    let params = useParams();
    const movieId = params.movieId;

    useEffect(() => {
      getMovieData(movieId);
    }, [])

    const addReview = async (e) => {
      e.preventDefault();

        const rev = revText.current;

      try {
        const response = await api.post("/reviews", {reviewBody:rev.value, imdbId:movieId});
        const updatedReviews = [...(reviews || []), {body: rev.value}];

        rev.value = "";

        setReviews(updatedReviews);
      } catch(err) {
        console.error(err);
      }
    }

  return (
    <div className='review-container'>
      <Container>
        <Row>
          <Col><h3>Reviews</h3></Col>
        </Row>
        <Row className="mt-2">
          <Col>
            <img src={movie?.poster} alt=""/>
          </Col>
          <Col>
            {
              <>
                <Row>
                  <Col>
                    <ReviewForm handleSubmit={addReview} revText={revText} labelText="Write a review"/>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <hr/>
                  </Col>
                </Row>
              </>
            }
            {
              reviews?.map((r, index) => {
                return (
                  <React.Fragment key={index}>
                    <Row>
                      <Col>{r.body}</Col>
                    </Row>
                    <Row>
                      <Col>
                        <hr/>
                      </Col>
                    </Row>
                  </React.Fragment>
                )
              })
            }
          </Col>
        </Row>
        <Row>
          <Col>
            <hr/>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default Reviews